import { Injectable } from '@nestjs/common';
import * as process from 'node:process';

@Injectable()
export class AppService {
  getHello(): string {
    return `hello ${process.env.NODE_ENV}`;
  }
}
