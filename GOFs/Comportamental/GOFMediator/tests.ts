import { AuthMediator } from "./mediators/authMediator";
import { LoginForm } from "./forms/loginForm";
import { RegisterForm } from "./forms/registerForm";

console.log("=== INICIANDO TESTES DO MEDIATOR ===\n");

// Criar o mediator e os formularios
const mediator = new AuthMediator();
const loginForm = new LoginForm(mediator);
const registerForm = new RegisterForm(mediator);

mediator.setLoginForm(loginForm);
mediator.setRegisterForm(registerForm);

console.log("--- TESTE 1: Login valido ---");
loginForm.setField("email", "aluno@unb.br");
loginForm.setField("password", "senha123");
loginForm.submit();
console.log("");

console.log("--- TESTE 2: Login com email invalido ---");
const loginForm2 = new LoginForm(mediator);
mediator.setLoginForm(loginForm2);
loginForm2.setField("email", "email-invalido");
loginForm2.setField("password", "senha123");
loginForm2.submit();
console.log("");

console.log("--- TESTE 3: Login com senha curta ---");
const loginForm3 = new LoginForm(mediator);
mediator.setLoginForm(loginForm3);
loginForm3.setField("email", "aluno@unb.br");
loginForm3.setField("password", "123");
loginForm3.submit();
console.log("");

console.log("--- TESTE 4: Login com campos vazios ---");
const loginForm4 = new LoginForm(mediator);
mediator.setLoginForm(loginForm4);
loginForm4.submit();
console.log("");

console.log("--- TESTE 5: Cadastro valido ---");
const mockFile = new File(["conteudo"], "comprovante.pdf", { type: "application/pdf" });
registerForm.setField("name", "Joao Silva");
registerForm.setField("email", "joao@aluno.unb.br");
registerForm.setField("enrollment", "12345678");
registerForm.setField("password", "senha123");
registerForm.setField("confirmPassword", "senha123");
registerForm.setField("enrollmentProof", mockFile);
registerForm.submit();
console.log("");

console.log("--- TESTE 6: Cadastro com email nao institucional ---");
const registerForm2 = new RegisterForm(mediator);
mediator.setRegisterForm(registerForm2);
registerForm2.setField("name", "Maria Santos");
registerForm2.setField("email", "maria@gmail.com");
registerForm2.setField("enrollment", "12345678");
registerForm2.setField("password", "senha123");
registerForm2.setField("confirmPassword", "senha123");
registerForm2.setField("enrollmentProof", mockFile);
registerForm2.submit();
console.log("");

console.log("--- TESTE 7: Cadastro com senhas diferentes ---");
const registerForm3 = new RegisterForm(mediator);
mediator.setRegisterForm(registerForm3);
registerForm3.setField("name", "Pedro Costa");
registerForm3.setField("email", "pedro@unb.br");
registerForm3.setField("enrollment", "12345678");
registerForm3.setField("password", "senha123");
registerForm3.setField("confirmPassword", "senha456");
registerForm3.setField("enrollmentProof", mockFile);
registerForm3.submit();
console.log("");

console.log("--- TESTE 8: Cadastro sem comprovante ---");
const registerForm4 = new RegisterForm(mediator);
mediator.setRegisterForm(registerForm4);
registerForm4.setField("name", "Ana Lima");
registerForm4.setField("email", "ana@aluno.unb.br");
registerForm4.setField("enrollment", "12345678");
registerForm4.setField("password", "senha123");
registerForm4.setField("confirmPassword", "senha123");
registerForm4.submit();
console.log("");

console.log("--- TESTE 9: Cadastro com foto de perfil opcional ---");
const mockPhoto = new File(["foto"], "perfil.jpg", { type: "image/jpeg" });
const registerForm5 = new RegisterForm(mediator);
mediator.setRegisterForm(registerForm5);
registerForm5.setField("name", "Carlos Souza");
registerForm5.setField("email", "carlos@unb.br");
registerForm5.setField("enrollment", "12345678");
registerForm5.setField("password", "senha123");
registerForm5.setField("confirmPassword", "senha123");
registerForm5.setField("profilePhoto", mockPhoto);
registerForm5.setField("enrollmentProof", mockFile);
registerForm5.submit();
console.log("");

console.log("--- TESTE 10: Cadastro com matricula curta ---");
const registerForm6 = new RegisterForm(mediator);
mediator.setRegisterForm(registerForm6);
registerForm6.setField("name", "Lucia Ferreira");
registerForm6.setField("email", "lucia@aluno.unb.br");
registerForm6.setField("enrollment", "123");
registerForm6.setField("password", "senha123");
registerForm6.setField("confirmPassword", "senha123");
registerForm6.setField("enrollmentProof", mockFile);
registerForm6.submit();
console.log("");

console.log("--- TESTE 11: Cadastro com nome curto ---");
const registerForm7 = new RegisterForm(mediator);
mediator.setRegisterForm(registerForm7);
registerForm7.setField("name", "Jo");
registerForm7.setField("email", "jo@unb.br");
registerForm7.setField("enrollment", "12345678");
registerForm7.setField("password", "senha123");
registerForm7.setField("confirmPassword", "senha123");
registerForm7.setField("enrollmentProof", mockFile);
registerForm7.submit();
console.log("");

console.log("=== TESTES CONCLUIDOS ===");