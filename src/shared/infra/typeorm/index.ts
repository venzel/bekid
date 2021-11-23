import { Express } from 'express';
import { createConnections } from 'typeorm';

const typeormConnect = async (app: Express): Promise<void> => {
    await createConnections()
        .then(() => {
            app.emit('connected');
        })
        .catch((e) => {
            console.log(e);
            console.log('Database connection error!');
        });
};

export { typeormConnect };
