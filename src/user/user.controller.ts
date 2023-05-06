import { Controller, UseGuards, Get, Req, Body, Patch } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserService } from './user.service';
import { User } from '@prisma/client';
import { UpdateUserDto } from './dto/update-user.dto';
import { Request } from 'express';

@UseGuards(AuthGuard('jwt'))
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  getLoginUser(@Req() req: Request): Omit<User, 'hashedPassword'> {
    return req.user;
  }

  @Patch()
  updateUser(
    @Req() req: Request,
    @Body() dto: UpdateUserDto,
  ): Promise<Omit<User, 'hashedPassword'>> {
    return this.userService.updateUser(req.user.id, dto);
  }
}
