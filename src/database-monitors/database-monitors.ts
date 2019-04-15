import { IMonitorConfig } from '../interfaces/monitor-config.interface';
import { IDatabaseConfig } from './interfaces/database-config.interface';

type TMonitorConfigFunction = (databaseConfig: IDatabaseConfig) => IMonitorConfig;

export abstract class DatabaseMonitors {
  constructor(private databaseConfigs: IDatabaseConfig[]) { }

  protected getIdentificationTags(databaseConfig: IDatabaseConfig): string {
    return databaseConfig.identificationTags.join(',');
  }

  protected getMonitorConfigs(monitorConfigFunctions: TMonitorConfigFunction[]): IMonitorConfig[] {
    let monitorConfigs = [];

    this.databaseConfigs.forEach(databaseConfig => {
      monitorConfigs = [
        ...monitorConfigs,
        ...monitorConfigFunctions.map(monitorConfigFunction => monitorConfigFunction.call(this, databaseConfig)),
      ];
    });

    return monitorConfigs;
  }
}
