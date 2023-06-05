import { Entity, PrimaryGeneratedColumn, Column, Index, ManyToMany } from "typeorm"
import { User } from "./User"


@Entity()
export class Appointment {

    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column()
    date: string

    @Column()
    time: string

    @ManyToMany(() =>User, (user)=> user.appointments)
    users: User[]

}
