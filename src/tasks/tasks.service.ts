import { Injectable } from '@nestjs/common';
import { Tasks, TaskStatus } from './tasks.model';
import { v1 as uuid} from 'uuid';
import { CreateTaskDto } from './dto/create-task.dto';

@Injectable()
export class TasksService {
    private tasks: Tasks[] = [];

    getAllTask (): Tasks[] {
        return this.tasks;
    }

    getTaskById (id: string): Tasks {
        return this.tasks.find(task => task.id == id)
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

}
