const {Model} = require('objection')

class Address extends Model {
   static get  tableName() {
      return 'addresses'
   }

   static get jsonSchema() {
      return {
         type: 'object',
         required: ['address'],

         properties: {
            address: { type: 'string', minLength: 1, maxLength: 255 },
         }
      }
   }

   static relationMappings() {
     const Shop = require('./shop')
     return {
      shop: {
        relation: Model.BelongsToOneRelation,
        modelClass: Shop,
        join: {
         from: 'addresses.shop_id',
         to: 'shops.id',
        }
      }
     }
   }

}

module.exports = Address; 