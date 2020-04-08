import { Controller, Get, Post, Body, Param, Delete, Patch, Query, UsePipes, ValidationPipe, ParseIntPipe } from '@nestjs/common';
import { TasksService } from './tasks.service';
import {  TaskStatus } from './task-sttaus.enum';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { TaskStatusValidationPipe } from './pipes/task-status-validation.pipe';
import { Task } from './task.entity';

@Controller('tasks')
export class TasksController {
    constructor(private taskService : TasksService){}

    @Get()
    @UsePipes(ValidationPipe)
    getTasks(@Query() getTasksFilterDto: GetTasksFilterDto): Promise<Task[]> {
        // if(Object.keys(getTasksFilterDto).length){
        //     return this.taskService.getTasksWithFilters(getTasksFilterDto);
        // }
        return this.taskService.getTasks(getTasksFilterDto);
    }

    @Get('/:id')
    getTask(@Param('id', ParseIntPipe) id: number) : Promise<Task> {
        return this.taskService.getTaskById(id);
    }

    @Post()
    @UsePipes(ValidationPipe)
    createTask(@Body() createTaskDto: CreateTaskDto) : Promise<Task> {
        return this.taskService.createTask(createTaskDto);
    }

    @Delete('/:id')
    deleteTask(@Param('id', ParseIntPipe) id: number) : Promise<Task> {
        return this.taskService.deleteTask(id);
    }

    @Patch('/:id/status')
    updateTaskStatus(@Param('id', ParseIntPipe) id: number, @Body('status', TaskStatusValidationPipe) status: TaskStatus){
        return this.taskService.updateTaskStatus(id, status);
    }
}
