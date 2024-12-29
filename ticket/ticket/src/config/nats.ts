import nats, { Stan } from 'node-nats-streaming'

class NatsClientWrapper {
  private _client?: Stan
  private _clusterId: string = process.env.NATS_CLUSTER_ID!
  private _clientId: string = process.env.NATS_CLIENT_ID!
  private _options: { url: string } = { url: process.env.NATS_URL! }

  get client() {
    if (!this._client) {
      throw new Error('Cannot access NATS client before connecting')
    }
    return this._client
  }

  connect() {
    this._client = nats.connect(this._clusterId, this._clientId, this._options)

    return new Promise<void>((resolve, reject) => {
      this._client!.on('connect', () => {
        console.log('Connected to NATS')
        resolve()
      })

      this._client!.on('error', (err) => {
        console.error('Error to connect to NATS', err)
        reject()
      })
    })
  }

  close() {
    this._client!.on('close', () => {
      console.log('NATS connection closed')
      process.exit()
    })
    process.on('SIGINT', () => stan.close())
    process.on('SIGTERM', () => stan.close())
  }
}

export const stan = new NatsClientWrapper()
