// import { Controller, Get, NotFoundException, Param, Post } from "@nestjs/common";
// import { friendsService } from "../services/friends.service";

// @Controller('friends')
// export class friendsController {
//     constructor(private readonly friendsService: friendsService){}

//     //endPoint to send request (post)
//     @Post(':id/sendFriendRequest/:friendId')
//     async sendFriendRequest(
//         @Param('id') userId: string,
//         @Param('friendId') friendId: string){
//             try{
//                 await this.friendsService.sendFriendRequest(userId, friendId);
//                 return { message: 'Friend request sent successfully' };
//             } catch (error){
//                 if (error instanceof NotFoundException) {
//                     throw new NotFoundException('User or friend not found');
//                 }
//                 throw error;
//             }
//     }

//     //endPoint to accept a friendship request
//     @Post(':id/acceptFriendRequest/:friendId')
//     async acceptFriendRequest(
//         @Param('id') userId: string,
//         @Param('friendId') friendId: string,
//     ){
//         try{
//             await this.friendsService.acceptFriendRequest(userId, friendId);
//             return { message: 'Friend request Accepted successfully'};
//         } catch (error){
//             if (error instanceof NotFoundException) {
//                 throw new NotFoundException('friend request not found');
//             }
//             throw error;
//         }
//     }

//     //endPoint to reject a frienship request
//     @Post(':id/rejectFriendRequest/:friendId')
//     async rejectFriendRequest(
//         @Param('id') userId: string,
//         @Param('friendId') friendId: string,
//     ){
//         try{
//             await this.friendsService.rejectFriendRequest(userId, friendId);
//             return { message: 'Friend request Rejected successfully'};
//         } catch (error){
//             if (error instanceof NotFoundException) {
//                 throw new NotFoundException('friend request not found');
//             }
//             throw error;
//         }
//     }

//     //endPoint to return which type of profile to display
//     @Get('typeProfile')
//     async typeOfProfile(){}

//     //endPoint to remove user from friend list
//     @Post(':id/removeSentFriendRequest/:friendId')
//     async removeSentFriendRequestFriend(
//         @Param('id') userId: string,
//         @Param('friendId') friendId: string,
//     ){
//         try{
//             await this.friendsService.removeSentFriendRequest(userId, friendId);
//             return { message: 'Friend request sent remove successfully'};
//         } catch (error){
//             if (error instanceof NotFoundException) {
//                 throw new NotFoundException('friend request not found');
//             }
//             throw error;
//         }
//     }

//     //endPoint to return number of friends
//     @Get(':id/numberOfFriends')
//     async numberOfFriends(@Param('id') userId: string){
//         try {
//             const numberOfFriends = await this.friendsService.getNumberOfFriends(userId);
//             return { numberOfFriends };
//           } catch (error) {
//             if (error instanceof NotFoundException) {
//               throw new NotFoundException('User not found');
//             }
//             throw error;
//           }
//     }

//     //endPoint for the list of friends
//     @Get('listFriends')
//     async getListFriends(userId: string){
//         try {
//             const friends = await this.friendsService.listFriends(userId);
//             return { friends };
//           } catch (error) {
//             if (error instanceof NotFoundException) {
//               throw new NotFoundException('User not found');
//             }
//             throw error;
//           }
//     }

//     //endPoint to list friends for another user
//     @Get(':id/friends/:viewerId')
//     async userListFriends(
//         @Param('id') userId: string,
//         @Param('viewerId') viewerId: string,
//     ){
//         try {
//             const friends = await this.friendsService.userListFriends(userId, viewerId);
//             return { friends };
//           } catch (error) {
//             if (error instanceof NotFoundException) {
//               throw new NotFoundException('User not found');
//             }
//             throw error;
//           }
//     }
// }