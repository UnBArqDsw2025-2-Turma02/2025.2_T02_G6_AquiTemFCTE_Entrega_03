export interface Mediator {
    notify(sender: object, event: string, data?: any): void;
}