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
export const login = async (req, res) => {
  const { flag, userId, password } = req.body;

  let person;
  if (flag == "Admin") {
    person = await Admin.findOne({ adminId: userId });
  } else if (flag == "Employee") {
    person = await Employee.findOne({ employeeId: userId });
  } else if (flag == "User") {
    person = await User.findOne({ email: userId });
  }

  if (!person) return res.status(400).json({ msg: "User does not exist. " });
  const matched = bcrypt.compareSync(password, person.password);
  if (flag == "Admin") {
    return res.status(200).json({ person });
  }
  if (flag === "Employee") {
    return res.status(200).json({ person });
  }
  if (!matched) return res.status(401).json({ msg: "Invalid Credentials" });

  const token = jwt.sign({ id: person._id }, process.env.JWT_SECRET);
  if (flag === "User") await person.populate("cart.productId");
  const cart = person.cart;
  person.password = "";
  person.cart = [];
  return res.status(200).json({ token, person, cart });
};

// add to cart
export const addToCart = async (req, res) => {
  const { productId, quantity } = req.body;
  try {
    const token = jwt.decode(req.headers.authorization.split(" ")[1]);

    // Find the logged-in user
    const user = await User.findById(token.id);
    // console.log(user);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Find the product by ID
    // console.log(productId);
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

    await user.populate("cart.productId");
    const cart = user.cart;
    let totalPrice = 0;
    const randomEmployee = await Employee.aggregate([{ $sample: { size: 1 } }]);
    console.log(randomEmployee[0].orders);
    for (const item of cart) {
      const order = new Order({
        prodId: item.productId._id,
        userId: user._id,
        status: "Pending",
        amount: item.productId.price,
        quantity: item.quantity,
      });
      totalPrice += item.productId.price * item.quantity;
      const savedOrder = await order.save();
      user.orders.push(savedOrder._id);
      randomEmployee[0].orders.push(savedOrder._id);
    }
    console.log("ordering items");

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
    console.log(randomEmployee);
    res.json({ updatedCart });
  } catch (error) {}
};

export const getOrderedItems = async (req, res) => {
  const token = jwt.decode(req.headers.authorization.split(" ")[1]);
  let orders = [];
  orders = await Order.find({ userId: token.id });
  console.log("ORDERS:", orders[0].prodId);
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
  console.log(product);
  res.status(201).send(product);
};

export const getStatistics = async (req, res) => {
  const token = jwt.decode(req.headers.authorization.split(" ")[1]);
  const user = await User.findById(token.id);
  let orders = await Order.find({ userId: token.id });
  let appointments = await Appointment.find({ userId: token.id });
  let products = [];
  for (const order of orders) {
    let prod = await Product.findById(order.prodId);
    products.push(prod);
  }
  const countOrdersByStatus = orders.reduce(
    (acc, order) => {
      if (order.status === "Pending") {
        acc.pending++;
      } else if (order.status === "Delivered") {
        acc.delivered++;
      }
      return acc;
    },
    { pending: 0, delivered: 0 }
  );
  const countAppointmentsByStatus = appointments.reduce(
    (acc, order) => {
      if (order.status === "Scheduled") {
        acc.scheduled++;
      } else if (order.status === "Pending") {
        acc.pending++;
      } else if (order.status === "Cancelled") {
        acc.cancelled++;
      }
      return acc;
    },
    { scheduled: 0, cancelled: 0, pending: 0 }
  );
  const countorderTypeByStatus = products.reduce(
    (acc, order) => {
      if (order.productType === "pet") {
        acc.pet++;
      } else if (order.productType === "food") {
        acc.food++;
      } else if (order.productType === "Accessory") {
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
  res.status(201).send({
    orderStatistics,
    appointmentStatistics,
    orderTypeStatistics,
  });
};

export const submitReview = async (req, res) => {
  const token = jwt.decode(req.headers.authorization.split(" ")[1]);
  const user = await User.findById(token.id, { firstName: 1, lastName: 1 });
  const Name = user.firstName + " " + user.lastName;
  console.log(user);
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

export const getAllAppointments = async (req, res) => {
  const appointments = await Appointment.find();
  for (let i = 0; i < appointments.length; i++) {
    const user = await User.findById(appointments[i].userId);
    if (user) {
      const userName = `${user.firstName} ${user.lastName}`;
      console.log(userName);
      appointments[i] = appointments[i].toObject();
      appointments[i]["userName"] = userName;
      console.log(appointments[i]);
    } else {
      console.log("User not found for appointment:", appointments[i]._id);
    }
  }
  console.log(appointments);
  res.status(201).send(appointments);
};

export const getAllOrders = async (req, res) => {
  const orders = await Order.find();
  for (let i = 0; i < orders.length; i++) {
    const user = await User.findById(orders[i].userId);
    const product = await Product.findById(orders[i].prodId);
    if (user) {
      const userName = `${user.firstName} ${user.lastName}`;
      orders[i] = orders[i].toObject();
      orders[i]["userName"] = userName;
      orders[i]["productName"] = product.name;
      orders[i]["productType"] = product.productType;
    } else {
      orders[i] = orders[i].toObject();
      orders[i]["userName"] = "Hem donga lanja";
      orders[i]["productName"] = "Random";
      orders[i]["productType"] = "pets";
    }
  }

  res.status(201).send(orders);
};
