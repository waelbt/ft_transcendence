import { ExecutionContext, createParamDecorator } from "@nestjs/common";

export const getCurrentUserId = createParamDecorator(
    (data: undefined ,context: ExecutionContext) : number => {
        const request = context.switchToHttp().getRequest();
        if (!data)
            return request.user;
        return request.user['sub'];
    },
);