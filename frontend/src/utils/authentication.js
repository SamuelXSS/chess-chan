import jwt from 'jsonwebtoken';

const decodeToken = (token) => jwt.decode(token);

export { decodeToken };
