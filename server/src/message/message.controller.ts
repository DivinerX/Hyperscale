import { Controller, Get, Param } from '@nestjs/common';
import { MessageService } from './message.service';

@Controller('api/message')
export class MessageController {
  constructor(private messageService: MessageService) {}

  @Get(':id')
  getMessage(@Param('id') id: string) {
    return this.messageService.getTargetMessage(id);
  }

  @Get('')
  getAllMessage() {
    console.log('getAllMessage');
    return this.messageService.getAllMessage();
  }
}