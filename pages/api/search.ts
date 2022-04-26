import { searchUser as searchCar } from '../../lib/redis';

export default async function handler(req: any, res: any) {
  const q = req.query.q;
  const cars = await searchCar(q);
  res.status(200).json({ cars: cars });
}