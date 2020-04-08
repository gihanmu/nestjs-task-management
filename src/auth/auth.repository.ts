import { ConflictException, InternalServerErrorException } from "@nestjs/common";
import { Repository, EntityRepository } from "typeorm";
import * as bcrypt from 'bcrypt';
import { User } from "./user.entity";
import { AuthCredentialsDto } from "./dto/auth-credentials.dto";


@EntityRepository(User)
export class AuthRepository extends Repository<User> {

    async singUp(authCredentialsDto: AuthCredentialsDto): Promise<User> {
        const {username, password} = authCredentialsDto;
        const salt = await bcrypt.genSalt();
        const user = new User();
        user.username = username;
        user.salt = salt;
        user.password = await this.hashPassword(password, salt);
       
        try{
            await this.save(user);
            return user;
        }catch(error){
            if(error.code === '2505'){
                throw new ConflictException("Username already exists");
            }else{
                throw new InternalServerErrorException();
            }
        }
       
    }

    async validateUserPassword(authCredentialsDto: AuthCredentialsDto)  : Promise<string>{
        const {username, password} = authCredentialsDto;
        const user= await this.findOne({username});
        if(user && await user.validatePassword(password)){
            return user.username;
        }
            return null;

    }

    async hashPassword(password: string, salt: string) : Promise<string> {
        const hashedPassword = await bcrypt.hash(password, salt);
        return hashedPassword;
    }

}