import { Entity, PrimaryGeneratedColumn, Column, Index, ManyToOne, ManyToMany } from "typeorm"
import { UserAddress } from "./address"
import { Appointment } from "./appointment"


@Entity()
export class User {

    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column({ length: 30, nullable: true })
    firstName?: string

    @Column({ length: 30 })
    lastName: string

    @Index({ unique: true })
    @Column({ type: "date" })
    birthdate: Date

    @Index({ unique: true })
    @Column({unique:true})
    email: string

    @Column({type: "numeric", nullable: true})
    phoneNumber?:number

    @Column()
    password:string
    
    @ManyToMany(() =>Appointment, (appointment)=> appointment.users)
    appointments: Appointment[]

    @ManyToOne(() =>UserAddress, (userAddress)=> userAddress.users)
    address:UserAddress
}
