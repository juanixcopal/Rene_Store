import { instanceAPIInvitaPRO } from '../../config/data-source'

export const postLogin = async ({ login }) => {
  return await instanceAPIInvitaPRO.post('/user/login', login).then(({ data }) => {
    return data
  })
}
