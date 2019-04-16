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
      this.getBlockedConnectionsConfig,
      this.getMasterLinkDownConfig,
      this.getFragmentationRatioConfig,
      this.getConnectedSlavesConfig,
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
          warning: 89,
        },
      },
      tags: [],
    };
  }

  private getBlockedConnectionsConfig(databaseConfig: IDatabaseConfig): IMonitorConfig {
    return {
      type: MonitorType.Metric,
      query: `avg(last_15m):sum:redis.clients.blocked{${this.getIdentificationTags(databaseConfig)}} > 1`,
      name: `Redis ${databaseConfig.name} blocked connections`,
      message: `{{#is_alert}}##Alert{{/is_alert}}\n\nRedis service \`${databaseConfig.name}\` has {{comparator}} {{threshold}} blocked connections.`,
      options: {
        include_tags: true,
        thresholds: {
          critical: 1,
        },
      },
      tags: [],
    };
  }

  private getMasterLinkDownConfig(databaseConfig: IDatabaseConfig): IMonitorConfig {
    return {
      type: MonitorType.Metric,
      query: `avg(last_5m):sum:redis.replication.master_link_down_since_seconds{${this.getIdentificationTags(databaseConfig)}} > 60`,
      name: `Redis ${databaseConfig.name} master link`,
      // tslint:disable-next-line: max-line-length
      message: `{{#is_alert}}##Alert{{/is_alert}}\n\nRedis service ${databaseConfig.name} master link is since {{comparator}} {{threshold}} seconds down.`,
      options: {
        include_tags: true,
        thresholds: {
          critical: 60,
        },
      },
      tags: [],
    };
  }

  private getFragmentationRatioConfig(databaseConfig: IDatabaseConfig): IMonitorConfig {
    return {
      type: MonitorType.Metric,
      query: `avg(last_5m):avg:redis.mem.fragmentation_ratio{${this.getIdentificationTags(databaseConfig)}} >= 1.5`,
      name: `Redis ${databaseConfig.name} fragmentation ratio`,
      message: `{{#is_alert}}##Alert{{/is_alert}}\n\nRedis service \`${databaseConfig.name}\` fragmentation ratio is {{comparator}} {{threshold}}.`,
      options: {
        include_tags: true,
        thresholds: {
          critical: 1.5,
        },
      },
      tags: [],
    };
  }

  private getConnectedSlavesConfig(databaseConfig: IDatabaseConfig): IMonitorConfig {
    return {
      type: MonitorType.Metric,
      query: `change(avg(last_5m),last_5m):sum:redis.net.slaves{${this.getIdentificationTags(databaseConfig)}} > 1`,
      name: `Redis ${databaseConfig.name} connected slaves`,
      message: `{{#is_alert}}##Alert{{/is_alert}}\n\nRedis service ${databaseConfig.name} lost {{comparator}} {{threshold}} slaves.`,
      options: {
        include_tags: true,
        thresholds: {
          critical: 1,
        },
      },
      tags: [],
    };
  }
}
