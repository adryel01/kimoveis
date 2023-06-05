import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, ManyToOne, OneToOne, JoinColumn, OneToMany } from "typeorm";
import Category from "./categories.entity";
import Address from "./addresses.entity";
import Schedule from "./schedules.entity";

@Entity('real_estate')
class RealEstate {

	@PrimaryGeneratedColumn('increment')
	id: number

	@Column({ type: 'boolean', default: false })
	sold: boolean

	@Column({ type: 'decimal', precision: 12, scale: 2, default: 0 })
	value: number | string

	@Column({ type: 'integer' })
	size: number

	@CreateDateColumn({type: 'date'})
	createdAt: string

	@UpdateDateColumn({type: 'date'})
	updatedAt: string

	@ManyToOne(() => Category, (category)=> category.realEstate)
	category: Category

	@OneToOne(() => Address, (address)=> address.realEstate)
	@JoinColumn()
	address: Address

	@OneToMany(()=> Schedule, (schedules)=> schedules.realEstate)
	schedules: Schedule[]

}

export default RealEstate