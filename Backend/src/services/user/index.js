import { userData } from '../../data/index.js'

import makeLoginService from './login.service.js'
import makeCreateUserService from './create-user.service.js'
import makeAllUsersService from './all-users.service.js'

const loginService = makeLoginService({userData})
const createUserService = makeCreateUserService({userData})
const allUsersService = makeAllUsersService({userData})

const userServices = {
    'login': loginService,
    'create-user': createUserService,
    'all-users': allUsersService
}

export default userServices