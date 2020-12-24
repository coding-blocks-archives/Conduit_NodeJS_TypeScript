import {getRepository} from "typeorm";
import {User} from "../entities/User";
import {hashPassword} from "../utils/password";
import {sanitizeFields} from "../utils/security";

interface UserSignupData {
    username: string
    password: string
    email: string
}

export async function createUser(data: UserSignupData) {

    if (!data.username) throw new Error("username is blank")
    if (!data.email) throw new Error("email is blank")
    if (!data.password) throw new Error("password is blank")

    try {
        const user = new User()
        user.username = data.username
        user.email = data.email
        user.password = await hashPassword(data.password)

        const result = await getRepository(User).save(user)
        console.log(sanitizeFields(user))

        return user
    } catch (e) {
        console.error(e)
        throw e
    }
}