import { Entity, PrimaryGeneratedColumn, Column, Index, ManyToOne, OneToMany, Timestamp } from "typeorm"
import { UserAddress } from "./address"
import { User } from "./user"


@Entity()
export class Disponibility {

    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column()
    start_time: Timestamp

    @Column()
    end_time:Timestamp

    @Column({ type: "date"})
    disponibilityDate: Date


    @ManyToOne(()=>User, (user)=> user.disponibilities )
    user: User

}
