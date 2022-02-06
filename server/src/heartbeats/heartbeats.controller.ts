import { Controller, Get, Post, Body, Patch, Param, Delete, Ip } from '@nestjs/common';
import { IpAddress } from 'src/IpAddress.decorator';
import { HeartbeatsService } from './heartbeats.service';
import { CreateHeartbeatDto } from './dto/create-heartbeat.dto';
import { UpdateHeartbeatDto } from './dto/update-heartbeat.dto';

@Controller('heartbeats')
export class HeartbeatsController {
  constructor(private readonly heartbeatsService: HeartbeatsService) {}

  @Post()
  create(@Body() heartbeat: CreateHeartbeatDto, @IpAddress() ipAddress) {
    heartbeat.ip = ipAddress;
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
