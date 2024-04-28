import { AuthUserDto, NewUserDto } from "../dto/user.dto";

export interface UserCases {
    getProfile: () => void;
    auth: (authUser: AuthUserDto) => void;
    new: (newUser: NewUserDto) => void;
}