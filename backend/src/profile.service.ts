import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { Profile, Prisma } from '@prisma/client';

@Injectable()
export class ProfileService {
  constructor(private prisma: PrismaService) {}

  async createProfile(data: Prisma.ProfileCreateInput): Promise<Profile> {
    return this.prisma.profile.create({
      data,
    });
  }
  async updateProfile(params: {
    where: { userId: number }; // Modify where to use userId
    data: Prisma.ProfileUpdateInput;
  }): Promise<Profile | null> {
    const { where, data } = params;

    // Use updateMany because userId is not a unique field
    const updatedProfiles = await this.prisma.profile.updateMany({
      where,
      data,
    });

    // Return null or the first updated profile if needed
    if (updatedProfiles.count === 0) {
      return null; // No profiles were updated
    }

    // Fetch the first updated profile (if only one is allowed for the user)
    return this.prisma.profile.findFirst({
      where: { userId: where.userId },
    });
  }
}
