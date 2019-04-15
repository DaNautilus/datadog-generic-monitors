import { MonitorType } from './enums/monitor-type.enum';
import {
    IDatadogGenericMonitorsConfig
} from './interfaces/datadog-generic-monitors-config.interface';
import { IDeleteMonitorResponse } from './interfaces/delete-monitor-response.interface';
import { IMonitorConfig } from './interfaces/monitor-config.interface';
import { IMonitorResponse } from './interfaces/monitor-response.interface';
import { Rest } from './lib/rest';

export class DatadogGenericMonitors {
  private rest: Rest;
  private readonly url = '/monitor';

  constructor(config: IDatadogGenericMonitorsConfig) {
    const host = config.host || 'app.datadoghq.com';

    this.rest = new Rest({
      host: `https://${host}/api/v1`,
      query: { api_key: config.apiKey, application_key: config.appKey },
    });
  }

  public getAllMonitors(): Promise<IMonitorResponse[]> {
    return this.rest.get<IMonitorResponse[]>(this.url);
  }

  public createMonitor(config: IMonitorConfig): Promise<IMonitorResponse> {
    const body = JSON.stringify(config);

    return this.rest.post<IMonitorResponse>(this.url, body);
  }

  public deleteMonitor(monitorId: number): Promise<IDeleteMonitorResponse> {
    return this.rest.delete<IDeleteMonitorResponse>(`${this.url}/${monitorId}`);
  }

  public async deleteAllMonitors(): Promise<IDeleteMonitorResponse[]> {
    const monitors = await this.getAllMonitors();
    const promises = monitors.map(monitor => this.deleteMonitor(monitor.id));

    return Promise.all(promises);
  }
}
