import express from "express";
import cookieParser from "cookie-parser";
import {PORT, SERVER_URL} from "./config/env.js";

import userRouter from "./routes/user.routes.js";
import authRouter from "./routes/auth.routes.js";
import subscriptionRouter from "./routes/subscription.routes.js";
import workflowRouter from "./routes/workflow.routes.js";

import connectToDatabase from "./database/mongodb.js";
import errorMiddlewares from "./middlewares/error.middleware.js";
import arcjetMiddleware from "./middlewares/arcjet.middleware.js";




const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false}));
app.use(cookieParser());
app.use(arcjetMiddleware);

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/subscriptions', subscriptionRouter);
app.use('/api/v1/workflows', workflowRouter);


app.use(errorMiddlewares);

app.get("/", (req, res) => {
    res.send('Welcome to Subscription tracker API');
});


app.listen(PORT, async() => {
    console.log(`Subscription tracker api is running on ${ SERVER_URL } in ${process.env.NODE_ENV} mode`);
    await connectToDatabase();
});

export default app;