import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Client {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'varchar',
    nullable: false,
  })
  firstName: string;

  @Column({
    type: 'varchar',
    nullable: false,
  })
  lastName: string;

  @Column({
    type: 'varchar',
    unique: true,
    nullable: false,
  })
  email: string;

  @Column({
    type: 'varchar',
    nullable: false,
    length: 10,
  })
  phone: string;
}
