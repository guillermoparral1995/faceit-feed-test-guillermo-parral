import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;

if (!process.env.MONGODB_URI) {
  throw new Error('Please add your Mongo URI to .env.local');
}

const mongoClient = new MongoClient(uri!);
const dbConnection = mongoClient.connect();

const prepareIndex = async () => {
  const client = await dbConnection;
  const db = client.db();

  await db.collection<Post>('posts').createIndex( { "post.created_at": 1 } )
}
prepareIndex()

export default dbConnection;
