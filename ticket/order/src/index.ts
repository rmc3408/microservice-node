import startDatabase from './config/mongo'
import './config/server'
import { stan } from './config/nats'
import { BadRequestError } from '@rmc3408/microservice-node-common'

// Enviroment Check from Kubernetes
if (!process.env.JWTKEY) throw new BadRequestError('JWTKEY must be defined!')

// Start Nats Streaming Server
if (!process.env.NATS_CLIENT_ID || !process.env.NATS_CLUSTER_ID || !process.env.NATS_URL) {
  console.log('NATS ENV must be defined!')
}
stan.connect()
stan.close()

// Start Servers
startDatabase()
