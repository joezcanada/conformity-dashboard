import * as winston from 'winston';

const { combine, timestamp, json, printf } = winston.format;
const timestampFormat = 'MMM-DD-YYYY HH:mm:ss';

export const logger = winston.createLogger({
    format: combine(
        timestamp({ format: 'MMM-DD-YYYY HH:mm:ss' }),
        json(),
        printf(({ timestamp, level, message, ...data }) => {
            const response = {
                level,
                timestamp,
                message,
                data,
            };

            return JSON.stringify(response);
        })
    ),
    transports: [
        new winston.transports.Console()
    ],
});