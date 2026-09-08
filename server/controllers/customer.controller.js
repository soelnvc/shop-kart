import Customer from "../models/customer.model.js";
import bcrypt from "bcrypt";
import generateToken from "../utils/generateToken.js";

export const registerCustomer = async (req, res) => {
  try {
    console.log("BODY:", req.body);

    const { fullname, email, password, phone } = req.body;

    if (!fullname || !email || !password || !phone) {
      return res.status(400).json({
        message: "All fields Required",
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        message: "Password should be at least 6 characters",
      });
    }

    const customerExists = await Customer.findOne({ email });

    if (customerExists) {
      return res.status(409).json({
        message: "Customer Already Exists",
      });
    }

    const salt = await bcrypt.genSalt(10);

    const hashedPassword = await bcrypt.hash(password, salt);

    const newCustomer = await Customer.create({
      fullname,
      email,
      password: hashedPassword,
      phone,
    });

    const token = generateToken(newCustomer);

    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      maxAge: 30 * 24 * 60 * 60 * 1000,
    });

    res.status(201).json({
      success: true,
      message: "Customer Registered",
      customer: {
        id: newCustomer._id,
        fullname: newCustomer.fullname,
        email: newCustomer.email,
        phone: newCustomer.phone,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: "Server crashed",
      error: error.message,
    });
  }
};

export const loginCustomer = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "All fields Required",
      });
    }

    const customer = await Customer.findOne({ email });

    if (!customer) {
      return res.status(401).json({
        message: "Invalid Credentials",
      });
    }

    const isPasswordValid = await bcrypt.compare(password, customer.password);

    if (!isPasswordValid) {
      return res.status(401).json({
        message: "Invalid Credentials",
      });
    }

    const token = generateToken(customer);

    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      maxAge: 30 * 24 * 60 * 60 * 1000,
    });

    res.status(200).json({
      success: true,
      message: "Login successful",
      customer: {
        id: customer._id,
        fullname: customer.fullname,
        email: customer.email,
        phone: customer.phone,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: "Server crashed",
      error: error.message,
    });
  }
};

export const getMe = async (req, res) => {
    res.status(200).json({
        success: true,
        customer: req.customer
    })
}