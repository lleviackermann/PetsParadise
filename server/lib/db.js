import { createClient } from "redis";

const client = createClient({
  password: "SZcl3PhXT61b8X8Ptl7AfH3FpQ6J1DQh",
  socket: {
    host: "redis-12651.c212.ap-south-1-1.ec2.redns.redis-cloud.com",
    port: 12651,
  },
});
(async () => {
  await client.connect();
})();
client.on("connect", () => {
  console.log("Redis client connected");
});

client.on("error", (err) => {
  console.error("Redis connection error:", err);
});

//helper function for redis
async function getOrSetCache(key, ex, cb) {
  return new Promise(async (resolve, reject) => {
    client
      .get(key)
      .then(async (data) => {
        if (data != null) {
          console.log("Found in cache");
          // console.log(data);
          return resolve(JSON.parse(data));
        }
        cb()
          .then(async (freshData) => {
            // console.log(freshData);
            await client.setEx(key, ex, JSON.stringify(freshData));
            resolve(freshData);
          })
          .catch((err) => {
            reject(err);
          });
      })
      .catch((err) => {
        reject(err);
      });
  });
}

export { getOrSetCache, client };

// exports.getOrders = async (req, res, next) => {
//   const userId = req.userId;
//   getOrSetCache(`orders?userId=${userId}`, 30, async () => {
//     try {
//       const orders = await Order.find({ "user.userId": userId });
//       const updatedOrders = orders.map((order) => {
//         return {
//           user: order.user,
//           total: order.total,
//           orderPlaced: order.createdAt.toLocaleDateString(),
//           id: order._id.toString(),
//         };
//       });
//       return updatedOrders;
//     } catch (error) {
//       console.log(error);
//       throw new Error("some error occured");
//     }
//   })
//     .then((data) => {
//       res.status(201).json({
//         message: "Fetched Orders Successfully.",
//         orders: data,
//       });
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// };
