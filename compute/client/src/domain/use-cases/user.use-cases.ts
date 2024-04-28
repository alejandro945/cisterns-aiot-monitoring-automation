import { AuthUserDto, NewUserDto } from "../dto/user.dto";
import { User } from "../model/User";

export interface UserCases {
    getAll: () => Promise<User[]>;
    auth: (authUser: AuthUserDto) => void;
    new: (newUser: NewUserDto) => void;
}