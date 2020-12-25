import bcrypt from 'bcrypt'

const SALT_ROUNDS = 10

export function hashPassword(password: string): Promise<string> {

  return new Promise<string>((resolve, reject) => {

    bcrypt.hash(password, SALT_ROUNDS, (err, encrypted) => {
      if (err) return reject(err)

      resolve(encrypted)
    })

  })

}

export function matchPassword(hash: string, password: string): Promise<boolean> {
  return new Promise<boolean>((resolve, reject) => {

    bcrypt.compare(password, hash, (err, same) => {
      if (err) return reject(err)

      resolve(same)
    })
  })
}
