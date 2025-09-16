import { Injectable } from '@nestjs/common';

export interface EmailService {
  sendEmail(to: string, subject: string, body: string): Promise<void>;
}

@Injectable()
export class EmailServiceImpl implements EmailService {
  async sendEmail(to: string, subject: string, body: string): Promise<void> {
    console.log(`Sending email to ${to}: ${subject}`);
    console.log(`Body: ${body}`);
  }
}
