import { Entity, PrimaryGeneratedColumn, Column, Index, ManyToOne, OneToMany, Timestamp, CreateDateColumn, DeleteDateColumn, UpdateDateColumn } from "typeorm"
import { User } from './user'


@Entity()
export class Disponibility {

    @PrimaryGeneratedColumn("uuid")
    id: string;

    @CreateDateColumn()
    createdDate: Date;

    @UpdateDateColumn()
    updatedDate: Date;

    @DeleteDateColumn()
    deletedDate: Date;

    @Column({type:"time"})
    start_time: string;

    @Column({type:"time"})
    end_time: string;

    @Column({ type: "date"})
    disponibilityDate: Date;

    @ManyToOne(()=>User, (user)=> user.disponibilities )
    user: User;

}
