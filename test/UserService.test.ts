import DatabaseConfig from "../src/configuration/DatabaseConfig";
import UserService from "../src/services/UserService";
import User from "../src/types/User"
import {expect, test, describe, beforeAll} from '@jest/globals';

describe("should be test the user service methods", ()=>{

    const user: User = {
        email:"fulano@gmail.com",
        name: "Fulano da Silva",
        password: "123456"
    }
    const userService = new UserService();

    beforeAll( async ()=>{
        await DatabaseConfig.connect()
    })


    test("shold be create a user", async () => {
        const result = await userService.create(user);

        user._id = result._id;
        expect(result).not.toBe(undefined);
    });

    test("should be get by uuid", async () =>{
        const result = await userService.findByUuid(user._id);
        expect(result).not.toBe(undefined);
    })

    test("should be get by email", async () =>{
        const result = await userService.findByEmail(user.email);
        expect(result).not.toBe(undefined);
    })

    test("should be create a rule", async () =>{
        const result = await userService.addRule(user._id, "ADM");
        expect(result).toBe(true);
    })

    test("should be delete a rule", async () =>{
        const result = await userService.deleteRule(user._id, "ADM");
        expect(result).toBe(true);
    })

    test("should be get all", async () =>{
        const result = await userService.read();
        expect(result.length).not.toBe(0);
    })

    test("should be update name", async () =>{
        const result = await userService.updateName(user._id, "novo nome");
        expect(result.name).toBe("novo nome");
    })

    test("should be delete name", async () =>{
        const result = await userService.delete(user._id);
        expect(result).not.toBe(undefined);
    })
})