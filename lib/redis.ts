import { Client } from 'redis-om';
import { createClient } from 'redis';
import { CarSpecification, carSpecificationSchema, techDataCategorySchema, categories } from './schema'

/* create a Client and bind it to the Node Redis connection */
const client = new Client();

let carRepository: any;
let techDataCategoryRepository: any;

async function connect() {
    if (!client.isOpen()) {
        console.log('Redis connection opening...')
        await client.open(process.env.REDIS_URL);
        console.log('Redis connection open')
        carRepository = client.fetchRepository(carSpecificationSchema)
        techDataCategoryRepository = client.fetchRepository(techDataCategorySchema)
        await createIndices();
    } else {
        console.log('Already opened Redis connection')
    }
}

export async function createCar(data: any) {
    await connect();
    if (carRepository === undefined) {
        return null;
    }

    let entityData: CarSpecification = data;
    console.log(entityData)
    const newCar = carRepository.createEntity();
    newCar.manufacturer = data.manufacturer;
    newCar.model = data.model;
    newCar.year = data.year;

    //const techDataCategory =  await techDataCategoryRepository.search().where('title').eq(data.techDataCategory).returnFirst();
    //const techDataCategory =  await techSpecificationRepository.search().where('title').eq(data.techDataCategory).returnFirst();

    const id = await carRepository.save(newCar);
    console.log('newCar saved: ' + id)
    return id;
}

export async function createIndices() {
    if (techDataCategoryRepository !== undefined) {
        await techDataCategoryRepository.createIndex()
    }
    if (carRepository !== undefined) {
        await carRepository.createIndex()
    }
}

export async function searchUser(q: any) {
    console.log('search')
    await connect();
    console.log('connected')
    if (carRepository === undefined) {
        return null;
    }


    console.log(q)
    const cars = await carRepository.search()
        .where('manufacturer').eq(q)
        .or('model').eq(q)
        .or('year').eq(q)
        .or('description').matches(q)
        .return.all();

    return cars;
}

export async function getCars() {
    console.log('get cars')
    await connect();
    console.log('connected')
    if (carRepository === undefined) {
        return null;
    }

    const cars: CarSpecification[] = await carRepository.search()
        .return.all();
    console.log('cars');
    console.log(cars);
    
    let carsWithCategory = cars.map(car => { let techdata = categories.map(async c => { return { [c]: await client.execute(['HGETALL', `carspec:${car.entityId}:category:${c}`]) }}); return { ...car, techdata }});
    console.log('carsWithCategory');
    console.log(carsWithCategory);

    return carsWithCategory;
}
//techdata: [ { id: { type: 'string'} , icon: { type: 'string' }, specifications: [ { name: { type: 'string' }, property: { type: 'string' } } ] } ]