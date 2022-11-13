import { sign, verify } from "jsonwebtoken";
import User from "../types/User";
import DotEnvComponent from "./DotEnvComponents";

export default class JWTComponent {
    public static generateToken(user: User): string {

        const data = {
            _id: user._id,
            name: user.name
        };

        return sign(data, DotEnvComponent.API_JWT_KEY, {expiresIn: "2h"});

    }

    public static async decodeToken(token: string): Promise<any>{
        try {
            return await verify(token, DotEnvComponent.API_JWT_KEY);
        } catch (error) {
            return undefined
        }
    }
}