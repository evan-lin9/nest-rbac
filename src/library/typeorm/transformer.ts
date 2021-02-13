import { ValueTransformer } from 'typeorm';
const dayjs = require('dayjs');

export class LocalDateTransformer implements ValueTransformer {
  // To db from typeorm
  public to(value: Date): Date {
    return value;
  }
  // From db to typeorm
  public from(value: any): Date {
    return dayjs.isDayjs(dayjs(value))
      ? dayjs(value).format('YYYY-MM-DD HH:mm:ss')
      : value;
  }
}
