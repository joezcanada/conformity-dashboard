import { InternalServerError } from "../../src/errors/InternalServerError";

describe('InternalServerError', () => {
    test('should create an instance of InternalServerError with the default message', () => {
        const error = new InternalServerError();

        expect(error).toBeInstanceOf(Error);
        expect(error).toBeInstanceOf(InternalServerError);

        expect(error.message).toBe('Internal server error');

        expect(error.name).toBe('InternalServerError');
    });

    test('should create an instance of InternalServerError with a custom message', () => {
        const customMessage = 'A custom internal error occurred';

        const error = new InternalServerError(customMessage);

        expect(error.message).toBe(customMessage);

        expect(error.name).toBe('InternalServerError');
    });
});
