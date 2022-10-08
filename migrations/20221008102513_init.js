/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
 exports.up = function(knex) {
   return knex.schema.createTable('shops', (table) => {
    table.increments();
    table.string('shop_name').notNullable().unique()
   }).createTable('addresses', (table) => {
    table.increments();
    table.string('address').notNullable()
    table.integer('shop_id').references('id').inTable('shops').notNullable()
   }).createTable('bouquets', (table) => {
    table.increments();
    table.string('bouquet').notNullable()
    table.integer('shop_id').references('id').inTable('shops').notNullable()
   }).createTable('flowers', (table) => {
    table.increments();
    table.string('flower').notNullable()
   }).createTable('bouquets_flowers', (table) => {
    table.integer('flowerId').notNullable()
    table.integer('bouquetId').notNullable()
   })
 };
 
 /**
  * @param { import("knex").Knex } knex
  * @returns { Promise<void> }
  */
 exports.down = function(knex) {
   return knex.schema.dropTableIfExists('bouquets').dropTableIfExists('addresses').dropTableIfExists('shops')
 };
