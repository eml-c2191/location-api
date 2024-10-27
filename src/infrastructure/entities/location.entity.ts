import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Location {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  number: string;

  @Column('float')
  area: number;

  // Self-referencing relation for parent location
  @ManyToOne(() => Location, (location) => location.children, { nullable: true })
  parent: Location;

  // One-to-many relation for child locations
  @OneToMany(() => Location, (location) => location.parent)
  children: Location[];
}