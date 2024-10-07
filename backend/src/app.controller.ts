import { NotFoundException, Res, HttpStatus } from '@nestjs/common';
import { Response } from 'express';
import { UserService } from './user.service';
import { ProfileService } from './profile.service';
import { Gender } from '@prisma/client';
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
  getHello: any;
  constructor(
    private readonly userService: UserService,
    private readonly profileService: ProfileService,
  ) {}

  // Create a user
  @Post('/api/user')
  async signupUser(
    @Body() userData: { username: string; phone: string },
    @Res() res: Response,
  ): Promise<Response> {
    try {
      const user = await this.userService.createUser(userData);
      return res.status(HttpStatus.CREATED).json(user);
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        statusCode: 500,
        message: 'Failed to create user',
        error: error.message,
      });
    }
  }

  // Get all users
  @Get('/api/users')
  async getAllUsers(@Res() res: Response): Promise<Response> {
    try {
      const users = await this.userService.getAllUsers();
      return res.status(HttpStatus.OK).json(users);
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        statusCode: 500,
        message: 'Failed to fetch users',
        error: error.message,
      });
    }
  }

  // Get user by id
  @Get('/api/user/:id')
  async getUserById(
    @Param('id') id: string,
    @Res() res: Response,
  ): Promise<Response> {
    try {
      const userId = parseInt(id, 10);
      const user = await this.userService.getUserById(userId);

      if (!user) {
        throw new NotFoundException(`User with ID ${userId} not found`);
      }

      return res.status(HttpStatus.OK).json(user);
    } catch (error) {
      return res
        .status(
          error instanceof NotFoundException
            ? HttpStatus.NOT_FOUND
            : HttpStatus.INTERNAL_SERVER_ERROR,
        )
        .json({
          statusCode: error instanceof NotFoundException ? 404 : 500,
          message: error.message,
        });
    }
  }

  // Edit user
  @Patch('/api/user/:id')
  async updateUser(
    @Param('id') id: string,
    @Body() data: { username: string; phone: string },
    @Res() res: Response,
  ): Promise<Response> {
    try {
      const userId = parseInt(id, 10);
      const user = await this.userService.getUserById(userId);

      if (!user) {
        throw new NotFoundException(`User with ID ${userId} not found`);
      }

      const updatedUser = await this.userService.updateUser(userId, data);
      return res.status(HttpStatus.OK).json(updatedUser);
    } catch (error) {
      return res
        .status(
          error instanceof NotFoundException
            ? HttpStatus.NOT_FOUND
            : HttpStatus.INTERNAL_SERVER_ERROR,
        )
        .json({
          statusCode: error instanceof NotFoundException ? 404 : 500,
          message: error.message,
        });
    }
  }

  // Delete user
  @Delete('/api/user/:id')
  async deleteUser(
    @Param('id') id: string,
    @Res() res: Response,
  ): Promise<Response> {
    try {
      const userId = parseInt(id, 10);
      const user = await this.userService.getUserById(userId);

      if (!user) {
        throw new NotFoundException(`User with ID ${userId} not found`);
      }

      const deletedUser = await this.userService.deleteUser(userId);
      return res.status(HttpStatus.OK).json(deletedUser);
    } catch (error) {
      return res
        .status(
          error instanceof NotFoundException
            ? HttpStatus.NOT_FOUND
            : HttpStatus.INTERNAL_SERVER_ERROR,
        )
        .json({
          statusCode: error instanceof NotFoundException ? 404 : 500,
          message: error.message,
        });
    }
  }

  // Get all user profiles by user ID
  @Get('/api/user/profile/:id')
  async getUserAndProfiles(
    @Param('id') id: string,
    @Res() res: Response,
  ): Promise<Response> {
    try {
      const userId = parseInt(id, 10);
      const user = await this.userService.getUserWithProfiles(userId);

      if (!user) {
        throw new NotFoundException(
          `User with ID ${userId} and profiles not found`,
        );
      }

      return res.status(HttpStatus.OK).json(user);
    } catch (error) {
      return res
        .status(
          error instanceof NotFoundException
            ? HttpStatus.NOT_FOUND
            : HttpStatus.INTERNAL_SERVER_ERROR,
        )
        .json({
          statusCode: error instanceof NotFoundException ? 404 : 500,
          message: error.message,
        });
    }
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
    @Res() res: Response,
  ): Promise<Response> {
    try {
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

      return res.status(HttpStatus.CREATED).json({ user, profile });
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        statusCode: 500,
        message: 'Failed to create user and profile',
        error: error.message,
      });
    }
  }

  // Update user and profile details
  @Patch('/api/user/profile/:id')
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
    @Res() res: Response,
  ): Promise<Response> {
    try {
      const userId = parseInt(id, 10);

      const user = await this.userService.getUserById(userId);
      if (!user) {
        throw new NotFoundException(`User with ID ${userId} not found`);
      }

      const updatedUser = await this.userService.updateUser(userId, {
        username: data.username,
        phone: data.phone,
      });

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

      return res
        .status(HttpStatus.OK)
        .json({ user: updatedUser, profile: updatedProfile });
    } catch (error) {
      return res
        .status(
          error instanceof NotFoundException
            ? HttpStatus.NOT_FOUND
            : HttpStatus.INTERNAL_SERVER_ERROR,
        )
        .json({
          statusCode: error instanceof NotFoundException ? 404 : 500,
          message: error.message,
        });
    }
  }
}
