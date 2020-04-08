import { TaskStatus } from "../task-sttaus.enum";
import { IsOptional, IsNotEmpty, IsIn } from "class-validator";

export class GetTasksFilterDto {
    @IsOptional()
    @IsIn([TaskStatus.OPEN, TaskStatus.IN_PROGRESS, TaskStatus.DONE])
    status : TaskStatus;


    @IsOptional()
    @IsNotEmpty()
    search: string;
}