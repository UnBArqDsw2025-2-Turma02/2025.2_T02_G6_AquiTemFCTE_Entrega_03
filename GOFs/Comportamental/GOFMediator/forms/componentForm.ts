import { Mediator } from "../mediators/mediator";

export abstract class ComponentForm {
    protected mediator?: Mediator;

    setMediator(mediator: Mediator) {
        this.mediator = mediator;
    }

    abstract submit(): void;
}