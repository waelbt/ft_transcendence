import { Controller, Get, NotFoundException, Param, Post, Req} from "@nestjs/common";
import { friendsService } from "../services/friends.service";
import { UsersService } from "../services/users.service";
import { ApiBearerAuth, ApiOperation, ApiParam, ApiResponse, ApiTags } from "@nestjs/swagger";
import { BlockService } from "../services/blocked.service";
import { smallData } from "../dto/smallData.dto";
import { friendsData } from "../dto/friendsData";

@ApiBearerAuth()
@ApiTags('friends')
@Controller('friends')
export class friendsController {
    constructor(private readonly friendsService: friendsService,
        private readonly userService: UsersService,
        private readonly blockService: BlockService,){}

    //endPoint to send request (post)
    @Post('sendFriendRequest/:friendId')
    @ApiParam({name: 'friendId', description: 'id of the user recieves friend request', type: 'string'})

    async sendFriendRequest(
        @Req() req,
        @Param('friendId') friendId: string){

            const isItBlocked = await this.blockService.isUserBlocked(req.user.sub, friendId);
            if (isItBlocked)
                throw new NotFoundException('this user does not exist');

            try{
                await this.friendsService.sendFriendRequest(req.user.sub, friendId);
                return { message: 'Friend request sent successfully' };
            } catch (error){
                if (error instanceof NotFoundException) {
                    throw new NotFoundException('User or friend not found');
                }
                throw error;
            }
    }

    //endPoint to accept a friendship request
    @Post('acceptFriendRequest/:friendId')
    @ApiParam({name: 'friendId', description: 'id of the user that send a friend request', type: 'string'})

    async acceptFriendRequest(
        @Req() req,
        @Param('friendId') friendId: string,
    ){

        const isItBlocked = await this.blockService.isUserBlocked(req.user.sub, friendId);
        if (isItBlocked)
            throw new NotFoundException('this user does not exist');

        try{
            await this.friendsService.acceptFriendRequest(req.user.sub, friendId);
            return { message: 'Friend request Accepted successfully'};
        } catch (error){
            if (error instanceof NotFoundException) {
                throw new NotFoundException('friend request not found');
            }
            throw error;
        }
    }

    //endPoint to reject a frienship request
    @Post('rejectFriendRequest/:friendId')
    async rejectFriendRequest(
        @Req() req,
        @Param('friendId') friendId: string,
    ){

        const isItBlocked = await this.blockService.isUserBlocked(req.user.sub, friendId);
        if (isItBlocked)
            throw new NotFoundException('this user does not exist');

        try{
            await this.friendsService.rejectFriendRequest(req.user.sub, friendId);
            return { message: 'Friend request Rejected successfully'};
        } catch (error){
            if (error instanceof NotFoundException) {
                throw new NotFoundException('friend request not found');
            }
            throw error;
        }
    }

    //endPoint to return which type of profile to display
    @Get('typeProfile/:id')
    async typeOfProfile(
        @Req() req,
        @Param('id') userId: string,
    ){
        const isItBlocked = await this.blockService.isUserBlocked(req.user.sub, userId);
        if (isItBlocked)
            throw new NotFoundException('this user does not exist');
        return (await this.friendsService.typeOfProfile(req.user.sub, userId));
    }

    //endPoint to remove user from friend list
    @Post('removeSentFriendRequest/:friendId')
    async removeSentFriendRequestFriend(
        @Req() req,
        @Param('friendId') friendId: string,
    ){

        const isItBlocked = await this.blockService.isUserBlocked(req.user.sub, friendId);
        if (isItBlocked)
            throw new NotFoundException('this user does not exist');

        try{
            await this.friendsService.removeSentFriendRequest(req.user.sub, friendId);
            return { message: 'Friend request sent remove successfully'};
        } catch (error){
            if (error instanceof NotFoundException) {
                throw new NotFoundException('friend request not found');
            }
            throw error;
        }
    }

    //endPoint to remove user from friend list
    @Post('removeFriend/:friendId')
    async removeFriend(
        @Req() req,
        @Param('friendId') friendId: string,
    ){

        const isItBlocked = await this.blockService.isUserBlocked(req.user.sub, friendId);
        if (isItBlocked)
            throw new NotFoundException('this user does not exist');

        try{
            await this.friendsService.removeFriend(req.user.sub, friendId);
            return { message: 'Friend remove successfully'};
        } catch (error){
            if (error instanceof NotFoundException) {
                throw new NotFoundException('friend request not found');
            }
            throw error;
        }
    }

    //endPoint to return number of friends
    @Get('numberOfFriends')
    async numberOfFriends(@Req() req){
        try {
            const numberOfFriends = await this.friendsService.getNumberOfFriends(req.user.sub);
            return { numberOfFriends };
          } catch (error) {
            if (error instanceof NotFoundException) {
              throw new NotFoundException('User not found');
            }
            throw error;
          }
    }

    //endPoint for the list of friends
    @Get('listFriends')
    @ApiOperation({ summary: 'get list of my friends'})
	@ApiResponse({ status: 200, description: 'Returns list of my friends', type: smallData})
    async getListFriends(@Req() req): Promise<smallData[]>{
        try {
            const friends = await this.friendsService.listFriends(req.user.sub);
            return friends;
          } catch (error) {
            if (error instanceof NotFoundException) {
              throw new NotFoundException('User not found');
            }
            throw error;
          }
    }

    //endPoint to list friends for another user
    @Get('friends/:viewerId')
    @ApiOperation({ summary: 'get list of another user friends'})
	@ApiResponse({ status: 200, description: 'Returns list of my friends', type: friendsData})
    async userListFriends(
        @Req() req,
        @Param('viewerId') viewerId: string,
    ): Promise<friendsData[]> {

        const isItBlocked = await this.blockService.isUserBlocked(req.user.sub, viewerId);
        if (isItBlocked)
            throw new NotFoundException('this user does not exist');

        try {
            const friends = await this.friendsService.userListFriends(req.user.sub, viewerId);
            return friends;
          } catch (error) {
            if (error instanceof NotFoundException) {
              throw new NotFoundException('User not found');
            }
            throw error;
          }
    }
}
