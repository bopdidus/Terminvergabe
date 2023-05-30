import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm"
import  {IsInt, Length} from 'class-validator';
import { User } from "./User";

@Entity()
export class UserAddress {

    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column({ length: 50})
    @Length(2,50)
    street: string

    @Column({ length: 50 , unique:true })
    @Length(2,50)
    city: string

    @Column({ length: 10 })
    @IsInt()
    postal: number

    @OneToMany(()=>User, (user)=> user.address )
    users: User[]

}