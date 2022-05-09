import { User } from 'src/entity/user/user.entity';
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