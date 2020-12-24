import { Router } from 'express'

const route = Router()

// GET /user
route.get('/', (req, res) => {
    res.send('GET /user has been hit') //TODO: temporary
})

export const userRoute = route