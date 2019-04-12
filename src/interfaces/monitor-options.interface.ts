export interface IMonitorOptions {
  silenced?: {};
  notify_no_data?: boolean;
  new_host_delay?: number;
  no_data_timeframe?: number;
  timeout_h?: number;
  require_full_window?: boolean;
  renotify_interval?: number;
  escalation_message?: string;
  notify_audit?: boolean;
  locked?: boolean;
  include_tags?: boolean;
  threshold_windows?: {};
  evaluation_delay?: number;
}
