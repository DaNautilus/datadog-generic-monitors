import {
    IDatadogGenericMonitorsConfig
} from './interfaces/datadog-generic-monitors-config.interface';
import { IDeleteMonitorResponse } from './interfaces/delete-monitor-response.interface';
import {
    IMonitorConfigAndAlertRecipients
} from './interfaces/monitor-config-and-alert-recipients.interface';
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

  public getMonitorById(monitorId: number): Promise<IMonitorResponse> {
    return this.rest.get<IMonitorResponse>(`${this.url}/${monitorId}`);
  }

  public getAllMonitors(): Promise<IMonitorResponse[]> {
    return this.rest.get<IMonitorResponse[]>(this.url);
  }

  public createMonitor(config: IMonitorConfigAndAlertRecipients): Promise<IMonitorResponse> {
    const body = JSON.stringify(this.addAlertRecipientsToMonitorConfig(config));

    return this.rest.post<IMonitorResponse>(this.url, body);
  }

  public createMonitors(configs: IMonitorConfigAndAlertRecipients[]): Promise<IMonitorResponse[]> {
    const promises = configs.map(config => this.createMonitor(config));

    return Promise.all(promises);
  }

  public deleteMonitorById(monitorId: number): Promise<IDeleteMonitorResponse> {
    return this.rest.delete<IDeleteMonitorResponse>(`${this.url}/${monitorId}`);
  }

  public async deleteAllMonitors(): Promise<IDeleteMonitorResponse[]> {
    const monitors = await this.getAllMonitors();
    const promises = monitors.map(monitor => this.deleteMonitorById(monitor.id));

    return Promise.all(promises);
  }

  private addAlertRecipientsToMonitorConfig({ monitorConfig, alertRecipients }: IMonitorConfigAndAlertRecipients): IMonitorConfig {
    const monitorConfigWithAlertRecipients = { ...monitorConfig };

    if (alertRecipients && alertRecipients.length > 0) {
      monitorConfigWithAlertRecipients.message = `${monitorConfigWithAlertRecipients.message}\n\n`;
    }

    alertRecipients.forEach(alertRecipient =>
      monitorConfigWithAlertRecipients.message = `${monitorConfigWithAlertRecipients.message} @${alertRecipient}`);

    return monitorConfigWithAlertRecipients;
  }
}
