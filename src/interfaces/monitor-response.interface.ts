import { MonitorType } from '../enums/monitor-type.enum';
import { IMonitorOptions } from './monitor-options.interface';

export interface IMonitorResponse {
  id: number;
  message: string;
  name: string;
  tags: string[];
  options: IMonitorOptions;
  org_id: string;
  query: string;
  state: {};
  type: MonitorType;
  multi: boolean;
  created: string;
  modified: string;
}
