import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

import env from '../config/env.js'

import makeGenerateTokenHelper from './generate-token.helper.js'
import makeEncryptPasswordHelper from './encrypt-password.helper.js'
import makeValidatePasswordHelper from './validate-password.helper.js'

const generateTokenHelper = makeGenerateTokenHelper({ env, jwt })
const encryptPasswordHelper = makeEncryptPasswordHelper({ env, bcrypt })
const validatePasswordHelper = makeValidatePasswordHelper({ env, bcrypt })

const helpersObject = {
  generateTokenHelper,
  encryptPasswordHelper,
  validatePasswordHelper
}

export default helpersObject
