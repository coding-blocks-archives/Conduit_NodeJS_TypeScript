import { Router } from 'express'
import {createUser} from "../controllers/users";

const route = Router()

// POST /users/login        Login
route.post('/', async (req, res) => {

    try {
        const user = await createUser(req.body.user)
        return res.send(user)
    } catch (e) {
        console.error(e)
        return res.status(422).json({
            errors: { body: ['Could not create user '] }
        })
    }
})

// POST /users              Register a new user
route.post('/', (req, res) => {

})


export const usersRoute = route