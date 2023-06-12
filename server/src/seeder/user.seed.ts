import { Connection } from "typeorm";
import { Factory, Seeder } from "typeorm-seeding";
import { User } from "../entity/user";

export default class UserSeeder implements Seeder {
    public async run(factory: Factory):Promise<void>
    {
        await factory(User)().createMany(10)
    }
}