import { NotFoundException } from '@nestjs/common';
import { UserService } from './user.service';
import { ProfileService } from './profile.service';
import {
  User as UserModel,
  Profile as ProfileModel,
  Gender,
} from '@prisma/client';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
@Controller()
export class AppController {
  constructor(
    private readonly userService: UserService,
    private readonly profileService: ProfileService,
  ) {}

  // Create a user
  @Post('/api/user')
  async signupUser(
    @Body() userData: { username: string; phone: string },
  ): Promise<UserModel> {
    return this.userService.createUser(userData);
  }

  // Get all users
  @Get('/api/users')
  async getAllUsers(): Promise<UserModel[]> {
    return this.userService.getAllUsers();
  }

  // Get user by id
  @Get('/api/user/:id')
  async getUserById(@Param('id') id: string): Promise<UserModel | null> {
    const userId = parseInt(id, 10);

    // Check if user exists
    const user = await this.userService.getUserById(userId);
    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }

    return user;
  }

  // Edit user
  @Patch('/api/user/:id')
  async updateUser(
    @Param('id') id: string,
    @Body() data: { username: string; phone: string },
  ): Promise<UserModel | null> {
    const userId = parseInt(id, 10);

    // Check if user exists
    const user = await this.userService.getUserById(userId);
    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }

    return this.userService.updateUser(userId, data);
  }

  // Delete user
  @Delete('/api/user/:id')
  async deleteUser(@Param('id') id: string): Promise<UserModel | null> {
    const userId = parseInt(id, 10);

    // Check if user exists
    const user = await this.userService.getUserById(userId);
    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }

    return this.userService.deleteUser(userId);
  }

  // Get all user profiles by user ID
  @Get('/api/user-profile/:id')
  async getUserAndProfiles(@Param('id') id: string): Promise<UserModel | null> {
    const userId = parseInt(id, 10);

    // Check if user exists
    const user = await this.userService.getUserWithProfiles(userId);
    if (!user) {
      throw new NotFoundException(
        `User with ID ${userId} and profiles not found`,
      );
    }

    return user;
  }

  // Create a user and profile
  @Post('/api/user/profile')
  async createUserAndProfile(
    @Body()
    data: {
      username: string;
      phone: string;
      email: string;
      gender: Gender;
      address: string;
      pincode: string;
      city: string;
      state: string;
      country: string;
    },
  ): Promise<{ user: UserModel; profile: ProfileModel }> {
    const user = await this.userService.createUser({
      username: data.username,
      phone: data.phone,
    });

    const profile = await this.profileService.createProfile({
      email: data.email,
      gender: data.gender,
      address: data.address,
      pincode: data.pincode,
      city: data.city,
      state: data.state,
      country: data.country,
      user: {
        connect: { username: user.username },
      },
    });

    return { user, profile };
  }

  // Update user and profile details
  @Patch('/api/user-profile/:id')
  async updateUserAndProfile(
    @Param('id') id: string,
    @Body()
    data: {
      username: string;
      phone: string;
      email: string;
      gender: Gender;
      address: string;
      pincode: string;
      city: string;
      state: string;
      country: string;
    },
  ): Promise<{ user: UserModel; profile: ProfileModel }> {
    const userId = parseInt(id, 10);

    // Check if user exists
    const user = await this.userService.getUserById(userId);
    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }

    // // Check if profile exists
    // const profile = await this.profileService.getProfileByUserId(userId);
    // if (!profile) {
    //   throw new NotFoundException(`Profile for user with ID ${userId} not found`);
    // }

    // Update the User model
    const updatedUser = await this.userService.updateUser(userId, {
      username: data.username,
      phone: data.phone,
    });

    // Update the Profile model
    const updatedProfile = await this.profileService.updateProfile({
      where: { userId },
      data: {
        email: data.email,
        gender: data.gender,
        address: data.address,
        pincode: data.pincode,
        city: data.city,
        state: data.state,
        country: data.country,
      },
    });

    return { user: updatedUser, profile: updatedProfile };
  }
}
