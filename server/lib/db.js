import { createClient } from "redis";

const client = createClient({
    password: 'uFbhY11x0qVyMJGpsQGERGtGW7quLhzP',
    socket: {
        host: 'redis-17198.c330.asia-south1-1.gce.redns.redis-cloud.com',
        port: 17198
    }
});
(async () => {
  await client.connect();
})();
client.on('connect', () => {
  console.log('Redis client connected');
});

client.on('error', (err) => {
  console.error('Redis connection error:', err);
});

async function getOrSetCache(key, ex, cb) {
  return new Promise(async (resolve, reject) => {
    client.get(key)
      .then(
        async (data) => {
          if (data != null) {
            return resolve(JSON.parse(data)); //convert to json
          }
          cb()
            .then(async (freshData) => {
              await client.setEx(key, ex, JSON.stringify(freshData)); //convert to string
              resolve(freshData);
            })
            .catch((err) => {
              reject(err);
            })
        }
      )
      .catch((err) => {
        reject(err);
      })
  })
};


export { client }