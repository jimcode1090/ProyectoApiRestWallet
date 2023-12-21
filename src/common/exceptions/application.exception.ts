export class ApplicationException extends Error {

    constructor(message: string = 'Se produjo un error inesperado.') {
        super(message);
    }
}