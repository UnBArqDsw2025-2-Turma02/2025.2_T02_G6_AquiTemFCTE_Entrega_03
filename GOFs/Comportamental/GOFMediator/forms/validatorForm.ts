import { ComponentForm } from "./componentForm";
import { Mediator } from "../mediators/mediator";

export class ValidatorForm extends ComponentForm {
    constructor(mediator?: Mediator) {
        super();
        this.mediator = mediator;
    }

    validateLogin(fields: { email: string; password: string }): boolean {
        const errors: string[] = [];

        if (!fields.email) {
            errors.push("Email é obrigatório");
        } else if (!this.isValidEmail(fields.email)) {
            errors.push("Email inválido");
        }

        if (!fields.password) {
            errors.push("Senha é obrigatória");
        } else if (fields.password.length < 6) {
            errors.push("Senha deve ter no mínimo 6 caracteres");
        }

        if (errors.length > 0) {
            this.mediator?.notify(this, "validation_failed", { errors });
            return false;
        }

        this.mediator?.notify(this, "validation_success", {});
        return true;
    }

    validateRegister(fields: {
        name: string;
        email: string;
        enrollment: string;
        password: string;
        confirmPassword: string;
        profilePhoto: File | null;
        enrollmentProof: File | null;
    }): boolean {
        const errors: string[] = [];

        if (!fields.name || fields.name.trim().length < 3) {
            errors.push("Nome deve ter no mínimo 3 caracteres");
        }

        if (!fields.email) {
            errors.push("Email institucional é obrigatório");
        } else if (!this.isUnBEmail(fields.email)) {
            errors.push("Email deve ser institucional da UnB");
        }

        if (!fields.enrollment || fields.enrollment.length < 8) {
            errors.push("Matrícula inválida");
        }

        if (!fields.password) {
            errors.push("Senha é obrigatória");
        } else if (fields.password.length < 6) {
            errors.push("Senha deve ter no mínimo 6 caracteres");
        }

        if (fields.password !== fields.confirmPassword) {
            errors.push("As senhas não coincidem");
        }

        if (fields.profilePhoto && !this.isValidImageFile(fields.profilePhoto)) {
            errors.push("Foto de perfil deve ser uma imagem válida");
        }

        if (!fields.enrollmentProof) {
            errors.push("Comprovante de matrícula é obrigatório");
        } else if (!this.isValidDocumentFile(fields.enrollmentProof)) {
            errors.push("Comprovante deve ser PDF ou imagem");
        }

        if (errors.length > 0) {
            this.mediator?.notify(this, "validation_failed", { errors });
            return false;
        }

        this.mediator?.notify(this, "validation_success", {});
        return true;
    }

    public submit(..._args: any[]): void {
        this.mediator?.notify(this, "submit", {});
    }

    private isValidEmail(email: string): boolean {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    private isUnBEmail(email: string): boolean {
        return email.endsWith("@unb.br") || email.endsWith("@aluno.unb.br");
    }

    private isValidImageFile(file: File): boolean {
        const validTypes = ["image/jpeg", "image/png", "image/jpg"];
        return validTypes.includes(file.type);
    }

    private isValidDocumentFile(file: File): boolean {
        const validTypes = ["application/pdf", "image/jpeg", "image/png", "image/jpg"];
        return validTypes.includes(file.type);
    }
}