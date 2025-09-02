import { Module } from '@nestjs/common';
import { UserRepository } from './repositories/user.repository';
import { EmailServiceImpl } from './external-services/email.service';

@Module({
  providers: [
    UserRepository,
    {
      provide: 'EmailService',
      useClass: EmailServiceImpl,
    },
  ],
  exports: [UserRepository, 'EmailService'],
})
export class InfrastructureModule {}
