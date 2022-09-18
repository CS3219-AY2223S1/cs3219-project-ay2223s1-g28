export function definePendingMatchModel(sequelize, DataTypes) {
  const PendingMatch = sequelize.define('PendingMatch', {
    id: {
      type: DataTypes.STRING,
      primaryKey: true
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    difficulty: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
  return PendingMatch;
};
