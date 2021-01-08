import { Article } from "../entities/Article";
import { getRepository } from "typeorm";
import { User } from "../entities/User";
import { slugify } from "../utils/stringutils";
import { sanitizeFields } from "../utils/security";

interface ArticleData {
  title: string
  description: string
  body: string
  tagList: string[]
}

export async function createArticle(data: ArticleData, email: string): Promise<Article> {

  // Data validation
  if (!data.title) throw new Error('Article title absent')
  if (!data.description) throw new Error('Article description absent')
  if (!data.body) throw new Error('Article body absent')

  const articleRepo = getRepository(Article)
  const userRepo = getRepository(User)


  try {
    // Find out the author object
    const user = await userRepo.findOne(email)
    if (!user) throw new Error('User does not exist')

    const article = await articleRepo.save(new Article(
      slugify(data.title),
      data.title,
      data.description,
      data.body,
      sanitizeFields(user)
    ))

    return article

  } catch (e) {
    throw e
  }
}

export async function deleteArticle(slug: string): Promise<boolean> {
  return true //TODO
}
//
// export async function updateArticle(slug: string, data: Partial<ArticleData>): Promise<Article> {
//   return new Article() // TODO
// }
//
// export async function getAllArticles(): Promise<Article[]> {
//   return [new Article()] // TODO
// }
//
// export async function getFeedArticles(email: string): Promise<Article[]> {
//   return [new Article()] // TODO
// }
//
export async function getArticleBySlug(slug: string): Promise<Article> {
  const repo = getRepository(Article)
  const article = await repo.findOne(slug, {relations: ['author']})

  if(!article) throw new Error('Article not found')

  article.author = sanitizeFields(article.author)
  return article
}
