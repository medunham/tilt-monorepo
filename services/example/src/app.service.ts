import { Injectable } from '@nestjs/common';
import { LIBRARY } from '@medunham/core';

@Injectable()
export class AppService {
  getConstant(): string {
    return LIBRARY;
  }
}
