import { Entity, PrimaryGeneratedColumn, Column, Index, ManyToOne } from "typeorm"
import { UserAddress } from "./address"
import  {Length, IsDate, IsEmail, IsOptional} from 'class-validator';

@Entity()
export class User {

    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column({ length: 30, nullable: true })
    @Length(3,30)
    @IsOptional()
    firstName?: string

    @Column({ length: 30 })
    @Length(2,30)
    
    lastName: string

    @Index({ unique: true })
    @Column({ type: "date" })
    @IsDate()
    birthdate: Date

    @Index({ unique: true })
    @Column({unique:true})
    @IsEmail()
    email: string

    @Column({type: "numeric", nullable: true})
    @IsOptional()
    phoneNumber?:number

    @Column()
    password:string

    @ManyToOne(() =>UserAddress, (userAddress)=> userAddress.users)
    address:UserAddress

}
