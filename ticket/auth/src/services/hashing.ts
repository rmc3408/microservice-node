import bcrypt from 'bcrypt'

export class Password {
  static saltRounds: number = 4

  static async toHash(pass: string) {
    const salt = await bcrypt.genSalt(Password.saltRounds)
    const hashedPassword = await bcrypt.hash(pass, Password.saltRounds)
    return hashedPassword
  }

  static async verify(storePass: string, unsurePass: string) {
    const [hashedPassword, _salt] = storePass.split('.')
    const isSamePassword = await bcrypt.compare(unsurePass, hashedPassword)
    return isSamePassword
  }
}
