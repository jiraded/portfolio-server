import express from 'express'
import createServer from './createServer'
import mongoose from 'mongoose'
import { config } from 'dotenv'
config()

const { DB_PASSWORD, PORT, DB_USER, DB_ENDPOINT, DB_NAME } = process.env

const startSever = async () => {
  await mongoose.connect(`mongodb+srv://${DB_USER}:${DB_PASSWORD}@${DB_ENDPOINT}/${DB_NAME}?retryWrites=true&w=majority`, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  console.log('database connected')

  const app = express()

  app.get('/', (_, res) => {
    console.log('triggered')
    return res.json({ name: 'john' })
  })

  const server = await createServer()

  server.applyMiddleware({ app })

  app.listen({ port: PORT || 5000 }, () => console.log(`Server is ready at http://localhost:${PORT || 5000}${server.graphqlPath}`))
}

startSever()
