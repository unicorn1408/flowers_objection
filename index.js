const knex = require('knex');
const knexfile = require('./knexfile')
const {Model} = require('objection')
const Shop = require('./models/shop')
const Address = require('./models/address')
const Bouquet = require('./models/bouquet')
const Flower = require('./models/flower')

const db = knex(knexfile.development);
Model.knex(db);

const getShopById = async (id) => {
   const shop = await Shop.query().findById(id)
   console.log(shop)
}

const createShop = async (shop_name) => {
   const newShop = await Shop.query().insert({
      shop_name
   })

   console.log(newShop)
}

const getAllShops = async () => {
   const allShops = await Shop.query()
   console.log(allShops)
}

const addAddress = async (shop_name, address) => {
   const shop = await Shop.query()
      .select('shops.*')
      .where('shop_name', shop_name)

   const newAddress = await shop[0].$relatedQuery('addresses').insert({  address });

   console.log(newAddress)   
}

const addBouquet = async (shop_name, bouquet) => {
   const shop = await Shop.query()
      .select('shops.*')
      .where('shop_name', shop_name)

   const newBouquet = await shop[0].$relatedQuery('bouquets').insert({  bouquet });

   console.log(newBouquet)   
}

const addFlower = async (flower) => {
   const newFlower = await Flower.query().insert({
      flower
   })

   console.log(newFlower)
}

const addFlowerToBouquet = async (flower, bouquet) => {
   const existingFlower = await Flower.query()
     .select('flowers.*')
     .where('flower', flower)

   const existingBouquet = await Bouquet.query()
   .select('bouquets.*')
   .where('bouquet', bouquet)

   const result = await Flower.relatedQuery('bouquets')
      .for(existingFlower[0].id)
      .relate(existingBouquet[0].id)
   console.log(result)
}


// createShop('shop1')
// getAllShops()
// addAddress('shop1', 'address1')

// addBouquet('shop1', 'bouquet1')
// addFlower('flower1')

// addFlowerToBouquet('flower1', 'bouquet1')