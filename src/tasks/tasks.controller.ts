import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { Tasks, TaskStatus } from './tasks.model';
import { TasksService } from './tasks.service';
import { GetFilteredTasksDto } from './dto/get-filtered-tasks.dto';
import { TaskStatusValidationPipes } from './pipes/tasks-status-validation.pipes';

@Controller('tasks')
export class TasksController {
    constructor(private taskServices: TasksService){}

    @Get()
    getTasks (@Query(ValidationPipe) getFilteredTasksDto: GetFilteredTasksDto) {
        if(Object.keys(getFilteredTasksDto).length){
            return this.taskServices.getFilteredTasks(getFilteredTasksDto)
        }else{
            return this.taskServices.getAllTask()
        }
        
    }

    @Post()
    @UsePipes(ValidationPipe)
    createNewTask (@Body() createTaskDto: CreateTaskDto): Tasks {
        return this.taskServices.createTask(createTaskDto)
    }

    @Get(':id')
    getTaskById (@Param('id') id: string): Tasks {
        return this.taskServices.getTaskById(id)
    }

    @Delete(':id')
    deleteTaskById (@Param('id') id: string): void {
        this.taskServices.deleteTaskById(id)
    }

    @Patch(':id/status')
    updateTaskById (
        @Param('id') id: string,
        @Body('status', TaskStatusValidationPipes) status: TaskStatus
    ): Tasks {
        return this.taskServices.updateTaskStatus(id, status)
    }

}
