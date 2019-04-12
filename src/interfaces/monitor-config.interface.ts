import { MonitorType } from '../enums/monitor-type.enum';
import { IMonitorOptions } from './monitor-options.interface';

export interface IMonitorConfig {
  type: MonitorType;
  query: string;
  name: string;
  message: string;
  options?: IMonitorOptions;
  tags?: string[];
}
