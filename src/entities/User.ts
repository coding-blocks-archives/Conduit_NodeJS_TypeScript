import { Column, Entity, PrimaryColumn } from "typeorm";


@Entity('users')
export class User {

  @PrimaryColumn()
  email: string

  @Column({ unique: true, nullable: false })
  username: string

  @Column()
  password?: string

  @Column({ type: 'text', nullable: true })
  bio?: string

  @Column({ nullable: true })
  image?: string

  token?: string


  constructor(email: string, username: string, password: string) {
    this.email = email;
    this.username = username;
    this.password = password;
  }
}

/*
{
  "user": {
    "token": "jwt.token.here", // TODO: implement JWT
  }
}
 */