import { Repository, EntityRepository } from "typeorm";
import { Task } from "./task.entity";
import { CreateTaskDto } from "./dto/create-task.dto";
import { TaskStatus } from "./task-sttaus.enum";
import { GetTasksFilterDto } from "./dto/get-tasks-filter.dto";

@EntityRepository(Task)
export class TaskRepository extends Repository<Task> {

    async getTasks(getTasksFilterDto: GetTasksFilterDto) : Promise<Task[]> {
        const {status, search} = getTasksFilterDto;
        console.log("search ",search)
        const query = this.createQueryBuilder("task");
        if(status){
            query.where("task.taskStatus = :status", {status})
        }
        if(search){
            query.andWhere("task.title LIKE :search OR task.description LIKE :search", {search : `%${search}%`});
        }
        console.log('sql ',query.getSql());
        const tasks = await query.getMany();
        return tasks;
    }
    async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
        const {title, description} = createTaskDto;
        const task = new Task();
        task.title = title;
        task.description = description;
        task.taskStatus = TaskStatus.OPEN;
        await this.save(task)
        return task;
    }
}