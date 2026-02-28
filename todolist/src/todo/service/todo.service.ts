import {Injectable, NotFoundException} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {Todo} from '../entity/Todo.entity';
import {deleteOutDirIfEnabled} from "@nestjs/cli/lib/compiler/helpers/delete-out-dir";
import { CreateTodoDto } from '../dto/todo.create.dto';

deleteOutDirIfEnabled

@Injectable()
export class TodoService {

    constructor(
        @InjectRepository(Todo)
        private todoRepository: Repository<Todo>,
    ) {
    }

    // CREATE
    async create(title: string) {

        if (!title || !title.trim()) {
            throw new Error('Title is required');
        }

        const last = await this.todoRepository
            .createQueryBuilder("todo")
            .select("MAX(todo.position)", "max")
            .getRawOne();

        const position = (last?.max ?? -1) + 1;

        const todo = this.todoRepository.create({
            title,
            completed: false,
            position
        });

        return this.todoRepository.save(todo);
    }

    // READ ALL
    findAll() {
        return this.todoRepository.find({
            order: {
                position: "ASC"
            }
        });
    }

    async reorder(todos: { id: number; position: number }[]) {

        const validTodos = todos.filter(t => Number.isFinite(t.id));

        const updates = validTodos.map(todo =>
            this.todoRepository.update(todo.id, {
                position: todo.position
            })
        );

        await Promise.all(updates);

        return { success: true };
    }
    // READ ONE
    async findOne(id: number) {
        const todo = await this.todoRepository.findOneBy({id});

        if (!todo) {
            throw new NotFoundException('Todo not found');
        }

        return todo;
    }

    // UPDATE
    async update(id: number, data: Partial<Todo>) {
        const todo = await this.findOne(id);

        Object.assign(todo, data);

        return this.todoRepository.save(todo);
    }

    // DELETE
    async remove(id: number) {
        const todo = await this.findOne(id);
        return this.todoRepository.remove(todo);
    }

}