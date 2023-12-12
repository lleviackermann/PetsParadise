import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import Employee from "../models/Employee.js";
import Admin from "../models/Admin.js";
import Product from "../models/Product.js";
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

    console.log(newUser);
    let err = "";
    try {
      const savedUser = await newUser.save();
    } catch (error) {
      throw error;
    }
    // savedUser.password = "";
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
  console.log(person);

  if (!person) return res.status(400).json({ msg: "User does not exist. " });
  const matched = bcrypt.compareSync(password, person.password);
  if (!matched) return res.status(401).json({ msg: "Invalid Credentials" });

  const token = jwt.sign({ id: person._id }, process.env.JWT_SECRET);
  await person.populate('cart.productId');
  const cart = person.cart;
  person.password = "";
  person.cart = [];
  console.log(person, cart);
  return res.status(200).json({ token, person, cart });
};


// add to cart
export const addToCart = async (req, res) => {
  const { productId, quantity, email } = req.body;

  try {
    // Find the logged-in user
    const user = await User.findOne({ email: email});

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Find the product by ID
    const product = await Product.findById(productId);

    // If the product does not exist, return an error
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Check if the product is already in the user's cart
    const existingCartItem = user.cart.find(item => item.productId.equals(productId));

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
    await user.populate('cart.productId');

    const cart = user.cart;

    // Return the updated user object with the populated cart
    res.json({ cart });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
}