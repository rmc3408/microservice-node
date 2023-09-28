import { scrypt, randomBytes } from 'crypto'
import { promisify } from 'util'

const scryptAsync = promisify(scrypt)

export class Password {
  static async toHash(pass: string) {
    const salt = randomBytes(4).toString('hex')
    const buffer = (await scryptAsync(pass, salt, 8)) as Buffer
    return `${buffer.toString('hex')}.${salt}`
  }

  static async verify(storePass: string, unsurePass: string) {
    const [hashedPassword, salt] = storePass.split('.')
    const buf = (await scryptAsync(unsurePass, salt, 8)) as Buffer
    const convertedTestingPassword = buf.toString('hex')

    return convertedTestingPassword === hashedPassword
  }
}
