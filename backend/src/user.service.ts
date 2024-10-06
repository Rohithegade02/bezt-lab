import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { User, Prisma } from '@prisma/client';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async createUser(data: Prisma.UserCreateInput): Promise<User> {
    return this.prisma.user.create({
      data,
    });
  }
  async getUserById(id: number): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: { id },
    });
  }
  async getUserWithProfiles(id: number): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: { id },
      include: {
        profiles: true, // Includes the related profiles for the user
      },
    });
  }
  async getAllUsers(): Promise<User[]> {
    return this.prisma.user.findMany({ include: { profiles: true } });
  }

  async deleteUser(id: number): Promise<User | null> {
    return this.prisma.user.delete({
      where: { id },
    });
  }
  async updateUser(id: number, data: Prisma.UserUpdateInput): Promise<User> {
    return this.prisma.user.update({
      where: { id },
      data,
    });
  }
}
