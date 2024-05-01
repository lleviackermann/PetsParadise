import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import Employee from "../models/Employee.js";
import Admin from "../models/Admin.js";
import Product from "../models/Product.js";
import Order from "../models/Order.js";
import Count from "../models/Count.js";
import Appointment from "../models/Appointment.js";
import Review from "../models/Review.js";
import { getOrSetCache } from "../lib/db.js";


// User Register
export const registerUser = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    const newUser = new User({
      firstName,
      lastName,
      email,
      password: passwordHash,
    });

    let err = "";
    try {
      const savedUser = await newUser.save();
    } catch (error) {
      throw error;
    }
    // savedUser.password = "";
    const count = await Count.findOne({ countId: "100" });
    const customers = count.countCustomers + 1;
    await Count.findOneAndUpdate(
      { countId: "100" },
      { countCustomers: customers }
    );

    return res.status(201).json("Success");
  } catch (error) {
    return res.status(500).json({
      error: error.message.includes("duplicate key")
        ? "Duplicate"
        : error.message,
    });
  }
};

// Register Employee
export const registerEmployee = async (req, res) => {
  try {
    const { name, employeeId, email, password, role } = req.body;
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    const newEmployee = new Employee({
      name,
      employeeId,
      email,
      password: passwordHash,
      role,
    });

    const savedEmployee = await newEmployee.save();
    savedEmployee.password = "";
    const count = await Count.findOne({ countId: "100" });
    const employees = count.countEmployees + 1;
    await Count.findOneAndUpdate(
      { countId: "100" },
      { countEmployees: employees }
    );
    return res.status(201).json(savedEmployee);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// Admin SignUp
export const registerAdmin = async (req, res) => {
  try {
    const { firstName, lastName, adminId, email, password } = req.body;

    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    const newAdmin = new Admin({
      firstName,
      lastName,
      adminId,
      email,
      password: passwordHash,
    });

    const savedAdmin = await newAdmin.save();
    savedAdmin.password = "";
    // const count = await Count.findOne({ countId: "100" });
    // const customers = count.countCustomers + 1;
    // await Count.findOneAndUpdate(
    //   { countId: "100" },
    //   { countCustomers: customers }
    // );

    return res.status(201).json(savedAdmin);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// Login
export const login = async (req, res, next) => {
  try {
    const { flag, userId, password } = req.body;
  
    let person;
    if (flag == "Admin") {
      person = await Admin.findOne({ adminId: userId });
    } else if (flag == "Employee" || flag == "Manager") {
      person = await Employee.findOne({ employeeId: userId });
    } else if (flag == "User") {
      person = await User.findOne({ email: userId });
    }
    console.log(flag, userId, password);
    if (!person) return res.status(400).json({ msg: "User does not exist. " });
    const matched = bcrypt.compareSync(password, person.password);

    if (!matched) return res.status(401).json({ msg: "Invalid Credentials" });
  
    const token = jwt.sign({ id: person._id }, process.env.JWT_SECRET);
    if (flag === "User") await person.populate("cart.productId");
    const cart = person.cart;
    person.password = "";
    person.cart = [];
    return res.status(200).json({ token, person, cart });
  } catch(err) {
    next(err);
  }
};

// add to cart
export const addToCart = async (req, res) => {
  const { productId, quantity } = req.body;
  try {
    const token = jwt.decode(req.headers.authorization.split(" ")[1]);

    // Find the logged-in user
    const user = await User.findById(token.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Find the product by ID
    const product = await Product.findById(productId);

    // If the product does not exist, return an error
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Check if the product is already in the user's cart
    const existingCartItem = user.cart.find((item) =>
      item.productId.equals(productId)
    );

    if (existingCartItem) {
      // If the product is already in the cart, update the quantity
      existingCartItem.quantity += quantity || 1;
    } else {
      // If the product is not in the cart, add a new item
      user.cart.push({
        productId,
        quantity: quantity || 1,
      });
    }

    // Save the updated user object
    await user.save();

    // Populate the cart field before sending the response
    await user.populate("cart.productId");

    const cart = user.cart;

    // Return the updated user object with the populated cart
    res.json({ cart });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const removeFromCart = async (req, res) => {
  const { productId } = req.body;
  try {
    const token = jwt.decode(req.headers.authorization.split(" ")[1]);
    const user = await User.findById(token.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    const existingCartItem = user.cart.find((item) =>
      item.productId.equals(productId)
    );

    if (existingCartItem) {
      if (existingCartItem.quantity === 1) {
        user.cart = user.cart.filter(
          (item) => !item.productId.equals(productId)
        );
      } else {
        existingCartItem.quantity -= 1;
      }
    } else {
      return res.status(404).json({ message: "product not found in userCart" });
    }

    // Save the updated user object
    await user.save();

    // Populate the cart field before sending the response
    await user.populate("cart.productId");

    const cart = user.cart;
    // console.log(cart);

    // Return the updated user object with the populated cart
    res.json({ cart });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const orderItems = async (req, res) => {
  try {
    const token = jwt.decode(req.headers.authorization.split(" ")[1]);
    const user = await User.findById(token.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const employees = await Employee.find({ role: "orders" });
    await user.populate("cart.productId");
    const cart = user.cart;
    let totalPrice = 0;
    for (const item of cart) {
      const randomIndex = Math.floor(Math.random() * employees.length);
      console.log(employees.length);
      const randomEmployee = employees[randomIndex];
      console.log(randomIndex);
      const order = new Order({
        prodId: item.productId._id,
        userId: user._id,
        status: "Pending",
        assigned: randomEmployee._id,
        amount: item.productId.price,
        quantity: item.quantity,
      });
      totalPrice += item.productId.price * item.quantity;
      const savedOrder = await order.save();
      user.orders.push(savedOrder._id);

      randomEmployee.orders.push(savedOrder._id);
      await randomEmployee.save();
    }

    const count = await Count.findOne({ countId: "100" });
    const orders = count.countOrders + user.cart.length;
    const sales = count.countSales + totalPrice;
    await Count.findOneAndUpdate(
      { countId: "100" },
      { countOrders: orders, countSales: sales }
    );

    user.cart = [];
    await user.save();
    await user.populate("orders");
    const updatedCart = user.cart;
    res.json({ updatedCart });
  } catch (error) { }
};

export const getOrderedItems = async (req, res) => {
  const token = jwt.decode(req.headers.authorization.split(" ")[1]);
  let orders = [];
  // const explain = await Order.find({ userId: token.id }).explain();

  // console.log(explain.executionStats);
  orders = await Order.find({ userId: token.id });
  let products = [];
  for (const order of orders) {
    let prod = await Product.findById(order.prodId);
    products.push(prod);
  }

  return res.status(201).send({ orders, products });
};

export const getProductDetails = async (req, res) => {
  // const token = jwt.decode(req.headers.authorization.split(" ")[1]);
  const prodId = req.params.productId;
  let product = await Product.findById(prodId);
  res.status(201).send(product);
};

export const getStatistics = async (req, res) => {
  let token = null;
  if (req.headers.authorization) {
    token = jwt.decode(req.headers.authorization.split(" ")[1]);
  }
  let query = {};
  let cache;
  if (token != null) {
    query = { userId: token.id };
    cache = token.id;
  }
  if (token == null) {
    cache = "";
  }
  // console.log(query);
  console.log(cache);
  console.log("Before retrieving data from Redis");
  getOrSetCache(`Statistics:${cache}`, 30, async () => {
    try {
      let orders, appointments, products;
      try {
        orders = await Order.find(query);
        appointments = await Appointment.find(query);
        products = [];
        for (const order of orders) {
          let prod = await Product.findById(order.prodId);
          products.push(prod);
        }
      } catch (error) {
        console.error("Error fetching data from MongoDB:", error);
        return res.status(500).send({ error: "Internal Server Error" });
      }

      // console.log(orders);

      const countOrdersByStatus = orders.reduce(
        (acc, order) => {
          if (order && order.status === "Pending") {
            acc.pending++;
          } else if (order && order.status === "Delivered") {
            acc.delivered++;
          }
          return acc;
        },
        { pending: 0, delivered: 0 }
      );
      const countAppointmentsByStatus = appointments.reduce(
        (acc, order) => {
          if (order && order.status === "Scheduled") {
            acc.scheduled++;
          } else if (order && order.status === "Pending") {
            acc.pending++;
          } else if (order && order.status === "Cancelled") {
            acc.cancelled++;
          }
          return acc;
        },
        { scheduled: 0, cancelled: 0, pending: 0 }
      );
      const countorderTypeByStatus = products.reduce(
        (acc, order) => {
          if (order && order.productType === "pet") {
            acc.pet++;
          } else if (order && order.productType === "food") {
            acc.food++;
          } else if (order && order.productType === "Accessory") {
            acc.accessory++;
          }
          return acc;
        },
        { pet: 0, food: 0, accessory: 0 }
      );

      const orderStatistics = [
        {
          data: [
            {
              id: 0,
              value: countOrdersByStatus.delivered,
              label: "delivered",
              color: "#ffe4c1",
            },
            {
              id: 1,
              value: countOrdersByStatus.pending,
              label: "pending",
              color: "#c1d1ff",
            },
          ],
        },
      ];

      const appointmentStatistics = [
        {
          data: [
            {
              id: 0,
              value: countAppointmentsByStatus.scheduled,
              label: "Scheduled",
              color: "#ffe4c1",
            },
            {
              id: 1,
              value: countAppointmentsByStatus.cancelled,
              label: "Cancelled",
              color: "#c1d1ff",
            },
            {
              id: 2,
              value: countAppointmentsByStatus.pending,
              label: "Pending",
              color: "#c1ffc1",
            },
          ],
        },
      ];
      const orderTypeStatistics = [
        {
          data: [
            {
              id: 0,
              value: countorderTypeByStatus.pet,
              label: "pets",
              color: "#ffe4c1",
            },
            {
              id: 1,
              value: countorderTypeByStatus.food,
              label: "food",
              color: "#c1d1ff",
            },
            {
              id: 2,
              value: countorderTypeByStatus.accessory,
              label: "accessories",
              color: "#c1ffc1",
            },
          ],
        },
      ];
      // let stringifiedOrders = JSON.stringify(orderStatistics);
      // let stringifiedAppointments = JSON.stringify(appointmentStatistics);
      // let stringifiedOrderType = JSON.stringify(orderTypeStatistics);
      let statistics = {
        orderStatistics,
        appointmentStatistics,
        orderTypeStatistics,
      };
      return statistics;
    } catch (err) {
      console.log(err);
    }
  }).then((data) => {
    res.status(201).send(data);
  });

  // client.hgetall(`Statistics:${cache}`, async (err, cachedData) => {
  //   if (err) {
  //     console.error("Redis error:", err);
  //     return res.status(500).send({ error: "Internal Server Error" });
  //   }
  //   let statistics;

  //   if (cachedData && Object.keys(cachedData).length !== 0) {
  //     console.log(`Retrieved statistics for user ${cache} from Redis cache`);
  //     const parsedData = {};
  //     for (const key in cachedData) {
  //       parsedData[key] = JSON.parse(cachedData[key]);
  //     }

  //     statistics = parsedData;
  //     return res.status(300).send(statistics);
  //   }

  //   // // else {
  //   console.log(
  //     `Statistics for user ${2} not found in Redis cache, calculating...`
  //   );

  //   let orders, appointments, products;
  //   try {
  //     orders = await Order.find(query);
  //     appointments = await Appointment.find(query);
  //     products = [];
  //     for (const order of orders) {
  //       let prod = await Product.findById(order.prodId);
  //       products.push(prod);
  //     }
  //   } catch (error) {
  //     console.error("Error fetching data from MongoDB:", error);
  //     return res.status(500).send({ error: "Internal Server Error" });
  //   }

  //   console.log(orders);

  //   const countOrdersByStatus = orders.reduce(
  //     (acc, order) => {
  //       if (order && order.status === "Pending") {
  //         acc.pending++;
  //       } else if (order && order.status === "Delivered") {
  //         acc.delivered++;
  //       }
  //       return acc;
  //     },
  //     { pending: 0, delivered: 0 }
  //   );
  //   const countAppointmentsByStatus = appointments.reduce(
  //     (acc, order) => {
  //       if (order && order.status === "Scheduled") {
  //         acc.scheduled++;
  //       } else if (order && order.status === "Pending") {
  //         acc.pending++;
  //       } else if (order && order.status === "Cancelled") {
  //         acc.cancelled++;
  //       }
  //       return acc;
  //     },
  //     { scheduled: 0, cancelled: 0, pending: 0 }
  //   );
  //   const countorderTypeByStatus = products.reduce(
  //     (acc, order) => {
  //       if (order && order.productType === "pet") {
  //         acc.pet++;
  //       } else if (order && order.productType === "food") {
  //         acc.food++;
  //       } else if (order && order.productType === "Accessory") {
  //         acc.accessory++;
  //       }
  //       return acc;
  //     },
  //     { pet: 0, food: 0, accessory: 0 }
  //   );

  //   const orderStatistics = [
  //     {
  //       data: [
  //         {
  //           id: 0,
  //           value: countOrdersByStatus.delivered,
  //           label: "delivered",
  //           color: "#ffe4c1",
  //         },
  //         {
  //           id: 1,
  //           value: countOrdersByStatus.pending,
  //           label: "pending",
  //           color: "#c1d1ff",
  //         },
  //       ],
  //     },
  //   ];

  //   const appointmentStatistics = [
  //     {
  //       data: [
  //         {
  //           id: 0,
  //           value: countAppointmentsByStatus.scheduled,
  //           label: "Scheduled",
  //           color: "#ffe4c1",
  //         },
  //         {
  //           id: 1,
  //           value: countAppointmentsByStatus.cancelled,
  //           label: "Cancelled",
  //           color: "#c1d1ff",
  //         },
  //         {
  //           id: 2,
  //           value: countAppointmentsByStatus.pending,
  //           label: "Pending",
  //           color: "#c1ffc1",
  //         },
  //       ],
  //     },
  //   ];
  //   const orderTypeStatistics = [
  //     {
  //       data: [
  //         {
  //           id: 0,
  //           value: countorderTypeByStatus.pet,
  //           label: "pets",
  //           color: "#ffe4c1",
  //         },
  //         {
  //           id: 1,
  //           value: countorderTypeByStatus.food,
  //           label: "food",
  //           color: "#c1d1ff",
  //         },
  //         {
  //           id: 2,
  //           value: countorderTypeByStatus.accessory,
  //           label: "accessories",
  //           color: "#c1ffc1",
  //         },
  //       ],
  //     },
  //   ];
  //   statistics = {
  //     orderStatistics,
  //     appointmentStatistics,
  //     orderTypeStatistics,
  //   };

  //   console.log(statistics);

  //   client.hmset(
  //     `Statistics:${cache}`,
  //     "orderStatistics",
  //     JSON.stringify(orderStatistics),
  //     "appointmentStatistics",
  //     JSON.stringify(appointmentStatistics),
  //     "orderTypeStatistics",
  //     JSON.stringify(orderTypeStatistics),
  //     (err, response) => {
  //       if (err) {
  //         console.error("Error storing data in Redis cache:", err);
  //       } else {
  //         console.log(`Stored statistics for user ${cache} in Redis cache`);
  //         // Set expiration time for the cache
  //         client.expire(`Statistics:${cache}`, 60, (err, reply) => {
  //           if (err) {
  //             console.error("Error setting expiration time for cache:", err);
  //           } else {
  //             console.log(`Expiration time set for cache: ${60} seconds`);
  //           }
  //         });
  //       }
  //     }
  //   );
  //   res.status(201).send({
  //     orderStatistics,
  //     appointmentStatistics,
  //     orderTypeStatistics,
  //   });
  // });
};

export const submitReview = async (req, res) => {
  const token = jwt.decode(req.headers.authorization.split(" ")[1]);
  const user = await User.findById(token.id, { firstName: 1, lastName: 1 });
  const Name = user.firstName + " " + user.lastName;
  const newReview = await Review({
    Name,
    review: req.body.review,
    prodId: req.body.prodId,
  });
  const savedReview = await newReview.save();
  const product = await Product.findById(req.body.prodId);
  product.reviews.push(savedReview);
  await product.save();
  const status = [];
  res.status(201).send({ status });
};

// export const getAllAppointments = async (req, res) => {
//   const appointments = await Appointment.find();
//   for (let i = 0; i < appointments.length; i++) {
//     const user = await User.findById(appointments[i].userId);
//     if (user) {
//       const userName = `${user.firstName} ${user.lastName}`;
//       appointments[i] = appointments[i].toObject();
//       appointments[i]["userName"] = userName;
//     } else {
//       // await Appointment.findByIdAndDelete(appointments[i]._id);
//       console.log("User not found for appointment:", appointments[i]._id);
//     }
//   }
//   res.status(201).send(appointments);
// };

export const getAllAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.aggregate([
      {
        $lookup: {
          from: "users",
          localField: "userId",
          foreignField: "_id",
          as: "user",
        },
      },
      {
        $addFields: {
          user: { $arrayElemAt: ["$user", 0] },
        },
      },
      {
        $addFields: {
          userName: { $concat: ["$user.firstName", " ", "$user.lastName"] },
        },
      },
      {
        $project: {
          user: 0,
        },
      },
    ]);

    res.status(200).send(appointments);
  } catch (error) {
    res.status(500).send({ message: "Internal server error" });
  }
};

// export const getAllOrders = async (req, res) => {
//   const orders = await Order.find();
//   for (let i = 0; i < orders.length; i++) {
//     const user = await User.findById(orders[i].userId);
//     const product = await Product.findById(orders[i].prodId);
//     if (user && product) {
//       const userName = `${user.firstName} ${user.lastName}`;
//       orders[i] = orders[i].toObject();
//       orders[i]["userName"] = userName;
//       orders[i]["productName"] = product.name;
//       orders[i]["productType"] = product.productType;
//     } else {
//       await Order.findOneAndDelete(orders[i]._id)
//     }
//   }

//   res.status(201).send(orders);
// };

export const getAllOrders = async (req, res, next) => {
  try {
    const orders = await Order.aggregate([
      {
        $lookup: {
          from: "users",
          localField: "userId",
          foreignField: "_id",
          as: "user",
        },
      },
      {
        $lookup: {
          from: "products",
          localField: "prodId",
          foreignField: "_id",
          as: "product",
        },
      },
      {
        $addFields: {
          user: { $arrayElemAt: ["$user", 0] },
          product: { $arrayElemAt: ["$product", 0] },
        },
      },
      {
        $addFields: {
          userName: { $concat: ["$user.firstName", " ", "$user.lastName"] },
          productName: "$product.name",
          productType: "$product.productType",
        },
      },
      {
        $project: {
          user: 0,
          product: 0,
        },
      },
    ]);
    return res.status(200).send(orders);
  } catch (error) {
    next(err);
  }
};
