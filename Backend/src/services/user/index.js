import { userData } from '../../data/index.js'

import makeLoginService from './login.service.js'
import makeCreateUserService from './create-user.service.js'
import makeAllAdminUsersService from './all-admin-users.service.js'
import makeAllUserUsersService from './all-user-users.service.js'
import makeEditUserService from './edit-user.service.js'
import makeRegisterUserService from './register-user.service.js'

const loginService = makeLoginService({ userData })
const createUserService = makeCreateUserService({ userData })
const allAdminUsersService = makeAllAdminUsersService({ userData })
const allUserUsersService = makeAllUserUsersService({ userData })
const editUserService = makeEditUserService({ userData })
const registerUserService = makeRegisterUserService({ userData })

const userServices = {
  login: loginService,
  'create-user': createUserService,
  'all-admin-users': allAdminUsersService,
  'all-user-users': allUserUsersService,
  'edit-user': editUserService,
  'register-user': registerUserService
}

export default userServices
