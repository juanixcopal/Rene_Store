import { roleData } from '../../data/index.js'

import makeCreateRolService from './create-rol.service.js'
import makeAllRolService from './all-rol.service.js'

const createRolService = makeCreateRolService({ roleData })
const allRolService = makeAllRolService({ roleData })

const rolServices = {
  'create-rol': createRolService,
  'all-rol': allRolService
}

export default rolServices
