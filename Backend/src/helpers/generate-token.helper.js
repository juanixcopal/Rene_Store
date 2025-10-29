export default ({ env, jwt }) => {
  return async payload => {
    try {
      const { JWT_SECRET, JWT_EXPIRESIN } = env
      const token = jwt.sign(JSON.parse(JSON.stringify(payload)) || {}, JWT_SECRET, { expiresIn: JWT_EXPIRESIN })
      return token
    } catch (error) {
      throw error
    }
  }
}
