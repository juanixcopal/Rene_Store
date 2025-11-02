import { instanceAPIRenielStore } from '../../config/data-source'

export const postLogin = async ({ login }) => {
  return await instanceAPIRenielStore.post('/user/login', login).then(({ data }) => {
    return data
  })
}
