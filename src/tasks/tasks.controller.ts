import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { Tasks, TaskStatus } from './tasks.model';
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

    @Delete(':id')
    deleteTaskById (@Param('id') id: string): {message: string, status: boolean} {
        return this.taskServices.deleteTaskById(id)
    }

    @Patch(':id/status')
    updateTaskById (
        @Param('id') id: string,
        @Body('status') status: TaskStatus
    ): Tasks {
        return this.taskServices.updateTaskStatus(id, status)
    }

}
