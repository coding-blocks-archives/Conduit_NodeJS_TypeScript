import { NextFunction, Request, Response } from "express";
import { decode } from "../utils/jwt";


export async function authByToken(req: Request, res: Response, next: NextFunction) {

  // check if 'Authorization' header exists
  const authHeader = req.header('Authorization')?.split(' ')
  if (!authHeader) return res.status(401).json({
    errors: { body: [ 'Authorization failed', 'Not Authorization header' ] }
  })

  // Check if Authorization type is Token
  if (authHeader[0] != 'Token') return res.status(401).json({
    errors: { body: [ 'Authorization failed', 'Token missing' ] }
  })

  // Check if token is valid
  const token = authHeader[1];
  try {
    const user = await decode(token);
    if (!user) throw new Error('No user found in token')
    ;(req as any).user = user
    return next()
  } catch (e) {
    return res.status(401).json({
      errors: { body: [ 'Authorization failed', e.message ] }
    })
  }



}