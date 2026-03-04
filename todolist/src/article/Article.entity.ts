import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    OneToMany
} from "typeorm";
import { Section } from "../section/Section.entity";

@Entity()
export class Article {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column("text")
    description: string;

    @Column("text")
    image: string;

    @Column("text")
    introduction: string;

    @OneToMany(() => Section, (section) => section.article, {
        cascade: true,
    })
    sections: Section[];
}