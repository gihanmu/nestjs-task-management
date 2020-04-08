import { PipeTransform, BadRequestException } from "@nestjs/common";
import { TaskStatus } from "../task-sttaus.enum";

export class TaskStatusValidationPipe implements PipeTransform {
    readonly ALLOWED_STATUS = [
        TaskStatus.OPEN,
        TaskStatus.IN_PROGRESS,
        TaskStatus.DONE
    ]

    transform(value: any){
        if(this.ALLOWED_STATUS.indexOf(value) > -1 ){
            return value;
        }
            throw new BadRequestException(`Task Status : ${value} is not allowed`);
    }
}