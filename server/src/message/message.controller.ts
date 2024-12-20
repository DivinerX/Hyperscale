import { Controller, Get, Param, Query, Req } from '@nestjs/common';
import { MessageService } from './message.service';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '../auth/auth.guard';

@Controller('api/message')
@UseGuards(AuthGuard)
export class MessageController {
  constructor(private messageService: MessageService) {}

  @Get('private/:id')
  getMessage(@Req() req, @Param('id') id: string, @Query('page') page: number) {
    console.log(req.user);
    return this.messageService.getPrivateMessage(id, req.user.id, page);
  }

  @Get('public')
  getPublicMessage(@Query('page') page: number) {
    return this.messageService.getPublicMessage(page);
  }
}
