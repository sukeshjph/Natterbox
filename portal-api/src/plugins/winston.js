import winston from "winston"

const date = new Date().toISOString()

const logFormat = winston.format.printf(info => {
  return `${date} [${info.level}] : ${info.message}\n  ${JSON.stringify(
    info.meta,
    null,
    4,
  ) || ""}`
})

export default winston.createLogger({
  level: process.env.LOG_LEVEL,
  format: (function format() {
    switch (process.env.LOG_FORMAT) {
      case "json":
        return winston.format.json()
      case "text":
        return winston.format.combine(
          winston.format.colorize(),
          winston.format.simple(),
          logFormat,
        )
      default:
        return winston.format.json()
    }
  })(),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: "log" }),
  ],
})
