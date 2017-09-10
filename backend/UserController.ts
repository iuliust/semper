import { Controller, Get, Post, HttpStatus } from '@nestjs/common';

@Controller('users')
export class UserController {

  @Get('all')
  getAllUsers() {
    return [
      { name: 'James', lastname: 'Bond', alias: '007' },
      { name: 'Cédric', lastname: 'Villani', alias: 'Poincaca' },
    ];
  }
}
