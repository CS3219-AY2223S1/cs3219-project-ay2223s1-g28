export function definePendingMatchModel(sequelize, DataTypes) {
  const PendingMatch = sequelize.define('PendingMatch', {
    id: {
      type: DataTypes.STRING,
      primaryKey: true
    },
    difficulty: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
  return PendingMatch;
};
