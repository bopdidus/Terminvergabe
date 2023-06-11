import { Entity, PrimaryGeneratedColumn, Column, Index, ManyToOne } from "typeorm"
import { User } from "./User"


@Entity()
export class Appointment {

    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column({type: "date"})
    date: Date

    @Column()
    time: string

    //todo user trennen

    /** Auskommtentiert zum Test 
    @ManyToOne(() =>User, (user)=> user.appointments)
    user: User

    @ManyToOne(() =>User, (user)=> user.appointments)
    clerk: User*/

    @Column()
    userID: string

    @Column()
    clerkID: string

}
