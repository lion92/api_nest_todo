import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post
} from '@nestjs/common';

import { ArticleService } from './articleService';
import { CreateArticleDto } from '../article/dto/CreateArticleDto';
import { UpdateArticleDto } from '../article/dto/UpdateArticleDto';
@Controller('articles')
export class ArticleController {

  constructor(private readonly articleService: ArticleService) {}

  // CREATE
  @Post()
  create(@Body() dto: CreateArticleDto) {
    return this.articleService.create(dto);
  }

  // READ ALL
  @Get()
  findAll() {
    return this.articleService.findAll();
  }

  // READ ONE
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.articleService.findOne(Number(id));
  }

  // UPDATE
  @Patch(':id')
  update(
      @Param('id') id: string,
      @Body() dto: UpdateArticleDto,
  ) {
    return this.articleService.update(Number(id), dto);
  }

  // DELETE
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.articleService.remove(Number(id));
  }

}