import { ApiProperty } from '@nestjs/swagger';

export class CreateTodoDto {

    @ApiProperty()
    title: string;
    description?: string;
    position?: number;
    id?: number;

}