import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryColumn, UpdateDateColumn } from "typeorm";
import { User } from "./User";

@Entity('articles')
export class Article {

  @PrimaryColumn({ length: 30 })
  slug: string

  @Column({ length: 50 })
  title: string

  @Column({ length: 100, nullable: true })
  description?: string

  @Column({ type: 'text' })
  body: string

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date

  @ManyToOne(() => User)
  author: User

  constructor(slug: string, title: string, description: string, body: string, author: User) {
    this.slug = slug;
    this.title = title;
    this.description = description;
    this.body = body;
    this.author = author;
  }
}

/*
    "tagList": ["dragons", "training"], // TODO: relationship with tags
    "favorited": false,  //TODO: relationship with user
    "favoritesCount": 0,
    "author": { // TODO: relationship with user
      "username": "jake",
      "bio": "I work at statefarm",
      "image": "https://i.stack.imgur.com/xHWG8.jpg",
      "following": false
    }
     */