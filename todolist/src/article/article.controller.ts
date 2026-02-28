import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ArticleService } from './articleService';

@Controller('articles')
export class ArticleController {

  constructor(private readonly articleService: ArticleService) {
  }

  // CREATE
  @Post()
  create(@Body() dto: { title: string, description: string }) {
    return this.articleService.create(dto.title);
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
    @Body() body: { title?: string; completed?: boolean },
  ) {
    return this.articleService.update(Number(id), body);
  }

  // DELETE
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.articleService.remove(Number(id));
  }

}