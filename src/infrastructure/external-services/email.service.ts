import { Injectable } from '@nestjs/common';

export interface EmailService {
  sendEmail(to: string, subject: string, body: string): Promise<void>;
}

@Injectable()
export class EmailServiceImpl implements EmailService {
  async sendEmail(to: string, subject: string, body: string): Promise<void> {
    // 실제 이메일 서비스 구현 (예: SendGrid, AWS SES 등)
    console.log(`Sending email to ${to}: ${subject}`);
    console.log(`Body: ${body}`);
    
    // 실제 구현에서는 여기서 외부 이메일 서비스 API를 호출
    // await this.emailProvider.send({ to, subject, body });
  }
}
