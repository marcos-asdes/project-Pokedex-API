import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from 'jsonwebtoken';

import { AppError } from "../events/AppError.js";
import AppLog from "../events/AppLog.js";

import * as service from "../services/auth.service.js";

export default async function validateTokenMiddleware(req: Request, res: Response, next: NextFunction) {
  const authHeader: string = req.header("Authorization");
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
  //const token = tokenExists.replace('Bearer ', '').trim() ?? null;;
  if (!token) {
    throw new AppError(
      'Missing token',
      401,
      'Missing token',
      'Ensure to provide the required token',
    );
  }

  let subject = null;
  try {
    const { sub } = jwt.verify(token, process.env.JWT_SECRET) as JwtPayload;
    subject = sub;
    const user = await service.findUserById(subject);
    AppLog('Repository', 'User searched by id');
    res.locals.user = user;
    res.locals.subject = subject;
  } catch (error) {
    throw new AppError(
      'Invalid token',
      401,
      'Invalid token',
      error,
    );
  }
  AppLog('Middleware', 'Valid token');
  next();
}
