import { Router } from 'express'
import { authByToken } from "../middlewares/auth";
import { getUserByEmail } from "../controllers/users";

const route = Router()

// GET /user      get current user
route.get('/', authByToken, async (req, res) => {

  try {
    const user = await getUserByEmail((req as any).user.email)
    if (!user) throw new Error('No such user found')
    return res.status(200).json({user})
  } catch (e) {
    return res.status(404).json({
      errors: { body: [ e.message ] }
    })
  }

})

// PATCH /user      update data of current user
route.patch('/', async (req, res) => {

})

export const userRoute = route