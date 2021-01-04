import { Router } from "express";
import { authByToken } from "../middlewares/auth";
import { createArticle } from "../controllers/articles";


const route = Router()

// GET /api/articles      List articles
route.get('/', async (req, res) => {

})

// GET /api/articles/feed      Feed articles for given user
route.get('/feed', authByToken, async (req, res) => {

})

// GET /api/articles/:slug    Get a single article
route.get('/:slug', async (req, res) => {

})

// POST /api/articles         Create an article
route.post('/', authByToken, async (req, res) => {
  try {
    const article = await createArticle(req.body.article, (req as any).user.email)
    res.status(201).json({ article })
  } catch (e) {
    return res.status(422).json({
      errors: { body: [ 'Could not create article', e.message ] }
    })
  }
})

// PATCH /api/articles/:slug  Update an article
route.patch('/:slug', async (req, res) => {

})

// DELETE /api/articles/:slug
route.delete('/:slug', async (req, res) => {

})


export const articlesRoute = route