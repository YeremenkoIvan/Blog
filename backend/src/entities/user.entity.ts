import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { IsEmail, IsNotEmpty } from "class-validator";
import { Role } from "./role.entity";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    username: string;

    @Column({ length: 255 })
    @IsEmail()
    email: string;

    @Column()
    @IsNotEmpty()
    password: string;

    @ManyToOne(() => Role, (role) => role.users)
    role: Role;
}
