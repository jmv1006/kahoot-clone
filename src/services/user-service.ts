import client from '../config/prisma';
import { v4 as uuidv4 } from 'uuid';
import { genSalt, hash } from 'bcryptjs';

interface INewUser {
  username: string;
  email: string;
  password: string;
}

interface CreatedUser extends INewUser {
  id: string;
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
    genSalt(10, (err, salt) => {
      hash(userInfo.password, salt, async (err, hash) => {
        const createdUser: CreatedUser = {
          id: uuidv4(),
          username: userInfo.username,
          email: userInfo.email,
          password: hash,
        };

        const newUser = await client.users.create({ data: createdUser });
        return newUser;
      });
    });
  }
}

export default UserService;
