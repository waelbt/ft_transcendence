import { Injectable } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

@Injectable()
export class jwtGuard extends AuthGuard('jwt'){
    constructor(@Inject(JwtService) private readonly jwt: JwtService) {
        super();
    }
    getRequest(context: ExecutionContext) {
        const request = context.switchToHttp().getRequest();
        const token = request.cookies['refreshToken'];
        try{
            const user = this.jwt.verify(token);
            request.user = user;
            console.log('hada', user);
            return request;
        } catch{
            throw new UnauthorizedException('this refresh token is not valid');
        }
        // console.log(request);
      }
      canActivate(context: ExecutionContext) {
        const request = this.getRequest(context);
    
        // Extract the token from the cookie
        const token = request.cookies['refreshToken'];
    
        // Set the JWT token in the request for further use if needed
        request.jwtToken = token;
        return true;
      }
    
}
