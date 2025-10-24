import { Mediator } from "./mediator";
import { LoginForm } from "../forms/loginForm";
import { RegisterForm } from "../forms/registerForm";
import { ValidatorForm } from "../forms/validatorForm";

export class AuthMediator implements Mediator {
    private loginForm?: LoginForm;
    private registerForm?: RegisterForm;
    private validator: ValidatorForm;

    constructor() {
        this.validator = new ValidatorForm(this);
    }

    setLoginForm(form: LoginForm): void {
        this.loginForm = form;
        this.loginForm.setMediator(this);
    }

    setRegisterForm(form: RegisterForm): void {
        this.registerForm = form;
        this.registerForm.setMediator(this);
    }

    notify(sender: object, event: string, data?: any): void {
        if (event === "login_attempt") {
            console.log("Validando credenciais de login...");
            const isValid = this.validator.validateLogin(data);
            if (isValid) {
                this.processLogin(data);
            }
        }

        if (event === "register_attempt") {
            console.log("Validando dados de cadastro...");
            const isValid = this.validator.validateRegister(data);
            if (isValid) {
                this.processRegister(data);
            }
        }

        if (event === "validation_success") {
            console.log("Validacao concluida com sucesso");
        }

        if (event === "validation_failed") {
            console.log("Falha na validacao:", data.errors);
            this.showErrors(data.errors);
        }
    }

    private processLogin(credentials: { email: string; password: string }): void {
        console.log("Processando login para:", credentials.email);
        // Aqui entraria a logica de autenticacao real (API)
    }

    private processRegister(userData: {
        name: string;
        email: string;
        enrollment: string;
        password: string;
        confirmPassword: string;
        profilePhoto: File | null;
        enrollmentProof: File | null;
    }): void {
        console.log("Processando cadastro para:", userData.name);
        // Aqui entraria a logica de registro real (API)
    }

    private showErrors(errors: string[]): void {
        console.log("Erros de validacao:");
        errors.forEach(error => console.log(`- ${error}`));
    }
}