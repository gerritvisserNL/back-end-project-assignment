import { PrismaClient } from "@prisma/client";

const createBooking = async (
  userId,
  propertyId,
  checkinDate,
  checkoutDate,
  numberOfGuests,
  totalPrice,
  bookingStatus
) => {
  const prisma = new PrismaClient();

  try {
    // Check for overlapping bookings
    const overlappingBooking = await prisma.booking.findFirst({
      where: {
        propertyId,
        OR: [
          {
            checkinDate: {
              lte: new Date(checkoutDate),
            },
            checkoutDate: {
              gte: new Date(checkinDate),
            },
          },
        ],
      },
    });

    if (overlappingBooking) {
      const error = new Error(
        "The property is already booked for the selected dates."
      );
      error.status = 409; // Conflict
      throw error; // Throws the specific error if dates are overlapped
    }

    // Proceed with creating the booking
    const newBooking = {
      userId,
      propertyId,
      checkinDate: new Date(checkinDate),
      checkoutDate: new Date(checkoutDate),
      numberOfGuests,
      totalPrice,
      bookingStatus,
    };

    const booking = await prisma.booking.create({
      data: newBooking,
    });

    return booking;
  } catch (error) {
    // Rethrow specific errors so they can be handled properly
    if (error.status === 409) {
      throw error; // Re-throw the specific error for the router
    } else {
      // Handle unexpected errors with a generic message
      throw new Error("Unable to create booking. Please try again later.");
    }
  } finally {
    // Ensure the Prisma client is disconnected to avoid connection leaks
    await prisma.$disconnect();
  }
};

export default createBooking;
