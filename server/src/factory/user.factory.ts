import { User } from "../entity/user"
import * as Faker from "faker";
import { define } from 'typeorm-seeding';

define(User, (faker: typeof Faker) => {
    const gender = faker.random.number(1)
    const firstName = faker.name.firstName(gender)
    const lastName = faker.name.lastName(gender)
   
    const user = new User()
    user.password = "123456789"
    user.lastName = faker.name.lastName(gender)
    user.firstName = faker.name.firstName(gender)
    user.email = faker.internet.email(firstName, lastName);
    user.birthdate = faker.date.birthdate()
    user.address.city = faker.location.city()
    user.address.street = faker.location.street()
    user.address.postal = faker.location.zipCode() 
    
    return user
  })


