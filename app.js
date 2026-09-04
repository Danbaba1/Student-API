import express from 'express';
import { createRouter } from './routes/app.route.js';

export function createApp(router = createRouter()) {
    const app = express();

    app.use(express.json());
    app.use("/students", router);

    return app;
}
