import "reflect-metadata"
import { DataSource, getRepository } from "typeorm"
import { UserAddress } from "./entity/address"
import { Company } from "./entity/company"
import { Disponibility } from "./entity/disponibility"
import { User } from "./entity/User"
import { Appointment } from "./entity/appointment"

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "postgresql",
    port: 5432,
    username: "user",
    password: "postgres",
    database: "terminator_db",
    synchronize: true,
    logging: false,
    entities: [User, UserAddress, Company, Disponibility, Appointment],
    migrations: [],
    subscribers: [],
    
})

AppDataSource.initialize().then(() =>{
    //Dummy Data
    // const user1 = new User()
    // const address1 = new UserAddress()
    // address1.city = "Bochum"
    // address1.postal = 44544
    // address1.street = "am Hochschulcampus 1"
    // address1.users[0] = user1
    
    // user1.address = address1
    // user1.birthdate = new Date('23/07/23')
    // user1.email = "dummyuser1@none.com"
    // user1.firstName = "Karl"
    // user1.lastName = "Käfer"
    // user1.password = "password1"

    // const userrepo = AppDataSource.getRepository(User)
    // userrepo.save(user1)
})
.catch((error) => console.log(error))