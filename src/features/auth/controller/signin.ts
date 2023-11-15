import { Request, Response } from 'express';
import JWT from 'jsonwebtoken';
import HTTP_STATUS from 'http-status-codes';
import { IAuthDocument } from '@auth/interfaces/auth.interface';
import { IUserDocument } from '@user/interfaces/user.interface';
import { BadRequestError } from '@globals/helpers/error-handler';
import { authService } from '@service/db/auth.service';
import { joiValidation } from '@globals/decorators/joi-validation.decorators';
import { signinSchema } from '@auth/schemas/signin.schema';
import { userService } from '@service/db/user.service';
import { config } from '@root/config/config';

export class SignIn {
    @joiValidation(signinSchema)
    public async read(req: Request, res: Response): Promise<void> {
        const { email, password } = req.body;
        const existingUser: IAuthDocument = await authService.getAuthUserByEmail(email);
        if (!existingUser) {
            throw new BadRequestError('Invalid credentials');
        }
        const passwordsMatch: boolean = await existingUser.comparePassword(password);
        if (!passwordsMatch) {
            throw new BadRequestError('Invalid credentials');
        }
        const user: IUserDocument = await userService.getUserByAuthId(`${existingUser._id}`);
        const userJwt: string = JWT.sign(
            {
                userId: user._id,
                uId: existingUser.uId,
                email: existingUser.email,
                username: existingUser.username,
                hasEvent: user.hasEvent
            },
            config.JWT_TOKEN!
        );
        req.session = { jwt: userJwt };
        const userDocument: IUserDocument = {
            ...user,
            authId: existingUser!._id,
            username: existingUser!.username,
            email: existingUser!.email,
            uId: existingUser!.uId,
            createdAt: existingUser!.createdAt,
            hasEvent: existingUser!.hasEvent
        } as unknown as IUserDocument;

        res.status(HTTP_STATUS.OK).json({
            message: 'User login successfully',
            user: userDocument,
            token: userJwt
        });
    }
}
