import {
  Injectable,
  Scope,
  ConsoleLogger,
  ConsoleLoggerOptions,
  LogLevel,
} from '@nestjs/common';
import { getLogLevels } from './utils/getLogLevel';
import { Writer } from './utils/writer';

@Injectable({ scope: Scope.TRANSIENT })
export class MyLogger extends ConsoleLogger {
  logLevels: Array<LogLevel> = getLogLevels();
  constructor(
    context: string,
    options: ConsoleLoggerOptions,
    private writer: Writer,
  ) {
    super(context, {
      ...options,
      logLevels: getLogLevels(),
    });
  }

  log(message: string, url: string) {
    super.log(message);
    if (this.logLevels.includes('log')) {
      this.writer.write(`${url} ${message}`, 'log');
    }
  }

  error(message: string) {
    super.error(message);
    if (this.logLevels.includes('error')) {
      this.writer.write(message, 'error');
    }
  }

  warn(message: string) {
    super.warn(message);
    if (this.logLevels.includes('warn')) {
      this.writer.write(message, 'log');
    }
  }

  debug(message: string) {
    super.debug(message);
    if (this.logLevels.includes('debug')) {
      this.writer.write(message, 'log');
    }
  }

  verbose(message: string, url: string) {
    super.verbose(message);
    if (this.logLevels.includes('verbose')) {
      this.writer.write(`${url} ${message}`, 'log');
    }
  }
}
