import { LogLevel } from '@nestjs/common';

const NAME_LOG_LEVELS: Array<LogLevel> = [
  'error',
  'warn',
  'log',
  'verbose',
  'debug',
];

export function getLogLevels(): Array<LogLevel> {
  const level = +process.env.LOG_LEVELS;
  if (level && typeof level === 'number' && level >= 0 && level <= 4) {
    const arrayLogLevels = NAME_LOG_LEVELS.slice(0, level + 1);
    return arrayLogLevels;
  }
  return NAME_LOG_LEVELS.slice(0, 3);
}
