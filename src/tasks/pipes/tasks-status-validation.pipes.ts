import { BadRequestException, PipeTransform } from '@nestjs/common';
import { TaskStatus } from '../tasks.model';

export class TaskStatusValidationPipes implements PipeTransform {

    readonly allowedStatus = [
        TaskStatus.OPEN,
        TaskStatus.IN_PROGRESS,
        TaskStatus.DONE,
    ]

    transform(value: any) {

        value = value.toUpperCase();

        if(!this.isValidStatus(value)) {
            throw new BadRequestException(`${value} is not a valid status`)
        }

        return value
    }

    private isValidStatus(value: any) {
        const idx = this.allowedStatus.indexOf(value);
        return idx !== -1
    }
    
}