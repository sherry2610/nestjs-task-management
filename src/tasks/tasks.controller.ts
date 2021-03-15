import { Controller, Get } from '@nestjs/common';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
    constructor(private taskServices: TasksService){}

    @Get()
    getAllTasks () {
        return this.taskServices.getAllTask()
    }

}
