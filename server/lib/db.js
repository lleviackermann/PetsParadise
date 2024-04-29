// import { createClient } from "redis";

// const client = createClient({
//   password: process.env.REDIS_PWD,
//   socket: {
//     host: process.env.REDIS_HOST,
//     port: process.env.REDIS_PORT,
//   },
// });

// // (async () => {
// //   await client.connect();
// // })();

// client.on("connect", () => {
//   console.log("Connected to Redis");
// });
// client.on("error", (err) => console.error("Redis connection error:", err));

// if (!client["connecting"]) {
//   client.connect((err) => {
//     if (err) {
//       console.error("Error connecting to Redis:", err);
//     } else {
//       console.log("Connected to Redis");
//     }
//   });
// }

// export { client };

import Redis from "ioredis";
const client = new Redis({
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
  password: process.env.REDIS_PWD,
});
// client.del("statistics", (err, response) => {
//   if (err) {
//     console.error("Error deleting key from Redis:", err);
//     // Handle error
//   } else {
//     console.log("Key deleted from Redis:", response);
//     // Handle success
//   }
// });
// client.del("userStatistics", (err, response) => {
//   if (err) {
//     console.error("Error removing userStatistics from Redis cache:", err);
//   } else {
//     console.log("Removed userStatistics from Redis cache");
//   }
// });

// const h = await client.hgetall(`userStatistics:65d5665a446e054454d2b591`);
// console.log(h);
export { client };
