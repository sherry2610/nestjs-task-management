import { Injectable, NotFoundException } from '@nestjs/common';
import { Tasks, TaskStatus } from './tasks.model';
import { v1 as uuid} from 'uuid';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetFilteredTasksDto } from './dto/get-filtered-tasks.dto';

@Injectable()
export class TasksService {
    private tasks: Tasks[] = [];

    getAllTask (): Tasks[] {
        return this.tasks;
    }

    getFilteredTasks (getFilteredTasksDto: GetFilteredTasksDto): Tasks[] {
        let {status, search} = getFilteredTasksDto;

        let tasks = this.getAllTask();

        if(status){
            tasks = tasks.filter(task => task.status == status)
        }

        if(search) {
            tasks = tasks.filter(task =>
                    task.title.includes(search) ||
                    task.description.includes(search)
                )
        }

        return tasks;
    }

    getTaskById (id: string): Tasks {
        const found = this.tasks.find(task => task.id == id)

        if(!found) {
            throw new NotFoundException(`No task with id ${id} found`)
        }

        return found
    }

    createTask (createTaskDto: CreateTaskDto): Tasks {
        const {title, description} = createTaskDto

        const newTask = {
            id: uuid(),
            title,
            description,
            status: TaskStatus.OPEN
        }

        this.tasks.push(newTask);

        return newTask
    }

    deleteTaskById (id: string): {message: string, status: boolean} {
        let indexOfTaskToBeDeleted = this.tasks.findIndex(task => task.id == id)
        if(indexOfTaskToBeDeleted!==-1){
            this.tasks.splice(indexOfTaskToBeDeleted,1)
        }
        else{
            return {
                message: "ID not found!",
                status: false
            }
        }

        return {
            message: "deleted successfully!",
            status: true
        }
    }

    updateTaskStatus (id: string, status: TaskStatus): Tasks {
        let task = this.getTaskById(id)
        task.status = status

        return task;
    }

}
