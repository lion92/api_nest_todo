import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne
} from "typeorm";
import { Article } from "../article/Article.entity";

@Entity()
export class Section {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column("text")
    text: string;

    @ManyToOne(() => Article, (article) => article.sections, {
        onDelete: "CASCADE"
    })
    article: Article;
}