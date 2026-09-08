import jwt from "jsonwebtoken";

const generateToken = (customer) => {
    return jwt.sign(
        { id: customer._id, email: customer.email },
        process.env.jwt_secret,
        { expiresIn: '30d' }
    );
};

export default generateToken;