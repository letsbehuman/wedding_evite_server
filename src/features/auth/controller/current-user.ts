import HTTP_STATUS from 'http-status-codes';
import { IUserDocument } from '@user/interfaces/user.interface';
import { Request, Response } from 'express';
import { userService } from '@service/db/user.service';

export class CurrentUser {
    public async read(req: Request, res: Response): Promise<void> {
        let isUser = false;
        let token = null;
        let user = null;
        const existingUser: IUserDocument = await userService.getUserById(
            `${req.currentUser!.userId}`
        );
        console.log(req.currentUser);
        if (Object.keys(existingUser).length) {
            isUser = true;
            token = req.session?.jwt;
            user = existingUser;
        }
        res.status(HTTP_STATUS.OK).json({ token, isUser, user });
    }
}
