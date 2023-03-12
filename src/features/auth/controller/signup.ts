import { IContact } from './../../event/interfaces/event.interface';
import { IUserDocument } from './../../user/interfaces/user.interface';
import { userService } from '@service/db/user.service';
import { config } from '@root/config/config';
import { Request, Response } from 'express';
import { IAuthDocument, ISignUpData } from '@auth/interfaces/auth.interface';
import { signupSchema } from '@auth/schemas/signup.schema';
import { joiValidation } from '@globals/decorators/joi-validation.decorators';
import { BadRequestError } from '@globals/helpers/error-handler';
import { Helpers } from '@globals/helpers/helpers';
import { authService } from '@service/db/auth.service';
import { ObjectId } from 'mongodb';
import JWT from 'jsonwebtoken';
import HTTP_STATUS from 'http-status-codes';
import { omit } from 'lodash';

export class SignUp {
    @joiValidation(signupSchema)
    public async create(req: Request, res: Response): Promise<void> {
        const { username, password, email } = req.body;
        const checkIfUserExist: IAuthDocument = await authService.getUserByUsernameOrEmail(
            username,
            email
        );
        if (checkIfUserExist) {
            throw new BadRequestError('Invalid credentials');
        }
        const authObjectId: ObjectId = new ObjectId();
        const userObjectId: ObjectId = new ObjectId();
        const uId = `${Helpers.generateRandomIntegers(12)}`;
        const authData: IAuthDocument = SignUp.prototype.singupData({
            _id: authObjectId,
            uId,
            username,
            email,
            password
        });
        const userData: IUserDocument = SignUp.prototype.userData(authData, userObjectId);
        //** Adding to db */
        await authService.createAuthUser(authData);
        omit(userData, ['uId', 'username', 'password', 'email']);
        await userService.addUserData(userData);

        const userJwt: string = SignUp.prototype.signupToken(authData, userObjectId);
        req.session = { jwt: userJwt };
        res.status(HTTP_STATUS.CREATED).json({
            message: 'User created successfully',
            user: authData,
            token: userJwt
        });
    }

    private signupToken(data: IAuthDocument, userObjectId: ObjectId): string {
        return JWT.sign(
            {
                userId: userObjectId,
                uId: data.uId,
                email: data.email,
                username: data.username
            },
            config.JWT_TOKEN!
        );
    }

    private singupData(data: ISignUpData): IAuthDocument {
        const { _id, username, email, uId, password } = data;
        return {
            _id,
            uId,
            username: Helpers.firstLetterUppercase(username),
            email: Helpers.lowerCase(email),
            password,
            createdAt: new Date()
        } as unknown as IAuthDocument;
    }

    private userData(data: IAuthDocument, userObjectId: ObjectId): IUserDocument {
        const { _id, username, password, email } = data;
        return {
            _id: userObjectId,
            authId: _id,
            username: Helpers.firstLetterUppercase(username),
            password,
            email,
            event: {
                title: '',
                nameOne: '',
                nameTwo: '',
                date: '',
                time: '',
                contactOne: '',
                contactTwo: '',
                contactThree: '',
                locationOne: '',
                locationTwo: '',
                locationThree: '',
                message: '',
                createdAt: ''
            }
        } as unknown as IUserDocument;
    }
}
