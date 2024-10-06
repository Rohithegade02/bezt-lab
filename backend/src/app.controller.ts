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
  Post,
  Put,
} from '@nestjs/common';

@Controller()
export class AppController {
  constructor(
    private readonly userService: UserService,
    private readonly profileService: ProfileService,
  ) {}

  // to create a user
  @Post('/api/user')
  async signupUser(
    @Body()
    userData: {
      username: string;
      phone: string;
    },
  ): Promise<UserModel> {
    return this.userService.createUser(userData);
  }

  //get all users
  @Get('/api/users')
  async getAllUsers(): Promise<UserModel[]> {
    return this.userService.getAllUsers();
  }

  //get user by id
  @Get('/api/user/:id')
  async getUserById(@Param('id') id: string): Promise<UserModel | null> {
    const userId = parseInt(id, 10);

    return this.userService.getUserById(userId);
  }

  //edit user
  @Put('/api/user/:id')
  async updateUser(
    @Param('id') id: string,
    @Body()
    data: {
      username: string;
      phone: string;
    },
  ): Promise<UserModel | null> {
    const userId = parseInt(id, 10);

    return this.userService.updateUser(userId, data);
  }
  //delete user
  @Delete('/api/user/:id')
  async deleteUser(@Param('id') id: string): Promise<UserModel | null> {
    const userId = parseInt(id, 10);
    return this.userService.deleteUser(userId);
  }

  //get all user profiles
  @Get('/api/user-profile/:id')
  async getUserAndProfiles(@Param('id') id: string): Promise<UserModel | null> {
    const userId = parseInt(id, 10); // Convert the id to an integer
    return this.userService.getUserWithProfiles(userId);
  }
  //post
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
    // Step 1: Create the User
    const user = await this.userService.createUser({
      username: data.username,
      phone: data.phone,
    });

    // Step 2: Create the Profile and link it to the created user
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
  @Put('/api/user-profile/:id')
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

    // Update the User model

    // Update the Profile model
    const profile = await this.profileService.updateProfile({
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
    const user = await this.userService.updateUser(userId, {
      username: data.username,
      phone: data.phone,
    });

    return { user, profile };
  }
}
