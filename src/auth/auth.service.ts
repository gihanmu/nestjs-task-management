import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthRepository } from './auth.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { User } from './user.entity';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(AuthRepository)
        private authRepository: AuthRepository
    ){

    }

    async signUp(authCredentialsDto : AuthCredentialsDto): Promise<User> {
        return this.authRepository.singUp(authCredentialsDto);
    }

    async signIn(authCredentialsDto : AuthCredentialsDto) {
        const username = await this.authRepository.validateUserPassword(authCredentialsDto);
        if(!username){
            throw new UnauthorizedException('Invalid credentials');
        }
    }
}
