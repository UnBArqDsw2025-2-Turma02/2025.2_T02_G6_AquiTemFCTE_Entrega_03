import { ComponentForm } from "./componentForm";
import { Mediator } from "../mediators/mediator";

export class LoginForm extends ComponentForm {
    private fields = { 
        email: "", 
        password: "" 
    };

    constructor(mediator: Mediator) {
        super();
        this.mediator = mediator;
    }

    setField(name: keyof typeof this.fields, value: string): void {
        this.fields[name] = value;
    }

    getFields() {
        return { ...this.fields };
    }

    submit(): void {
        console.log("Iniciando processo de login...");
        this.mediator?.notify(this, "login_attempt", this.getFields());
    }
}