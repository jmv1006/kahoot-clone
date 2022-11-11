import client from "../config/prisma";
import { v4 as uuidv4 } from "uuid";

interface INewUser {
  username: string;
  email: string;
  password: string;
}

class UserService {
  private static instance: UserService;

  public static getInstance(): UserService {
    if (!this.instance) {
      UserService.instance = new UserService();
    }
    return this.instance;
  }

  async get(id: string) {
    const user = await client.users.findUnique({ where: { id: id } });
    return user;
  }

  async create(userInfo: INewUser) {
    const id = uuidv4();

    return { id: id, username: userInfo.username, email: userInfo.email };
  }
}

export default UserService;
