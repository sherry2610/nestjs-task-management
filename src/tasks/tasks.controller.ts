import { Body, Controller, Get, Post } from '@nestjs/common';
import { Tasks } from './tasks.model';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
    constructor(private taskServices: TasksService){}

    @Get()
    getAllTasks () {
        return this.taskServices.getAllTask()
    }

    @Post()
    createNewTask (
        @Body('title') title: string,
        @Body('description') description: string,
    ): Tasks {
        return this.taskServices.createTask(title, description)
    }

}
