import "reflect-metadata"
import { DataSource } from "typeorm"
import { UserAddress } from "./entity/address"
import { User } from "./entity/User"

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "postgresql",
    port: 5432,
    username: "user",
    password: "postgres",
    database: "terminator_db",
    synchronize: true,
    logging: false,
    entities: [User, UserAddress],
    migrations: [],
    subscribers: [],
})
