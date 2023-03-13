import { guestListService } from '@service/db/guestList.service';
import { Request, Response } from 'express';
import HTTP_STATUS from 'http-status-codes';

export class DeleteGuest {
    public async guest(req: Request, res: Response): Promise<void> {
        await guestListService.deleteFromDB(req.params.guestId, req.currentUser!.userId);
        res.status(HTTP_STATUS.OK).json({ message: 'Guest deleted successfully' });
    }
}
