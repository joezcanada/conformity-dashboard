import express, { Express } from "express";
import cors from 'cors';
import dotenv from "dotenv";
import complianceRouter from "./routers/complianceRouter";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

app.use(cors());

app.use('/api/v1', complianceRouter);

app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});

export default app;