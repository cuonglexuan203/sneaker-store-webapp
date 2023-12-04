export class AuthRequiredError extends Error {
    constructor(message = "Auth is required to access this resource") {
        super(message);
        this.name = "AuthRequiredError";
    }
}
