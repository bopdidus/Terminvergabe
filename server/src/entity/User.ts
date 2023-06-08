import { Entity, PrimaryGeneratedColumn, Column, Index, ManyToOne, OneToMany } from "typeorm"
import { UserAddress } from "./address"
import { Appointment } from "./appointment"
import { Company } from "./company"
import { Disponibility } from "./disponibility"


@Entity()
export class User {

    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column({ length: 30, nullable: true })
    firstName?: string

    @Column({ length: 30 })
    lastName: string

    @Column({ type: "date" })
    birthdate: Date

    @Index({ unique: true })
    @Column({unique:true})
    email: string

    @Column({type: "numeric", nullable: true})
    phoneNumber?:number

    @Column()
    password:string
    
    @OneToMany(() =>Appointment, (appointment)=> appointment.user)
    appointments: Appointment[]

    @ManyToOne(() =>UserAddress, (userAddress)=> userAddress.users)
    address: UserAddress

    @ManyToOne(() =>Company, (company)=> company.users)
    company:Company

    @OneToMany(()=> Disponibility, (disponibility)=> disponibility.user )
    disponibilities:Disponibility[]
}
