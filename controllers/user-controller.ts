import { Request, Response } from 'express';
import { schemaBuilder } from '../config/joi-schemas/builder';
import UserService from '../services/user-service';
import newUserSchema from '../config/joi-schemas/user';
import client from '../config/prisma';
const userService = UserService.getInstance();

export const getSpecific = (req: Request, res: Response) => {
  const schema = schemaBuilder([{ name: 'user_id', required: true, min: 2, max: 255 }]);
  const { error } = schema.validate(req.body);

  if (error) return res.status(400).json({ message: 'Invalid input' });

  const user = userService.get(req.body.user_id);
  if (!user) return res.status(400).json({ message: 'User does not exist' });
  return res.status(200).json({ user: user });
};

export const create = async (req: Request, res: Response) => {
  const { error } = newUserSchema.validate(req.body);

  if (error)
    return res.status(400).json({
      message: 'Error creating new user. Ensure all requirements are met.',
    });

  const userExists = await client.users.findFirst({
    where: { email: req.body.email },
  });

  if (userExists) return res.status(400).json({ message: 'user with provided email already exists' });

  const newUser = userService.create({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
  });

  if (!newUser) return res.status(500).json({ message: 'Server Error. Could not create new user.' });

  return res.status(200).json({ user: newUser });
};
