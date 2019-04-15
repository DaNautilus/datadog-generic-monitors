import { IMonitorConfig } from '../../interfaces/monitor-config.interface';
import { IDatabaseConfig } from '../interfaces/database-config.interface';

export type TMonitorConfigFunction = (databaseConfig: IDatabaseConfig) => IMonitorConfig;
