import { Entity, PrimaryGeneratedColumn, Column, Index, ManyToOne, OneToMany, CreateDateColumn, DeleteDateColumn, UpdateDateColumn } from "typeorm"
import { UserAddress } from "./address"
import { User } from "./user"


@Entity()
export class Company {

    @PrimaryGeneratedColumn("uuid")
    id: string

    @CreateDateColumn()
    createdDate: Date;
 
    @UpdateDateColumn()
    updatedDate: Date;
 
    @DeleteDateColumn()
    deletedDate: Date;

    @Column({ length: 50 })
    name: string

    @Index({ unique: true })
    @Column({unique:true})
    email: string

    @Column({type: "numeric"})
    phoneNumber:number

    @Column()
    password:string

    @ManyToOne(() =>UserAddress, (userAddress)=> userAddress.companies)
    address:UserAddress

    @OneToMany(()=>User, (user)=> user.company )
    users: User[]

}
