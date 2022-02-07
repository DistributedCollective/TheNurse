import { Controller, Get, Post, Body, Patch, Param, Delete, Ip, Req } from '@nestjs/common';
import { HeartbeatsService } from './heartbeats.service';
import { CreateHeartbeatDto } from './dto/create-heartbeat.dto';
import { UpdateHeartbeatDto } from './dto/update-heartbeat.dto';


@Controller('heartbeats')
export class HeartbeatsController {
  constructor(private readonly heartbeatsService: HeartbeatsService) {}

  @Post()
  create(@Body() heartbeat: CreateHeartbeatDto, @Req() req) {
    heartbeat.ip = req.headers['x-forwarded-for'] || req.ip;
    console.log(`---------------req`, heartbeat)
    return this.heartbeatsService.create(heartbeat);
  }

  @Get()
  findAll() {
    return this.heartbeatsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.heartbeatsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateHeartbeatDto: UpdateHeartbeatDto) {
    return this.heartbeatsService.update(+id, updateHeartbeatDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.heartbeatsService.remove(+id);
  }
}
