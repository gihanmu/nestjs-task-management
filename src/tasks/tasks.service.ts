import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import * as uuid from 'uuid/v1';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';

@Injectable()
export class TasksService {
    private tasks: Task[] = [];

    public getTasks() : Task[] {
        return this.tasks;
    }

    public getTasksWithFilters(getTasksDto: GetTasksFilterDto){
        const {status, search } = getTasksDto;
        const tasks = [... this.getTasks()];
        return tasks.filter( task =>
            task.status === status &&
            task.description.includes(search)
        );
    }

    public getTaskById(id: string) : Task {
        return this.tasks.find(task => task.id === id);
    }

    public createTask(createTaskDto: CreateTaskDto) : Task{
        const {title, description} = createTaskDto;
        const task : Task = {
            id: uuid(),
            title,
            description,
            status: TaskStatus.OPEN
        } 
        this.tasks.push(task);
        return task;
    }

    public updateTaskStatus(id: string, status: TaskStatus): Task {
        const task = {...this.getTaskById(id)};
        console.log('task before', task)
        if (task) {
            task.status = status;
            console.log('task after', task)
            return task;
        }
        return null;
    }

    public deleteTask(id: string){
        if(id && this.tasks && this.tasks.length){
            this.tasks = [...this.tasks.filter(task => task.id !== id)];
            return true;
        }
        return false;
    }
}
