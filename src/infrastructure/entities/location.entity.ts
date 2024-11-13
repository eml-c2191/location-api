import { Column, Entity, JoinColumn, PrimaryGeneratedColumn, Tree, TreeChildren, TreeParent, Unique } from "typeorm";

@Entity({ name: 'locations' })
@Tree('closure-table')
@Unique(['building', 'number']) // Enforce unique constraint on both building and number
export class Location {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  number: string; // Location Number

  @Column()
  name: string; // Location Name

  @Column()
  building: string; // Building

  @Column('float')
  area: number; // Area

  @TreeChildren()
  children: Location[];

  @TreeParent({ onDelete: 'CASCADE' })
  @JoinColumn({ name: 'parent_id' })
  parent: Location;
}