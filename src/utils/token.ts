import jwt from "jsonwebtoken";

export const generateToken = (payload: string | object | Buffer, secretKey: string, expiresIn: any) => {
    return jwt.sign(payload, secretKey, { expiresIn });
};

export const verifyToken = (token: string, secretKey: jwt.Secret) => {
    try {
        return jwt.verify(token, secretKey);
    } catch (error) {
        console.error("Error verifying token:", error);
        return null;
    }
};
