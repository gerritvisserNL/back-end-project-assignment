import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient(); // Placed outside function to prevent repeated creation of PrismaClient

const getBookings = async (
  userId,
  propertyId,
  checkinDate,
  checkoutDate,
  numberOfGuests,
  totalPrice,
  bookingStatus
) => {
  // Empty filter object
  const filter = {};

  // Only add fields to filter that have a value
  if (userId) filter.userId = userId;
  if (propertyId) filter.propertyId = propertyId;
  if (checkinDate) filter.checkinDate = new Date(checkinDate);
  if (checkoutDate) filter.checkoutDate = new Date(checkoutDate);
  if (numberOfGuests) filter.numberOfGuests = Number(numberOfGuests);
  if (totalPrice) filter.totalPrice = Number(totalPrice);
  if (bookingStatus) filter.bookingStatus = bookingStatus;

  // Retrieve bookings with filter
  const bookings = await prisma.booking.findMany({
    where: filter,
  });

  return bookings;
};

export default getBookings;
