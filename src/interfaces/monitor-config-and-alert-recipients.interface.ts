import { IMonitorConfig } from './monitor-config.interface';

export interface IMonitorConfigAndAlertRecipients {
  monitorConfig: IMonitorConfig;
  alertRecipients?: string[];
}
