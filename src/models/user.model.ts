import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database/sequelize.config';
import { UserRole } from '../utils/types/user-role.type';

export const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING(32),
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING(32),
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING(64),
  },
  phone: {
    type: DataTypes.STRING(16),
  },
  image: {
    type: DataTypes.STRING(128),
    defaultValue: 'default.png',
  },
  role: {
    type: DataTypes.ENUM(...Object.values(UserRole)),
    allowNull: false,
    defaultValue: UserRole.USER,
  },
  provider: {
    type: DataTypes.STRING(16),
    defaultValue: 'local',
  },
  providerId: {
    type: DataTypes.STRING(32),
  },
  twoFactorEnabled: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  secret: {
    type: DataTypes.STRING(32),
  },
});
