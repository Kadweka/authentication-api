import { User } from 'src/auth/user.entity';
import { PrimaryGeneratedColumn, BaseEntity, Column, Entity, ManyToOne } from 'typeorm';

@Entity()
export class Product extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  productName: string;

  @Column()
  price: string;
  @ManyToOne(type => User)owner?: User;

}