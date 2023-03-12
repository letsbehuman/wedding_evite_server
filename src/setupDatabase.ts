import mongoose from 'mongoose';
import { config } from './config/config';
import Logger from 'bunyan';

const log: Logger = config.createLogger('setupDatabase'); //"database" will indentify where the log is coming from

//when you use a annonymous function you can use it with any name
export default () => {
    const connect = () => {
        mongoose
            .connect(`${config.DATABASE_URL}`)
            .then(() => {
                log.info('Successfully connected to database.');
            })
            .catch((error) => {
                log.error('Error connecting to database', error);
                return process.exit(1);
            });
    };
    connect();
    mongoose.connection.on('disconnected', connect);
};
