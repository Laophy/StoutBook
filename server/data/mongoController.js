import Mongo from 'mongodb'
import Dotenv from 'dotenv'

// Grab our env variables
Dotenv.config()
const DB_USER = process.env.DB_USER ?? 'unknown'
const DB_PASS = process.env.DB_PASS ?? 'unknown'

const uri = `mongodb+srv://${DB_USER}:${DB_PASS}@cluster0.r9mijox.mongodb.net/?retryWrites=true&w=majority`
const client = new Mongo.MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: Mongo.ServerApiVersion.v1 })

export default function queryDatabase (queryCallback, databaseName) {
  // Connect to the indicated db and pass the DB object to the callback
  queryCallback(client.db(databaseName))
    .catch((err) => {
      // Log errors
      console.error('Failed to connect')
      console.error(err)
    })
}
