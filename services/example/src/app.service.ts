import { Injectable } from '@nestjs/common';
import { HELPER } from '@medunham/helper';

@Injectable()
export class AppService {
  getConstant(): string {
    return HELPER + '1';
  }
}
