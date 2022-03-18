const {MongoClient} = require('mongodb');
const _database = 'genie-portal-nft';
const _collection = 'profiles';

const _getMongoClusterClient = async() => {
  const uri = `mongodb+srv://${PROCESS.ENV.MONGO_USER}:${PROCESS.ENV.MONGO_PASSWORD}@${PROCESS.ENV.MONGO_CLUSTER_NAME}/test?retryWrites=true&w=majority`;
  const client = new MongoClient(uri);

  return client;
}

const getData = async (condition, collection = _collection, database = _database) => {
  const client = _getMongoClusterClient();
  
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
