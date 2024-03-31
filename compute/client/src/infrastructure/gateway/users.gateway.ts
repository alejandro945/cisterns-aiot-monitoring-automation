import { AuthUserDto, NewUserDto } from "@/domain/dto/user.dto";
import { UserCases } from "@/domain/use-cases/user.use-cases";

export class UsersGateway implements UserCases {
    getProfile = () => {

    };
    auth = (authUser: AuthUserDto) => {

    };
    logout = () => {

    };
    new = (newUser: NewUserDto) => {

    };
}