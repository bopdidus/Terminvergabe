import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

export class UserAddress {

    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column({ length: 50})
    street: string

    @Column({ length: 50 , unique:true })
    city: string

    @Column({ length: 10 })
    postal: number

}