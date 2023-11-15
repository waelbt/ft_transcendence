import { AuthGuard } from "@nestjs/passport";

export class refreshTokenGuard extends AuthGuard('jwt-refresh') {
    constructor() {
        super();
    }
}