import { Controller, Get, Post, Body, Param, Patch, Delete } from '@nestjs/common';
import { TodoService } from '../service/todo.service';
import {CreateTodoDto} from "../dto/todo.create.dto";
import {Todo} from "../entity/Todo.entity";
@Controller('todos')
export class TodoController {

    constructor(private readonly todoService: TodoService) {}

    // CREATE
    @Post()
    create(@Body() dto: CreateTodoDto) {
        return this.todoService.create(dto.title);
    }

    // READ ALL
    @Get()
    findAll() {
        return this.todoService.findAll();
    }

    // READ ONE
    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.todoService.findOne(Number(id));
    }

    @Patch('reorder')
    async reorder(@Body() todos: { id:number,title:string, completed:boolean, position: number }[]) {
        return this.todoService.reorder(todos);
    }

    // UPDATE
    @Patch(':id')
    update(
        @Param('id') id: string,
        @Body() body: { title?: string; completed?: boolean },
    ) {
        return this.todoService.update(Number(id), body);
    }

    // DELETE
    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.todoService.remove(Number(id));
    }

}