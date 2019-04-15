import { MonitorType } from '../enums/monitor-type.enum';
import { IMonitorConfig } from '../interfaces/monitor-config.interface';
import { DatabaseMonitors } from './database-monitors';
import { IDatabaseConfig } from './interfaces/database-config.interface';

export class RedisMonitorConfig extends DatabaseMonitors {
  constructor(databaseConfigs: IDatabaseConfig[]) {
    super(databaseConfigs);
  }

  public getMonitorConfigs(): IMonitorConfig[] {
    return super.getMonitorConfigs([
      this.getKeySpaceHitConfig,
    ]);
  }

  private getKeySpaceHitConfig(databaseConfig: IDatabaseConfig): IMonitorConfig {
    return {
      type: MonitorType.Metric,
      // tslint:disable-next-line: max-line-length
      query: `avg(last_15m):( avg:redis.stats.keyspace_hits{${this.getIdentificationTags(databaseConfig)}} / ( avg:redis.stats.keyspace_hits{${this.getIdentificationTags(databaseConfig)}} + avg:redis.stats.keyspace_misses{${this.getIdentificationTags(databaseConfig)}} ) ) * 100 < 75`,
      name: `Redis ${databaseConfig.name} key space hit rate`,
      // tslint:disable-next-line: max-line-length
      message: `{{#is_alert}}##Alert{{/is_alert}} \n{{#is_warning}}##Warning{{/is_warning}} \n\nKey space hit rate for Redis service \`${databaseConfig.name}\` is {{comparator}} {{threshold}} .\n\n`,
      options: {
        include_tags: true,
        thresholds: {
          critical: 75,
          warning: 0,
        },
      },
      tags: [],
    };
  }
}
