import { AuthUserDto, NewUserDto } from "@/domain/dto/user.dto";
import { UserCases } from "@/domain/use-cases/user.use-cases";
import User from "../database/mongo-users.database";
import bcrypt from "bcrypt";

export class UsersGateway implements UserCases {
    getProfile = () => {
        throw new Error("Method not implemented.");
    };
    auth = async (authUser: AuthUserDto) => {
        const {email, password} = authUser;
        const user = await User.findOne({email});
        if (!user) return null;
        const passwordsMatch = await bcrypt.compare(password, user.password);
        if (!passwordsMatch) return null;
        return user
    };
    new = async (newUser: NewUserDto) => {
        const {name, email, password} = newUser;
        const user = await User.findOne({email});
        if (user) return null;  
        const hashedPassword = await bcrypt.hash(password, 10);
        return User.create({name, email, password: hashedPassword});
    };
}