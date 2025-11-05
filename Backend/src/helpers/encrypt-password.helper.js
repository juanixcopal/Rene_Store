export default ({ env, bcrypt }) => {
  return async password => {
    try {
      const { BCRYPT_SALT_ROUNDS } = env

      const salt = bcrypt.genSaltSync(parseInt(BCRYPT_SALT_ROUNDS))
      const hash = bcrypt.hashSync(password, salt)

      return hash
    } catch (error) {
      throw error
    }
  }
}
