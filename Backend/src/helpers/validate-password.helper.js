export default ({ bcrypt }) => {
  return async (password, hash) => {
    try {
      const isValid = bcrypt.compareSync(password, hash)
      return isValid
    } catch (error) {
      throw error
    }
  }
}
