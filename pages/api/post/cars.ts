import { createCar } from '../../../lib/redis';

export default async function handler(req: any, res: any) {
  const id = await createCar(req.body);
  res.status(200).json({ id })
}