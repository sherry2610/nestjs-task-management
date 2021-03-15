import { TaskStatus } from "../tasks.model";

export class GetFilteredTasksDto {
    status: TaskStatus;
    search: string;
}