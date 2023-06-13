import { Entity, PrimaryGeneratedColumn, Column, Index, ManyToOne, OneToMany } from "typeorm"
// import typeormFaker from 'typeorm-faker'
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

    @ManyToOne(() =>UserAddress, (userAddress)=> userAddress.users)
    address: UserAddress

    @ManyToOne(() =>Company, (company)=> company.users)
    company:Company

    @OneToMany(()=> Disponibility, (disponibility)=> disponibility.user )
    disponibilities:Disponibility[]
}

// generate Stubs/Dummy Daten
// const postStubs = typeormFaker.stub(User);

/**User[
*     {id: 1, firstName: 'Otto', lastName: 'Waalkes', birthdate: '', email: 'ow.auslaenderbehoerde@bochum.de', phoneNumber: 02341234561, password: 'password1'},
*     {id: 2, firstName: 'Zarina', lastName: 'Kasir', birthdate: '', email: 'zk.auslaenderbehoerde@bochum.de', phoneNumber: 02341234562, password: 'password1'},
*     {id: 3, firstName: 'Ahmet', lastName: 'Kaya', birthdate: '', email: 'ak.auslaenderbehoerde@bochum.de', phoneNumber: 02341234563, password: 'password1'}
* ]
*/
/** const count = 5
// const postStubs = typeormFaker.stub(User, count, {
//     lastName: 'Waalkes'
})*/