import {BaseEntity,PrimaryGeneratedColumn,Entity,Column,Unique} from 'typeorm';

@Entity()
@Unique(['email'])
export class User extends BaseEntity{
    @PrimaryGeneratedColumn('uuid')
    userId:string
    @Column({nullable:false})
    firstName:string
    @Column({nullable:false})
    lastName:string
    @Column('varchar',{length:11,nullable:true})
    phoneNumber:string
    @Column()
    email:string
    @Column()
    password:string
}