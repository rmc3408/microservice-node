import { MongoMemoryServer } from 'mongodb-memory-server'
import mongoose from 'mongoose'
import jwt from 'jsonwebtoken';

declare global {
  var getSignIn: (email: string) => string[];
}

let mongo: any

beforeAll(async () => {
  process.env.JWTKEY = 'Secret@123'

  const mongo = await MongoMemoryServer.create()
  const mongoUri = mongo.getUri()

  await mongoose.connect(mongoUri, {})
});

beforeEach(async () => {
  const collections = await mongoose.connection.db.collections();

  for (let collection of collections) {
    await collection.deleteMany({});
  }
});

afterAll(async () => {
  if (mongo) {
    await mongo.stop();
  }
  await mongoose.connection.close();
});

global.getSignIn = (email: string) => {
  // Build a JWT payload.  { id, email }
  const payload = { id: '123456789', email }

  // Create the JWT and build session Object. { jwt: MY_JWT }
  const token = jwt.sign(payload, process.env.JWTKEY!)
  const session = { jwt: token }
  
  // Turn that session into JSON and encode it as base64
  const JsonSession = JSON.stringify(session)
  const base64 = Buffer.from(JsonSession).toString('base64')
  
  return [`session=${base64}`]
}