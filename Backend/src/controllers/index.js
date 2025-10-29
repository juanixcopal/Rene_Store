import helpersObject from '../helpers/index.js'

import userServices from '../services/user/index.js'
import rolServices from '../services/rol/index.js'

import makeUserController from './user.controller.js'
import makeRolController from './rol.controller.js'

const userController = makeUserController({userServices, helpersObject})
const rolController = makeRolController({rolServices})

export {
    userController,
    rolController
}