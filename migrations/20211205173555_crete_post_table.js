
exports.up = function(knex) {
    return knex.schema.createTable('users', function(table){
        table.increments();
        table.string('username');
        table.unique('email');
        table.string('password');
        table.timestamps(true, true);

    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('users');
};
