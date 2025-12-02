import { Router } from 'express';

import { signUp, signIn, signOut } from '../controllers/auth.controller.js';

const userRouter = Router();

userRouter.post('/sign-up', signUp);

userRouter.post('/sign-in', signIn);

userRouter.post('/sign-out', signOut);

export default userRouter;

