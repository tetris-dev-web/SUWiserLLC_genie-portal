const _database = 'genie-portal-nft';
const _collection = 'profiles';
const mongoose = require('mongoose');

const _getMongoClusterClientUri = () => {
  const uri = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_CLUSTER_NAME}.srdd2.mongodb.net/${_database}?retryWrites=true&w=majority`;

  return uri;
}

const getData = async (condition, collection = _collection, database = _database) => {
  const uri = _getMongoClusterClientUri();
  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
console.log(uri);
  mongoose.connect('mongodb+srv://data123:data123@cluster0.exouw.mongodb.net/island?retryWrites=true&w=majority')
      .then(() => console.log('MongoDB Database Connected'))
      .catch(err => console.log(err)) 
  return;
  try {
    await client.connect();
    const result = await client.db(database).collection(collection).findOne(condition);
    return result;
  } catch (e) {
      console.error(e);
  } finally {
    await client.close();
  }  
}

const setData = async (data, condition, collection = _collection, database = _database) => {
  const client = _getMongoClusterClient();
  let upsertResult = false;

  try {
    await client.connect();

    const result = await client.db(database).collection(collection).updateOne(condition, { $set: data }, { upsert: true });

    if (result.upsertedCount > 0) {
      upsertResult = true;
    }
  } catch (e) {
      console.error(e);
  } finally {
    await client.close();
    return upsertResult;
  }  
}

module.exports = {
  getData,
  setData,
};
