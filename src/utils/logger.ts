import pino from "pino";

export const logger = pino(
  {
    level: "info",
  },
  pino.transport({
    target: "pino-pretty",
    options: {
      colorize: true,
      translateTime: "HH:MM:ss",
    },
  })
);
