import {User} from "../entities/User";


export function sanitizeFields(user: User) {
    if (user.password) delete user.password
    return user
}