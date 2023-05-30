import { Entity, PrimaryGeneratedColumn, Column, Index } from "typeorm"
import { UserAddress } from "./address"

@Entity()
export class User {

    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column({ length: 30, nullable: true })
    firstName: string

    @Column({ length: 30 })
    lastName: string

    @Index({ unique: true })
    @Column({ type: "date" })
    birthdate: Date

    @Index({ unique: true })
    @Column({unique:true})
    email: string

    @Column({type: "numeric", nullable: true})
    phoneNumber:number

    @Column()
    password:string

    @Column()
    address:UserAddress

}
