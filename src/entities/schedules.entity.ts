import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import User from "./users.entity";
import RealEstate from "./real_estate.entity";

@Entity('schedules')
class Schedule {

	@PrimaryGeneratedColumn('increment')
	id: number

	@Column({ type: 'date' })
	date: string | Date

	@Column({ type: 'time' })
	hour: string

	@ManyToOne(()=> User, (user)=> user.schedules)
	user: User

	@ManyToOne(()=> RealEstate, (realEstate)=> realEstate.schedules)
	realEstate: RealEstate
}

export default Schedule