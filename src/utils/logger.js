import winston from "winston";

const logger = winston.createLogger({
  level: process.env.NODE_ENV === "development" ? "info" : "error", // Logniveaus: 'info' in dev en 'error' in productie
  format: winston.format.json(),
  defaultMeta: { service: "bookings-api" },
});

// In dev omgeving toevoegen van console output met gedetailleerde logberichten
if (process.env.NODE_ENV !== "production") {
  logger.add(
    new winston.transports.Console({
      format: winston.format.simple(), // Toont logberichten in een simpele tekstformaat
    })
  );
} else {
  // Als je in productie bent, kun je loggen naar bestanden of andere transports.
  // Hier voeg je een file transport toe voor productie bijvoorbeeld:
  logger.add(
    new winston.transports.File({ filename: "error.log", level: "error" })
  );
}

export default logger;
