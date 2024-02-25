import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { NoFilesInterceptor } from "@nestjs/platform-express";
import { Socket } from 'socket.io';
import { PrismaOrmService } from "src/prisma-orm/prisma-orm.service";


@Injectable()
export class notificationService {
	constructor(private readonly jwt: JwtService,
		private readonly prisma: PrismaOrmService){}
    
	// async createNotification(senderId: string, receiverId: string,
	// 	 action: string, senderAvatar: string, recieverAvatar: string,
	// 	): Promise<Notification> {
	// 	return this.prisma.notification.create({
	// 	  data: {
	// 		senderId          : senderId,
	// 		senderAvatar      : senderAvatar,
	// 		recieverId        : receiverId,
	// 		recieverAvatar    : receiverAvatar,
	// 		action            : action,
	// 	  }
	// 	});
	//   }
	
	//   async getNotificationsForUser(userId: string): Promise<Notification[]> {
	// 	return this.prisma.notification.findMany({
	// 	  where: {
	// 		recieverId: userId
	// 	  }
	// 	});
	//   }
	
	//   async deleteNotification(notificationId: number): Promise<void> {
	// 	await this.prisma.notification.delete({
	// 	  where: {
	// 		id: notificationId
	// 	  }
	// 	});
	//   }
	
	//   async deleteAllNotificationsForUser(userId: string): Promise<void> {
	// 	await this.prisma.notification.deleteMany({
	// 	  where: {
	// 		recieverId: userId
	// 	  }
	// 	});
	//   }

	async createNotification(userId: string, senderNickName: string, senderAvatar: string, recieverNickName: string, recieverAvatar: string, action: string, type: string) {
		const notification = await this.prisma.notification.create({
		  data: {
			userId,
			senderNickName,
			senderAvatar,
			recieverNickName,
			recieverAvatar,
			action,
			type
		  }
		});
		// console.log('-------: ', notification);
		return notification;
	  }
	
	  async getNotificationsForUser(recieverNickName: string) {
		
		// console.log('nickName: ', recieverNickName);
		const notifications = await this.prisma.notification.findMany({
		  where: {
			recieverNickName
		  }
		});

		//
		const filterNotification = notifications.map((oneNotificaion) => {
			const id = oneNotificaion.id;
			const userId = oneNotificaion.userId;
			const nickName = oneNotificaion.senderNickName;
			const avatar = oneNotificaion.senderAvatar;
			const action = oneNotificaion.action;
			const type = oneNotificaion.type;
			return {
				id,
				userId,
				nickName,
				avatar,
				action,
				type,
			} 
		} );
		// console.log('notifications: ', filterNotification);
		// this.deleteAllNotificationsForUser(recieverNickName);
		return (filterNotification);
	  }
	
	  async deleteNotification(userMe: string, friendId: string, recieverNickName: string) {
		
		// // console.log('userMe: ', userMe, 'friendId: ', friendId, 'recieverNickName: ', recieverNickName);

		// const allNotifications = await this.getNotificationsForUser(recieverNickName);
		
		// // console.log('allNOOOOOOTTTT:   ', allNotifications);
		// const user1 = await this.prisma.user.findFirst({
		// 	where: {
		// 		id: friendId
		// 	}
		// });
		// const user2 = await this.prisma.user.findFirst({
		// 	where: {
		// 		id: userMe
		// 	}
		// });
		// // console.log('user1: ', user1.id, 'user2: ', user2.id);
		// const allNotificationId = allNotifications.map((notification)=>{
		// 	if (notification.senderNickName === user1.nickName 
		// 		&& notification.recieverNickName === user2.nickName
		// 		&& notification.action.includes('send you a friend request')){

		// 		return notification.id;
		// 	}
		// 	return null;
		// });
		// // console.log('allIDS: ', allNotificationId);
		// const notificationId = allNotificationId.filter(Boolean);
		// // console.log('after filter: ', notificationId);
		// // const id = notificationId[0];
		// // console.log('notificationId: ', id);
		// // const isNotification = await this.prisma.notification.findUnique({
		// // 	where: {
		// // 	  id: id,
		// // 	}
		// //   });
		// //   console.log('check: ', isNotification);
		// // if (isNotification){
		// 	// console.log('hoooooowa hdak');
		// 	await this.prisma.notification.delete({
		// 		where: {
		// 			id: notificationId[0],
		// 		}
		// 	});
		// // }

		// // for (const notif of notification) {
		// // 	const id: number = notif; // Assuming id is the property representing the notification ID
		// // 	console.log('notificationId: ', notificationId);
		// // 	await this.prisma.notification.delete({
		// // 		where: {
		// // 			id: id,
		// // 		}
		// // 	});
		// // }
	  }

	  async deleteAllNotificationsForUser(recieverNickName: string): Promise<void> {
		await this.prisma.notification.deleteMany({
		  where: {
			recieverNickName
		  }
		});
	  }

	async getUserFromAccessToken(token: string) {
        // const accessToken =  await this.retrieveAccessToken(cookie);
        try {
            var jwtCheck = await this.jwt.verify(token, {
                secret: process.env.JWT_secret
            });
        } catch (err) {
            return { message: 'Not Authorized', state: false };
        }
        return { userData: jwtCheck, state: true };
    }
}