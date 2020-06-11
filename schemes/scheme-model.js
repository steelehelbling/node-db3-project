const db = require('../data/dbConfig');

function find() {
  return db('schemes').select('*');
}

function findById(id) {
  return db('schemes')
    .where({ id: id })
    .select('*');
}

function findSteps(id) {
  return db('schemes as s')
    .join('steps as st', 'st.scheme_id', 's.id')
    .where('s.id', id)
    .orderBy('st.step_number', 'asc')
    .select(
      's.scheme_name as scheme_name',
      'st.step_number as step_number',
      'st.instructions as step_instruction'
    );
}

async function add(scheme) {
  const [id] = await db('schemes').insert(scheme);

  return db('schemes')
    .where({ id: id })
    .first()
    .select();
}

async function update(changes, id) {
  await db('schemes')
    .where({ id: id })
    .update(changes);

  return db('schemes')
    .where('id', id)
    .first()
    .select();
}

function remove(id) {
  return db('schemes')
    .where({ id: id })
    .del();
}

module.exports = {
    find,
    findById,
    findSteps,
    add,
    update,
    remove,
  }; 