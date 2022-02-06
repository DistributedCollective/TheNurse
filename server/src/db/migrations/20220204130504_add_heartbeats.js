const { onUpdateTrigger } = require('../../knexfile');
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function (knex) {
  try {

    await knex.schema.createTable('heartbeat_types', function (t) {
      t.uuid('heartbeat_type_id').primary().defaultTo(knex.raw('uuid_generate_v4()'));
      t.string('code').notNullable();
      t.string('name').notNullable();
      t.string('cronjob').notNullable().defaultTo('* * * * *'); //once every minute
      t.integer('silence_error_time').notNullable().defaultTo(60); //how much time has to pass to throw an error if no heartbeats of this type were received (in seconds, defaults).
      t.unique(['code']);
      t.timestamps(true, true);
    })
      .then(() => knex.raw(onUpdateTrigger('heartbeat_types')));

    await knex.schema.createTable('heartbeats', function (t) {
      t.uuid('heartbeat_id').primary().defaultTo(knex.raw('uuid_generate_v4()'));
      t.string('heatbeat_code').notNullable();
      t.string('ip').notNullable();
      t.json('payload');
      t.timestamps(true, true);

      t.index('heatbeat_code');
      t.index('created_at');
      t.foreign('heatbeat_code').references('code').inTable('heartbeat_types').onUpdate('CASCADE').onDelete('CASCADE');
    })
      .then(() => knex.raw(onUpdateTrigger('heartbeats')));
  } catch (e) {
    console.error('Error setting up migrations', e.message, e.stack, e);
    throw (e);
  }

};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function (knex) {

  await knex.schema.dropTable('hearrtbeats');
  await knex.schema.dropTable('heartbeat_types');

};
