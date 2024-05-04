'use server'

import { AuthUserDto, NewUserDto } from "@/domain/dto/user.dto";
import User from "../database/mongo-users.database";
import bcrypt from 'bcrypt';
import { withDatabaseConnection } from "@/application/decorators/withDatabaseConnection";


export const getAll = withDatabaseConnection(
    async () => {
        return await User.find();
    });

export const auth = withDatabaseConnection(
    async (authUser: AuthUserDto) => {
        const { email, password } = authUser;
        const user = await User.findOne({ email });
        if (!user) return null;
        const passwordsMatch = await bcrypt.compare(password, user.password);
        if (!passwordsMatch) return null;
        return user
    })

export const newUser = withDatabaseConnection(
    async (newUser: NewUserDto) => {
        const { name, email, password } = newUser;
        const user = await User.findOne({ email });
        if (user) return null;
        const hashedPassword = await bcrypt.hash(password, 10);
        return User.create({ name, email, password: hashedPassword });
    })
