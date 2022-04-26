import { getCars } from '../../lib/redis'

export default async function handler(req: any, res: any) {
  console.log('getCars hello');
  
  const cars = await getCars();
  res.status(200).json({ cars: cars });
}