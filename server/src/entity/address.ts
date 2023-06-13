import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm"
import { User } from "./user";
import { Company } from "./company";

@Entity()
export class UserAddress {

    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column({ length: 50})
    street: string

    @Column({ length: 50})
    city: string

    @Column()
    postal: number

    @OneToMany(()=>User, (user)=> user.address )
    users: User[]

    @OneToMany(()=>Company, (company)=> company.address )
    companies: User[]

}