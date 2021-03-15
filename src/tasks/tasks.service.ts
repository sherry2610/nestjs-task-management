import { Injectable } from '@nestjs/common';
import { Tasks, TaskStatus } from './tasks.model';
import { v1 as uuid} from 'uuid';

@Injectable()
export class TasksService {
    private tasks: Tasks[] = [];

    getAllTask (): Tasks[] {
        return this.tasks;
    }

    createTask (title: string, description: string): Tasks {
        const newTask = {
            id: uuid(),
            title,
            description,
            status: TaskStatus.OPEN
        }

        this.tasks.push(newTask);

        return newTask
    }
}
