const {Model} = require('objection')

class Shop extends Model {
   static get  tableName() {
      return 'shops';
   }

   static get jsonSchema() {
      return {
         type: 'object',
         required: ['shop_name'],

         properties: {
            shop_name: { type: 'string', minLength: 1, maxLength: 255 },
         }
      }
   }

   static relationMappings() {
      const Address = require('./address');
      const Bouquet = require('./bouquet')
      return {
       addresses: {
         relation: Model.HasOneRelation,
         modelClass: Address,
         join: {
          from: 'shops.id',
          to: 'addresses.shop_id',
         }
       },

       bouquets: {
         relation: Model.HasManyRelation,
         modelClass: Bouquet,
         join: {
          from: 'shops.id',
          to: 'bouquets.shop_id',
         }
       }
      }
    }
}

module.exports = Shop;