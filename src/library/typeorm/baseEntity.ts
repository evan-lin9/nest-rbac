import { CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { LocalDateTransformer } from '@library/typeorm/transformer';

export default class BaseEntity {
  // 添加时间
  @CreateDateColumn({
    type: 'timestamp',
    transformer: new LocalDateTransformer(),
    name: 'create_at',
  })
  createTime: Date;

  // 更新时间
  @UpdateDateColumn({
    type: 'timestamp',
    transformer: new LocalDateTransformer(),
    name: 'update_at',
  })
  updateTime: Date;
}
