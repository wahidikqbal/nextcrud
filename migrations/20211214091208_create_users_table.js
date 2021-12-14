
exports.up = function(knex) {
    return knex.schema.createTable('users', function(table){
        table.increments();
        table.string('username').notNullable();
        table.string('email').notNullable();
        table.string('password').notNullable();
        table.timestamps(true, true);

    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('users');
};