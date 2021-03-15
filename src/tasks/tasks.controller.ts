import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
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
    createNewTask (@Body() createTaskDto: CreateTaskDto): Tasks {
        return this.taskServices.createTask(createTaskDto)
    }

    @Get(':id')
    getTaskById (@Param('id') id: string): Tasks {
        return this.taskServices.getTaskById(id)
    }

}
