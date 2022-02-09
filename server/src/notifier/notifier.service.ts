import { Injectable, Logger } from '@nestjs/common';
import { Telegram } from 'telegraf';

@Injectable()
export class NotifierService {
  private readonly logger = new Logger(NotifierService.name);
  async sendTelegramMessage(
    message: string,
    extra = {},
    telegramSecret: string = process.env.TELEGRAM_BOT_SECRET || '',
    chatId: string = process.env.TELEGRAM_CHANNEL_ID || ''
  ) {
    if (!telegramSecret || !chatId) {
      this.logger.error(
        `Missing configuration info to send telegram notifications.`
      );
      return;
    }

    try{
      const bot = new Telegram(telegramSecret);
      await bot.sendMessage(chatId, message);
    }catch(e){
      this.logger.error(`Error sending telegram notification: ${e.message}`);
    }

  }
}
