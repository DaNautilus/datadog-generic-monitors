# Changelog

## [0.0.4] - 2019-04-18

### Added

- More sophisticated way to add alert recipients.

## [0.0.3] - 2019-04-16

### Fixed

- `Redis` Monitor for `connected slaves changed` not added to Datadog.

## [0.0.2] - 2019-04-16

### Added

- Create `connected slaves changed` `monitor` for `Redis`

### Fixed

- Add missing get single `monitor`.
- Duplicated `Redis` `key space hit rate` `monitor` removed.

## [0.0.1] - 2019-04-15

### Added

- Get single `monitor` or all `monitors`.
- Create `monitor` from single or multiple configurations.
- Delete single `monitor` or all `monitors`.
- Create pre defined `Redis` `monitors`.
