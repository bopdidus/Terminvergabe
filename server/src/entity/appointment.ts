import { Entity, PrimaryGeneratedColumn, Column, Index, ManyToOne, BaseEntity, OneToOne, JoinColumn } from "typeorm"
import { User } from "./user"
import { Disponibility } from "./disponibility"


@Entity()
export class Appointment extends BaseEntity {

    @PrimaryGeneratedColumn("uuid")
    id: string

    
    @ManyToOne(() =>User, (user:User)=> user.id)
    user: User

    @ManyToOne(() =>User, (user:User)=> user.id)
    clerk: User

    // @Column()
    // qrCodeString?: string
    @OneToOne(()=>Disponibility, (dis:Disponibility)=> dis.id)
    @JoinColumn({name:'disponibilityId'})
    availability: Disponibility
}
