import { MonitorType } from '../enums/monitor-type.enum';
import { IMonitorOptions } from './monitor-options.interface';

export interface ICreateMonitorResponse {
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
