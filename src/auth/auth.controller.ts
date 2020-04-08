import { Controller, Post, Body, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { AuthService } from './auth.service';
import { User } from './user.entity';

@Controller('auth')
export class AuthController {
    constructor(
        private authService : AuthService
    ){}

    @Post('/signup')
    @UsePipes(ValidationPipe)
    public signUp(@Body() authCredentialsDto : AuthCredentialsDto) : Promise<User> {
        return this.authService.signUp(authCredentialsDto)
    }

    @Post("/signin")
    public signIn(@Body()  authCredentialsDto : AuthCredentialsDto)  {
        return this.authService.signIn(authCredentialsDto);
    }
}
