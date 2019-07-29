export class ApplicationError extends Error {
    public name = this.constructor.name;

    constructor(
        public message: string,
        public code?: string,
    ) {
        super(message);
    }
}
