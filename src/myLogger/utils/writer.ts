import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { mkdir } from 'node:fs/promises';
import { createWriteStream } from 'node:fs';
import { stat } from 'node:fs/promises';
import { EOL } from 'node:os';
import * as path from 'node:path';

@Injectable()
export class Writer {
  pathToDirectory = '/app/my_logs';
  initNameLogFile: string;
  initNameErrorFile: string;
  constructor() {
    this.createDirectory();
  }
  async write(message: string, type: string) {
    if (type === 'log') {
      await this.writeStreamMain(message);
    } else {
      await this.writeStreamError(message);
    }
  }

  async createDirectory() {
    this.pathToDirectory = '/app/my_logs';

    try {
      await mkdir(this.pathToDirectory);
      console.log(`Created directory ${this.pathToDirectory}`);
    } catch (err) {
      console.log('Directory already exist');
    }
  }

  async writeStreamMain(message: string) {
    if (!this.initNameLogFile) {
      this.initNameLogFile = new Date().toJSON();
    }

    const pathToFile = `${this.pathToDirectory}${path.sep}${this.initNameLogFile}.log`;

    await this.checkSizeFile(pathToFile, message, false);

    const ws = createWriteStream(
      `${this.pathToDirectory}${path.sep}${this.initNameLogFile}.log`,
      {
        flags: 'a',
      },
    );
    ws.write(message + EOL);
  }

  async writeStreamError(message: string) {
    if (!this.initNameErrorFile) {
      this.initNameErrorFile = new Date().toJSON();
    }

    const pathToFile = `${this.pathToDirectory}${path.sep}ERROR${this.initNameErrorFile}.log`;

    await this.checkSizeFile(pathToFile, message, true);

    const ws = createWriteStream(pathToFile, {
      flags: 'a',
    });
    ws.write(message + EOL);
  }

  async checkSizeFile(pathToFile: string, msg: string, errorStream: boolean) {
    let fileSize: number;
    try {
      fileSize = (await stat(pathToFile)).size;
    } catch (error) {
      if (error.code === 'ENOENT') {
        fileSize = 0;
      } else throw new InternalServerErrorException('Internal server error');
    }
    const msgSize = Buffer.byteLength(msg, 'utf-8');
    if (fileSize + msgSize > +process.env.MAX_SIZE_LOG_FILE) {
      if (errorStream) {
        this.initNameErrorFile = new Date().toJSON();
      } else this.initNameLogFile = new Date().toJSON();
    }
  }
}
