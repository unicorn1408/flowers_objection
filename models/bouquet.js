const {Model} = require('objection')

class Bouquet extends Model {
   static get  tableName() {
      return 'bouquets'
   }

   static get jsonSchema() {
      return {
         type: 'object',
         required: ['bouquet'],

         properties: {
            bouquet: { type: 'string', minLength: 1, maxLength: 255 },
         }
      }
   }

   static relationMappings() {
      const Shop = require('./shop');
      const Flower = require('./flower')
      return {
       shop: {
         relation: Model.HasManyRelation,
         modelClass: Shop,
         join: {
          from: 'shops.id',
          to: 'bouquets.shop_id',
         }
       },

       flowers: {
         relation: Model.ManyToManyRelation,
         modelClass: Flower,
         join: {
           from: 'bouquets.id',
           through: {
             from: 'bouquets_flowers.bouquetId',
             to: 'bouquets_flowers.flowerId'
           },
           to: 'flowers.id'
         }
       }
      }
    }
}

module.exports = Bouquet;