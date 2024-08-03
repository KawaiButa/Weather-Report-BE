import express, { Express, Request, Response } from 'express'
import cors from 'cors';
import weatherRouter from '../routers/weatherRouter';
import cityRouter from '../routers/cityRouter';
import emailRouter from '../routers/emailRouter';
export const app: Express = express();
app.use(express.json());
app.use(cors({ origin: true, credentials: true }))
app.use((req: Request, res: Response, next: Function) => {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');
    // Request methods you wish to allow
    res.setHeader(
        'Access-Control-Allow-Methods',
        'GET, POST, OPTIONS',
    );
    next();
});
app.get("", (req, res, next) => {
    res.sendStatus(200)
})
app.use("/email", emailRouter)
app.use("/city", cityRouter)
app.use("/", weatherRouter)
export default app
module.exports = app