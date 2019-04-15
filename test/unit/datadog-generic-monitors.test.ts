import { DatadogGenericMonitors } from '../../src';

describe('DatadogGenericMonitors', () => {
  let datadogGenericMonitors: DatadogGenericMonitors;

  beforeAll(() => {
    datadogGenericMonitors = new DatadogGenericMonitors({
      apiKey: 'this-is-an-api-key',
      appKey: 'this-is-an-app-key',
    });
  });

  test('first test', () => {
    expect(datadogGenericMonitors).toBeInstanceOf(DatadogGenericMonitors);
  });
});
