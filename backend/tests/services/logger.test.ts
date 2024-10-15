import { logger } from '../../src/services/logger';
import * as winston from 'winston';

describe('Logger', () => {
    let consoleSpy: jest.SpyInstance;

    beforeEach(() => {
        // consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => { });
        consoleSpy = jest.spyOn(winston.transports.Console.prototype, 'log');
    });

    afterEach(() => {
        consoleSpy.mockRestore();
    });

    test('should log message with correct format and level', () => {
        const logMessage = 'This is a test log message';

        logger.info(logMessage, { key: 'value' });

        expect(consoleSpy).toHaveBeenCalledTimes(1);

        const logOutput = consoleSpy.mock.calls[0][0];

        expect(logOutput).toHaveProperty('level', 'info');
        expect(logOutput).toHaveProperty('message', logMessage);
        expect(logOutput).toHaveProperty('timestamp');
    });

    test('should use the specified timestamp format', () => {
        const logMessage = 'Test timestamp format';

        logger.log({
            level: 'info',
            message: logMessage
        });

        const logOutput = consoleSpy.mock.calls[0][0];

        const timestampRegex = /\w{3}-\d{2}-\d{4} \d{2}:\d{2}:\d{2}/;

        expect(logOutput.timestamp).toMatch(timestampRegex);
    });
});
