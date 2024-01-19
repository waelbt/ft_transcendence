import { Controller, Get, NotFoundException, Param, Post, Req, UnauthorizedException } from "@nestjs/common";
import { friendsService } from "../services/friends.service";
import { UsersService } from "../services/users.service";
import { ApiParam, ApiTags } from "@nestjs/swagger";

@ApiTags('friends')
@Controller('friends')
export class friendsController {
    constructor(private readonly friendsService: friendsService,
        private readonly userService: UsersService){}

    //endPoint to send request (post)
    @Post('sendFriendRequest/:friendId')
    @ApiParam({name: 'friendId', description: 'id of the user recieves friend request', type: 'string'})

    async sendFriendRequest(
        @Req() req,
        @Param('friendId') friendId: string){
            if (friendId == req.user.sub){
                console.log('user1: ', friendId, 'sub: ', req.user.sub);
                throw new UnauthorizedException('You are not allowed to send this friend request');
            }
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
        // if (friendId != req.user.sub){
        //     console.log('user1: ', friendId, 'sub: ', req.user.sub);
        //     throw new UnauthorizedException('You are not allowed to reject this friend request');
        // }
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
    @Get(':id1/typeProfile/:id2')
    async typeOfProfile(
        @Req() req,
        @Param('id1') userId1: string,
        @Param('id2') userId2: string,
    ){
        if (userId1 != req.user.sub){
            console.log('user1: ', userId1, 'sub: ', req.user.sub);
            throw new UnauthorizedException('You are not allowed to remove this user from friends');
        }
        return (await this.friendsService.typeOfProfile(userId1, userId2));
    }

    //endPoint to remove user from friend list
    @Post('removeSentFriendRequest/:friendId')
    async removeSentFriendRequestFriend(
        @Req() req,
        @Param('friendId') friendId: string,
    ){
        // if (friendId != req.user.sub){
        //     console.log('user1: ', friendId, 'sub: ', req.user.sub);
        //     throw new UnauthorizedException('You are not allowed to remove this friend request');
        // }
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
        if (friendId != req.user.sub){
            console.log('user1: ', friendId, 'sub: ', req.user.sub);
            throw new UnauthorizedException('You are not allowed to remove this user from friends');
        }
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
    @Get(':id/numberOfFriends')
    async numberOfFriends(@Param('id') userId: string){
        try {
            const numberOfFriends = await this.friendsService.getNumberOfFriends(userId);
            return { numberOfFriends };
          } catch (error) {
            if (error instanceof NotFoundException) {
              throw new NotFoundException('User not found');
            }
            throw error;
          }
    }

    //endPoint for the list of friends
    @Get(':id/listFriends')
    async getListFriends(@Req() req, @Param('id') userId: string){
        if (userId != req.user.sub){
            console.log('user1: ', userId, 'sub: ', req.user.sub);
            throw new UnauthorizedException('You are not allowed to see this friend list');
        }
        try {
            const friends = await this.friendsService.listFriends(userId);
            return { friends };
          } catch (error) {
            if (error instanceof NotFoundException) {
              throw new NotFoundException('User not found');
            }
            throw error;
          }
    }

    //endPoint to list friends for another user
    @Get(':id/friends/:viewerId')
    async userListFriends(
        @Req() req,
        @Param('id') userId: string,
        @Param('viewerId') viewerId: string,
    ){
        if (userId != req.user.sub){
            console.log('user1: ', userId, 'sub: ', req.user.sub);
            throw new UnauthorizedException('You are not allowed to see this friend list');
        }
        try {
            const friends = await this.friendsService.userListFriends(userId, viewerId);
            return { friends };
          } catch (error) {
            if (error instanceof NotFoundException) {
              throw new NotFoundException('User not found');
            }
            throw error;
          }
    }
}