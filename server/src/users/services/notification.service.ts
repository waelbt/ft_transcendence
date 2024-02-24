import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
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

	async createNotification(senderNickName: string, senderAvatar: string, recieverNickName: string, recieverAvatar: string, action: string) {
		const notification = await this.prisma.notification.create({
		  data: {
			senderNickName,
			senderAvatar,
			recieverNickName,
			recieverAvatar,
			action,
		  }
		});

		console.log('-------: ', notification);
		return notification;
	  }
	
	  async getNotificationsForUser(recieverNickName: string) {
		
		console.log('nickName: ', recieverNickName);
		const notifications = await this.prisma.notification.findMany({
		  where: {
			recieverNickName
		  }
		});
		console.log('notifications: ', notifications);
		this.deleteAllNotificationsForUser(recieverNickName);
		return (notifications);
	  }
	
	//   async deleteNotification(notificationId: number): Promise<void> {
	// 	await this.prisma.notification.delete({
	// 	  where: {
	// 		id: notificationId
	// 	  }
	// 	});
	//   }
	
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