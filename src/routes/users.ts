import { Router } from 'express'
import { createUser, loginUser } from "../controllers/users";

const route = Router()

// POST /users/login        Login
route.post('/login', async (req, res) => {

  try {
    const user = await loginUser(req.body.user)
    return res.status(200).json({ user })
  } catch (e) {
    return res.status(422).json({
      errors: { body: [ 'Login failed', e.message ] }
    })
  }

})

// POST /users              Register a new user
route.post('/', async (req, res) => {

  try {
    const user = await createUser(req.body.user)
    return res.status(201).json({ user })
  } catch (e) {
    return res.status(422).json({
      errors: { body: [ 'Could not create user ', e.message ] }
    })
  }
})


export const usersRoute = route