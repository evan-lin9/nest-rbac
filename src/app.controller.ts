import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiOperation } from '@nestjs/swagger';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @ApiOperation({ summary: '根据 B 站动态号，获取评论信息' })
  async getReplByDynamicId() {
    return await this.appService.getHello();
  }
}
