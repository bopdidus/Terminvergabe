import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm"
import { User } from "./User";

@Entity()
export class UserAddress {

    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column({ length: 50})
    street: string

    @Column({ length: 50 , unique:true })
    city: string

    @Column()
    postal: number

    @OneToMany(()=>User, (user)=> user.address )
    users: User[]

}