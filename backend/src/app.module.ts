// app.module.ts
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ProfileService } from './profile.service';
import { PrismaService } from './prisma.service';
import { UserService } from './user.service';

@Module({
  imports: [], // Import UserModule here
  controllers: [AppController],
  providers: [UserService, ProfileService, PrismaService], // UserService is no longer needed here as it's in UserModule
})
export class AppModule {}
