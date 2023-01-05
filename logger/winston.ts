import winston from 'winston';
import { Options } from 'morgan';

const options = {
    file: {
        level: 'info',
        name: 'file.info',
        filename: `./logs/app.log`,
        handleExceptions: true,
        json: true,
        maxsize: 5242880, // 5MB
        maxFiles: 100,
        colorize: true,
    },
    errorFile: {
        level: 'error',
        name: 'file.error',
        filename: `./logs/error.log`,
        handleExceptions: true,
        json: true,
        maxsize: 5242880, // 5MB
        maxFiles: 100,
        colorize: true,
    },
    console: {
        level: 'debug',
        handleExceptions: true,
        json: false,
        colorize: true,
    },
};

export const logger = winston.createLogger({
    format: winston.format.combine(
        winston.format.timestamp({format: "DD-MM-YYYY HH:mm:ss"}),
        winston.format.json()
    ),
    transports: [
        new (winston.transports.Console)(options.console),
        new (winston.transports.File)(options.errorFile),
        new (winston.transports.File)(options.file)
    ],
    exitOnError: false
});

export const morganOption: Options<any, any> = {
    stream: {
        write: function (message: string) {
            logger.info(message.trim());
        },
    },
};
