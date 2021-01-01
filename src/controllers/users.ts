import { getRepository } from "typeorm";
import { User } from "../entities/User";
import { hashPassword, matchPassword } from "../utils/password";
import { sanitizeFields } from "../utils/security";
import { sign } from "../utils/jwt";

interface UserSignupData {
  username: string
  password: string
  email: string
}

interface UserLoginData {
  email: string
  password: string
}

export async function createUser(data: UserSignupData): Promise<User> {

  // Check for data validity
  if (!data.username) throw new Error("username is blank")
  if (!data.email) throw new Error("email is blank")
  if (!data.password) throw new Error("password is blank")

  const repo = await getRepository(User)

  // Check if user exists
  const existing = await repo.findOne(data.email)

  if (existing) throw new Error("User with this email exists")

  // Create user and send back
  try {
    const user = await repo.save(new User(
      data.email,
      data.username,
      await hashPassword(data.password)
    ))
    user.token = await sign(user)
    return sanitizeFields(user)

  } catch (e) {
    throw e
  }
}

export async function loginUser(data: UserLoginData): Promise<User> {

  // Check for data validity
  if (!data.email) throw new Error("email is blank")
  if (!data.password) throw new Error("password is blank")

  const repo = getRepository(User)

  // Check if email exists
  const user  = await repo.findOne(data.email)

  if (!user) throw new Error('No user with this email id')

  // Check if password matches
  const passmatch = await matchPassword(user.password!, data.password)

  // noinspection PointlessBooleanExpressionJS
  if (passmatch === false) throw new Error('Wrong password')

  user.token = await sign(user)
  return sanitizeFields(user)

}

export async function getUserByEmail(email: string): Promise<User> {

  const repo = getRepository(User)

  const user  = await repo.findOne(email)

  if (!user) throw new Error('No user with this email id')

  return sanitizeFields(user)


}