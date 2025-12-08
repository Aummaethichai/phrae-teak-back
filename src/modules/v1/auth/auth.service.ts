import { prisma } from "../../../config/prisma";
import {
  UserPlain,
  UserPlainInputCreate,
} from "../../../generated/prismabox/User";
export const AuthService = {
  async createUser(data: typeof UserPlainInputCreate.static) {
    const hashedPassword = await Bun.password.hash(data.password);

    // 2. Create user with the hashed password
    const user = await prisma.user.create({
      data: {
        ...data,
        password: hashedPassword, // Use the hashed password
      },
    });

    // 3. Return the created user object
    return user;
  },

  async CheckUser(email: string) {
    return await prisma.user.findUnique({
      where: { email },
    });
  },

  /**
   * Verifies user credentials for local login.
   * @returns The user object if credentials are valid, otherwise null.
   */
  async verifyUser(email: string, password_plain: string) {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user || !user.password) return null;

    const isPasswordValid = await Bun.password.verify(password_plain, user.password);

    return isPasswordValid ? user : null;
  },
};
