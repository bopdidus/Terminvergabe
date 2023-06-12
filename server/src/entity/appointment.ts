import { Entity, PrimaryGeneratedColumn, Column, Index, ManyToOne, BaseEntity } from "typeorm"
import { User } from "./User"


@Entity()
export class Appointment extends BaseEntity {

    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column({type: "date"})
    date: Date

    @Column()
    time: string

    //todo user nutzen

    /** Auskommtentiert zum Test 
    @ManyToOne(() =>User, (user)=> user.appointments)
    user: User

    @ManyToOne(() =>User, (user)=> user.appointments)
    clerk: User*/

    // @Column()
    // qrCodeString?: string

    @Column()
    userID: string

    @Column()
    clerkID: string

}
