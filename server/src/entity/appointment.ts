import { Entity, PrimaryGeneratedColumn, Column, Index, ManyToOne } from "typeorm"
import { User } from "./user"


@Entity()
export class Appointment {

    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column()
    date: string

    @Column()
    time: string

    //todo user trennen

    @ManyToOne(() =>User, (user)=> user.appointments)
    user: User

    @ManyToOne(() =>User, (user)=> user.appointments)
    clerk: User

}
