//import { Client, Entity, Schema, Repository } from 'redis-om';
import Redis from 'ioredis';
import UuId from 'node-uuid';

const client = new Redis({
    port: 18581,
    host: "redis-18581.c2.eu-west-1-3.ec2.cloud.redislabs.com",
    username: "default",
    password: "78S2u5ps5OCZ"
});

async function connect() {
    await client.connect();
}

function createUniqueUserId() {
    return 'User:' + UuId.v4();
}

export async function createUser(data: any) {
    await connect();
    
    data['level'] = parseInt(data['level']);
    
    const id = await client.set(createUniqueUserId(), data);
    console.log('newUser saved: ' + id)
    return id;
}

export async function searchUser(q: any) {
    console.log('search')
    await connect();
    console.log('connected')
  
    console.log(q)
    const users = await client.get()
        .where('username').eq(q)
        .or('language').eq(q)
        .or('description').matches(q)
        .or('level').eq(q)
        .return.all();
  
    return users;
  }