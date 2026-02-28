import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Article } from './Article.entity';

@Injectable()
export class ArticleService {

  constructor(
    @InjectRepository(Article)
    private articleRepository: Repository<Article>,
  ) {}

  // CREATE
  async create(title: string) {
    const article = this.articleRepository.create({ title });
    return this.articleRepository.save(article);
  }

  // READ ALL
  findAll() {
    return this.articleRepository.find();
  }

  // READ ONE
  async findOne(id: number) {
    const article = await this.articleRepository.findOneBy({ id });

    if (!article) {
      throw new NotFoundException('Todo not found');
    }

    return article;
  }

  // UPDATE
  async update(id: number, data: Partial<Article>) {
    const article = await this.findOne(id);

    Object.assign(article, data);

    return this.articleRepository.save(article);
  }

  // DELETE
  async remove(id: number) {
    const article = await this.findOne(id);
    return this.articleRepository.remove(article);
  }

}