import jwt from "jsonwebtoken";
import Customer from "../models/customer.model.js";

export const isAuthenticated = async (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({
        message: "Not authorized, no token",
      });
    }

    const decoded = jwt.verify(token, process.env.jwt_secret);

    const customer = await Customer.findById(decoded.id);

    if (!customer) {
      return res.status(404).json({
        message: "Customer not found",
      });
    }

    req.customer = customer;

    next();
  } catch (error) {
    console.error(error);
    res.status(401).json({
      message: "INVALID",
    });
  }
};
