# Padrão de Projeto Proxy (GoF Estrutural)

Implementação completa do padrão de projeto **Proxy** em TypeScript.

## 📂 Estrutura do Projeto

```
proxy/
├── src/
│   ├── interfaces/
│   │   ├── IServiceResponse.ts    # Interface de resposta padrão
│   │   └── IMessageService.ts     # Contrato do serviço de mensagens
│   ├── services/
│   │   ├── RealMessageService.ts  # Serviço real (RealSubject)
│   │   └── MessageServiceProxy.ts # Proxy que controla acesso
│   ├── App.ts                     # Cliente que demonstra o uso
│   └── tsconfig.json              # Configuração TypeScript
├── package.json
└── README.md
```

## 🎯 O que é o Padrão Proxy?

O **Proxy** é um padrão estrutural que fornece um substituto ou marcador de posição para outro objeto. Ele controla o acesso ao objeto original, permitindo que você execute algo antes ou depois da solicitação chegar ao objeto real.

### Componentes

- **IServiceResponse**: Interface que define a estrutura de resposta
- **IMessageService**: Interface que define o contrato do serviço
- **RealMessageService**: O serviço real que executa a lógica de negócio
- **MessageServiceProxy**: O proxy que intercepta e valida requisições
- **App**: Cliente que utiliza o proxy

### Funcionalidade

Este exemplo implementa um sistema de mensagens onde apenas usuários com e-mail institucional (`@universidade.edu.br`) podem enviar mensagens. O Proxy intercepta as requisições e valida o remetente antes de delegar ao serviço real.

## 🚀 Como Executar

### Pré-requisitos

- Node.js (v16 ou superior)
- npm

### Instalação

```bash
cd proxy
npm install
```

### Executar

```bash
npm start
```

### Compilar

```bash
npm run build
```

O código compilado será gerado na pasta `dist/`.

## 📊 Saída Esperada

```
--- Tentativa 1: Usuário Válido ---
[Proxy] Interceptando a solicitação...
[Proxy] Acesso permitido. Encaminhando ao serviço real...
[RealService] Enviando mensagem de aluno@universidade.edu.br para colega@universidade.edu.br...
Resultado: { success: true, message: 'Mensagem enviada com sucesso.' }

--- Tentativa 2: Usuário Inválido ---
[Proxy] Interceptando a solicitação...
[Proxy] BLOQUEADO: E-mail não institucional.
Resultado: {
  success: false,
  message: 'Apenas e-mails institucionais podem enviar mensagens.'
}
```

## 🧩 Benefícios do Padrão Proxy

- **Controle de Acesso**: Valida permissões antes de executar operações
- **Lazy Loading**: Pode adiar a criação de objetos pesados
- **Logging**: Registra operações antes de delegá-las
- **Cache**: Pode armazenar resultados para otimização
- **Proteção**: Adiciona camada de segurança ao objeto real

## 📝 Licença

ISC
