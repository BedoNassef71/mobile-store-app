import express from "express";
import morgan from 'morgan';
import {notFoundException} from './utils/exceptions/404.exception';
import {handleException} from './utils/exceptions/handle.exception';
import {router as authRouter} from './routers/auth.router'
import {router as categoryRouter} from './routers/category.router'

export const setupExpressApp = () => {
  const app = express();

  app.use(express.json());

  app.use(morgan('dev'));

  app.use('/auth', authRouter);
  app.use('/categories', categoryRouter);

  app.use(notFoundException);

  app.use(handleException);

  return app;
};