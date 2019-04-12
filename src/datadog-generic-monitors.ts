import { MonitorType } from './enums/monitor-type.enum';
import { ICreateMonitorResponse } from './interfaces/create-monitor-response.interface';
import {
    IDatadogGenericMonitorsConfig
} from './interfaces/datadog-generic-monitors-config.interface';
import { IMonitorConfig } from './interfaces/monitor-config.interface';
import { Rest } from './lib/rest';

export class DatadogGenericMonitors {
  private rest: Rest;

  constructor(config: IDatadogGenericMonitorsConfig) {
    const host = config.host || 'app.datadoghq.com';

    this.rest = new Rest({
      host: `https://${host}/api/v1`,
      query: { api_key: config.apiKey, application_key: config.appKey },
    });
  }

  public createMonitor(config: IMonitorConfig): Promise<ICreateMonitorResponse> {
    const body = JSON.stringify(config);

    return this.rest.post<ICreateMonitorResponse>('/monitor', body);
  }
}
