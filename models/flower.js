const {Model} = require('objection')

class Flower extends Model {
   static get  tableName() {
      return 'flowers'
   }

   static get jsonSchema() {
      return {
         type: 'object',
         required: ['flower'],

         properties: {
            flower: { type: 'string', minLength: 1, maxLength: 255 },
         }
      }
   }

   static relationMappings() {
      const Bouquet = require('./bouquet');
      return {
       bouquets: {
         relation: Model.ManyToManyRelation,
         modelClass: Bouquet,
         join: {
           from: 'flowers.id',
           through: {
             from: 'bouquets_flowers.flowerId',
             to: 'bouquets_flowers.bouquetId'
           },
           to: 'bouquets.id'
         }
       }
      }
    }
}

module.exports = Flower;