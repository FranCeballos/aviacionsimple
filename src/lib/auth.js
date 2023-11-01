import { hash, compare } from "bcryptjs";

export const hashPassword = async (password) => {
  try {
    const hashedPassword = await hash(password, 12);
    return hashedPassword;
  } catch (error) {
    return error;
  }
};

export const verifyPassword = async (password, hashedPassword) => {
  try {
    const isValid = await compare(password, hashedPassword);
    return isValid;
  } catch (error) {
    return error;
  }
};
