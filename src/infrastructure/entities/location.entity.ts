import { Column, Entity, PrimaryGeneratedColumn, Tree, TreeChildren, TreeParent } from "typeorm";

@Entity({ name: 'locations' })
@Tree('closure-table')
export class Location {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  level: string;

  @Column('float')
  area: number;

  @TreeChildren()
  children: Location[];

  @TreeParent({ onDelete: 'CASCADE' })
  parent: Location;
}