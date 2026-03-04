
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArticleService } from './articleService';
import { ArticleController } from './article.controller';
import { Article } from './Article.entity';
import { Section } from '../section/Section.entity';


@Module({
  imports: [TypeOrmModule.forFeature([Article, Section])],
  controllers: [ArticleController],
  providers: [ArticleService],
})
export class ArticleModule {}