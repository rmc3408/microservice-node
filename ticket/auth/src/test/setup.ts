import request from 'supertest';
import { MongoMemoryServer } from 'mongodb-memory-server'
import mongoose from 'mongoose'
import app from '../config/server';

declare global {
  var savedCookie: (a: string, b: string) => Promise<string[]>
}

let mongo: any

beforeAll(async () => {
  process.env.JWTKEY = 'Secret123'

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

global.savedCookie = async (email: string, password: string) => {

  const response1 = await request(app)
    .post('/api/users/signup')
    .send({ email, password })
    .expect(201)
  
  const cookie = response1.get('Set-Cookie')
  return cookie
}