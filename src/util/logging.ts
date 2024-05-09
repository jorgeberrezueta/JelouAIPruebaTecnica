import winston from 'winston';

export const errorLogger = winston.createLogger({
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json()
    ),
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({ 
            filename: 'error.log',
            level: 'error' 
        })
    ]
});