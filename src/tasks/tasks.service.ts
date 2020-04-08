import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskStatus } from './task-sttaus.enum';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { TaskRepository } from './task.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';

@Injectable()
export class TasksService {
    constructor(
        @InjectRepository(TaskRepository)
        private taskRepository: TaskRepository
    ){}
   

    public getTasks(getTasksFilterDto: GetTasksFilterDto) : Promise<Task[]> {
        return this.taskRepository.getTasks(getTasksFilterDto);
    }

    // public getTasksWithFilters(getTasksDto: GetTasksFilterDto){
    //     const {status, search } = getTasksDto;
    //     const tasks = [... this.getTasks()];
    //     return tasks.filter( task =>
    //         task.status === status &&
    //         task.description.includes(search)
    //     );
    // }

    public async getTaskById(id: number) : Promise<Task> {
        const found =  await this.taskRepository.findOne(id);
        if(!found){
            throw new NotFoundException(`Task with ID : ${id} not found`);
        }
        return found;
    }

    public createTask(createTaskDto: CreateTaskDto) : Promise<Task>{
      return this.taskRepository.createTask(createTaskDto);
    }

    public async updateTaskStatus(id: number, status: TaskStatus): Promise<Task> {
       const task = await this.getTaskById(id);
       task.taskStatus = status;
       await this.taskRepository.save(task);
       return task;
    }

    public async deleteTask(id: number){
        const taskToDelete = await this.getTaskById(id);
        return this.taskRepository.remove(taskToDelete);
      
    }
}
