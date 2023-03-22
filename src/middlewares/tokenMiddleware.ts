import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from 'jsonwebtoken';

import { AppError } from "../events/appError.js";
import appLog from "../events/appLog.js";

import * as service from "../services/auth.service.js";

export default async function validateTokenMiddleware(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.header("Authorization");

  if (!authHeader) {
    throw new AppError(
      401,
      'Missing authorization header',
      'Ensure to provide the necessary headers',
    );
  }

  const token = authHeader.replace("Bearer ", "");
  //const token = authHeader ? authHeader.split(" ")[1] : null;
  //const token = authHeader.replace('Bearer ', '').trim() ?? null;;
  if (!token) {
    throw new AppError(
      401,
      'Missing token',
      'Ensure to provide the required token',
    );
  }

  if (process.env.JWT_SECRET) {
    try {
      const { sub } = jwt.verify(token, process.env.JWT_SECRET) as JwtPayload;
      if (sub) {
        const user_data = await service.findUserById_idAsString(sub);
        res.locals.user_data = user_data;
        res.locals.subject = sub;
      }
    } catch (error) {
      throw new AppError(
        401,
        'Invalid token',
        error,
      );
    }
  } else {
    throw new AppError(
      500,
      'JWT environment variable not found',
      'Insert the environment variable JWT_SECRET in .env file',
    );
  }

  appLog('Middleware', 'Valid token');
  next();
}
