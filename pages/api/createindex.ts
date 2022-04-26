import { createCarIndex } from '../../lib/redis';

export default async function handler(req: any, res: any) {
  await createCarIndex();
  res.status(200).send('ok');
}