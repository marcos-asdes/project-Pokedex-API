import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from 'jsonwebtoken';

import { AppError } from "../events/appError.js";
import appLog from "../events/appLog.js";

import * as service from "../services/auth.service.js";

export default async function validateTokenMiddleware(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.header("Authorization");

  if (!authHeader) {
    throw new AppError(
      'Missing authorization header',
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
      'Missing token',
      401,
      'Missing token',
      'Ensure to provide the required token',
    );
  }

  try {
    if (process.env.JWT_SECRET) {
      const { sub } = jwt.verify(token, process.env.JWT_SECRET) as JwtPayload;
      if (sub) {
        const subject = sub; // subject is id
        const user_data = await service.findUserById_idAsString(subject);
        res.locals.user_data = user_data;
        res.locals.subject = subject;
      }
    }
  } catch (error) {
    throw new AppError(
      'Invalid token',
      401,
      'Invalid token',
      error,
    );
  }
  appLog('Middleware', 'Valid token');
  next();
}
