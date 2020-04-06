import { Controller, Get, Post, Body, Param, Delete, Patch, Query } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task, TaskStatus } from './task.model';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';

@Controller('tasks')
export class TasksController {
    constructor(private taskService : TasksService){}

    @Get()
    getTasks(@Query() getTasksFilterDto: GetTasksFilterDto){
        if(Object.keys(getTasksFilterDto).length){
            return this.taskService.getTasksWithFilters(getTasksFilterDto);
        }
        return this.taskService.getTasks();
    }

    @Get('/:id')
    getTask(@Param('id') id: string) : Task {
        console.log(id);
        return this.taskService.getTaskById(id);
    }

    @Post()
    createTask(@Body() createTaskDto: CreateTaskDto) : Task {
        return this.taskService.createTask(createTaskDto);
    }

    @Delete('/:id')
    deleteTask(@Param('id') id: string): boolean {
        return this.taskService.deleteTask(id);
    }

    @Patch('/:id/status')
    updateTaskStatus(@Param('id') id: string, @Body('status') status: TaskStatus){
        return this.taskService.updateTaskStatus(id, status);
    }
}
