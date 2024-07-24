import startDatabase from './config/mongo'
import './config/server'
import { BadRequestError } from '@rmc3408/microservice-node-common'

// Enviroment Check from Kubernetes
if (!process.env.JWTKEY) throw new BadRequestError('JWTKEY must be defined!')

// Start Servers
startDatabase()
