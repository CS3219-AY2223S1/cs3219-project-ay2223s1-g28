import { Sequelize, DataTypes } from 'sequelize';

import { definePendingMatchModel } from './matching-model.js';

// Initialize Sequelize instance that uses SQLite
const sequelize = new Sequelize({
  dialect: 'sqlite',
  host: './prod.sqlite'
});

// Define models
const PendingMatchModel = definePendingMatchModel(sequelize, DataTypes);

// Create tables
// Setting the alter option to true checks current state of tables and performs necessary changes 
// to match the defined models
sequelize.sync({ alter: true }).then(() => console.log('Connected to Sequelize DB'));

export async function createPendingMatch(pendingMatch) { 
  return await PendingMatchModel.create(pendingMatch);
}

export async function getPendingMatchById(id) {
  return await PendingMatchModel.findOne({ where: { id }});
}

export async function getPendingMatchByDifficulty(difficulty) {
  return await PendingMatchModel.findOne({ where: { difficulty }});
}

export async function deletePendingMatchById(id) {
  return await PendingMatchModel.destroy({ where: { id }});
}
