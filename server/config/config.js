'user strict'

const joi = require('joi')
const chalk = require('chalk')

// require and configure dotenv, will load vars in .env in PROCESS.ENV
require('dotenv').config()

const envVarsSchema = joi.object({
  NODE_ENV: joi.string()
    .allow(['development', 'production', 'test'])
    .default('development'),
  PORT: joi.number().default(8000),
  MONGOOSE_DEBUG: joi.boolean().when('NODE_ENV', {
    is: joi.string().equal('development'),
    then: joi.boolean().default(true),
    otherwise: joi.boolean().default(false)
  }),
  JWT_SECRET: joi.string().required()
    .description('JWT secret is required to sign'),
  MONGO_HOST: joi.string().required().description('Mongo DB host url'),
  MONGO_PORT: joi.number().default(27017),
}).unknown().required()

const { error, value: envVars } = joi.validate(process.env, envVarsSchema)
if (error) { 
  throw new Error(chalk.red(`Config validation erro: ${error.message}`))
}

const config = {
  env: envVars.NODE_ENV,
  port: envVars.PORT,
  mongooseDebug: envVars.MONGOOSE_DEBUG,
  jwtSecret: envVars.JWT_SECRET,
  mongo: {
    host: envVars.MONGO_HOST,
    port: envVars.MONGO_PORT
  }
}
console.log(`dmh ${config}`)
module.exports = config
