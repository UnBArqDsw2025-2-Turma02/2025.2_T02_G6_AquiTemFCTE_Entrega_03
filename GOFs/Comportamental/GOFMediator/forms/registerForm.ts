import { ComponentForm } from "./componentForm";
import { Mediator } from "../mediators/mediator";

export class RegisterForm extends ComponentForm {
    private fields = {
        name: "",
        email: "",
        enrollment: "",
        password: "",
        confirmPassword: "",
        profilePhoto: null as File | null,
        enrollmentProof: null as File | null
    };

    constructor(mediator: Mediator) {
        super();
        this.mediator = mediator;
    }

    setField(name: keyof typeof this.fields, value: string | File): void {
        if (name === "profilePhoto" || name === "enrollmentProof") {
            this.fields[name] = value as File;
        } else {
            this.fields[name] = value as string;
        }
    }

    getFields() {
        return { ...this.fields };
    }

    submit(): void {
        console.log("Iniciando processo de cadastro...");
        this.mediator?.notify(this, "register_attempt", this.getFields());
    }
}