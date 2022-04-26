import { Entity, Schema } from 'redis-om';

export class CarSpecification extends Entity {}
let carSpecificationSchema = new Schema(CarSpecification,
    {
        manufacturer: { type: 'string' },
        model: { type: 'string' },
        year: { type: 'string' },
        description: { type: 'text' },
        //techdata: [ { id: { type: 'string'} , icon: { type: 'string' }, specifications: [ { name: { type: 'string' }, property: { type: 'string' } } ] } ]
        //techcategories: { type: 'string[]' }
    },{ dataStructure: 'JSON' }
);

export class TechDataCategory extends Entity {}
let techDataCategorySchema = new Schema(TechDataCategory, {
    title: { type: 'string' },
    icon: { type: 'string' }
}, { dataStructure: 'JSON' });

let categories: string[] = [ 'performance', 'battery' ];

export { carSpecificationSchema, techDataCategorySchema, categories }