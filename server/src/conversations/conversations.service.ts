import { Inject, Injectable, forwardRef } from '@nestjs/common';

@Injectable()
export class ConversationsService 
{
    constructor(
        @Inject(ConversationsService)
        private readonly conversationService : ConversationsService,
    ){}

    createConversation() {
        
    }

}
