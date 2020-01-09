const db = require('../data/db-config.js');

function find() {
    return db('schemes').select()
}

function findById(id) {
    return db('schemes')
        .where({ id })
        .first()
}

function findSteps(scheme_id) {
    return db('schemes')
        .join('steps', 'schemes.id', 'steps.scheme_id')
        .where({ scheme_id })
        .orderBy('steps.step_number')
        .select('steps.id', 'schemes.scheme_name', 'steps.step_number', 'steps.instructions')

}

async function add(scheme_body) {
    const [ id ] = await db('schemes').insert(scheme_body)
    return db('schemes').where({ id }).first()

}

async function update(changes, id) {
   await db('schemes')
        .update(changes)
        .where({ id })
     return findById(id)
    
}

function remove(id) {
    return db('schemes').where({ id }).del()
}


module.exports = {
    find,
    findById,
    findSteps,
    add,
    update,
    remove
}