import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;

if (!process.env.MONGODB_URI) {
  throw new Error('Please add your Mongo URI to .env.local');
}

let mongoClient;
let dbConnection: Promise<MongoClient> | undefined;

if (!mongoClient) {
  mongoClient = new MongoClient(uri!);
  dbConnection = mongoClient.connect();

  // Create index for posts collection sorted by descending created_at
  const prepareIndex = async () => {
    const client: MongoClient = await dbConnection!;
    const db = client.db();
  
    await db.collection<Post>('posts').createIndex( { "post.created_at": 1 } )
  }
  prepareIndex()
}

export default dbConnection;
