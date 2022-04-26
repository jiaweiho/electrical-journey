import { Client } from 'redis-om'
import { createClient } from 'redis'

/* pulls the Redis URL from .env */
const url = process.env.REDIS_URL

/* create a connection to Redis with Node Redis */
const connection = createClient({ url })

const client = async () => {
  await connection.connect()
  /* create a Client and bind it to the Node Redis connection */
  const connectedClient = await new Client().use(connection)
  return connectedClient;
}

export { client, connection };
