import bcrypt from 'bcrypt'

export class Password {
  static saltRounds: number = 4

  static async toHash(pass: string) {
    const hashedPassword = await bcrypt.hash(pass, Password.saltRounds)
    return hashedPassword
  }

  static async verify(hashedStoredPass: string, unsurePass: string) {
    const isSamePassword = await bcrypt.compare(unsurePass, hashedStoredPass)
    return isSamePassword
  }
}
