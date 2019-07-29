import { ApplicationError } from '@/errors';

export class ApplicationErrorAction extends ApplicationError {
    public type = 'error';
}
