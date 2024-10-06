// user.module.ts
import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { PrismaService } from './prisma.service';

@Module({
  providers: [UserService, PrismaService],
  exports: [UserService], // Export UserService so it can be used in other modules
})
export class UserModule {}
