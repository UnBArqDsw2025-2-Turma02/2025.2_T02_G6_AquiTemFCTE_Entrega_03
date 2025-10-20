# bridge_aquitemfcte.py
"""
Demonstração do padrão Bridge no contexto do AquiTemFCTE
Sistema de notificações com múltiplos canais de comunicação
"""
from __future__ import annotations
from abc import ABC, abstractmethod
from typing import Dict, Optional
import time

# ---------- Implementor ----------
class NotificationChannel(ABC):
    """Interface para canais de notificação"""
    
    @abstractmethod
    def send_message(self, recipient: str, message: str, metadata: Dict) -> bool:
        """Envia mensagem através do canal"""
        pass
    
    @abstractmethod
    def get_channel_name(self) -> str:
        """Retorna o nome do canal"""
        pass
    
    @abstractmethod
    def is_available(self) -> bool:
        """Verifica se o canal está disponível"""
        pass
    
    @abstractmethod
    def get_delivery_status(self) -> str:
        """Retorna o status da última entrega"""
        pass


# ---------- Concrete Implementors ----------
class EmailChannel(NotificationChannel):
    """Canal de notificação por Email"""
    
    def __init__(self) -> None:
        self._smtp_server = "smtp.unb.br"
        self._sender_email = "noreply@aquitemfcte.unb.br"
        self._is_connected = True
        self._last_status = "Pronto"
    
    def send_message(self, recipient: str, message: str, metadata: Dict) -> bool:
        if not self.is_available():
            self._last_status = "Falha: Serviço indisponível"
            return False
        
        # Simula envio de email
        print(f"📧 [EMAIL] Enviando para {recipient}")
        print(f"   De: {self._sender_email}")
        print(f"   Assunto: {metadata.get('subject', 'Notificação AquiTemFCTE')}")
        print(f"   Mensagem: {message}")
        
        # Simula delay de envio
        time.sleep(0.5)
        self._last_status = "Entregue com sucesso"
        return True
    
    def get_channel_name(self) -> str:
        return "Email"
    
    def is_available(self) -> bool:
        return self._is_connected
    
    def get_delivery_status(self) -> str:
        return self._last_status


class SmsChannel(NotificationChannel):
    """Canal de notificação por SMS"""
    
    def __init__(self) -> None:
        self._api_key = "SMS_API_KEY_123"
        self._phone_prefix = "+55"
        self._service_status = True
        self._last_status = "Pronto"
    
    def send_message(self, recipient: str, message: str, metadata: Dict) -> bool:
        if not self.is_available():
            self._last_status = "Falha: Serviço indisponível"
            return False
        
        if not self._validate_phone_number(recipient):
            self._last_status = "Falha: Número inválido"
            return False
        
        # Simula envio de SMS
        print(f"📱 [SMS] Enviando para {recipient}")
        print(f"   Mensagem: {message[:160]}...")  # SMS tem limite de caracteres
        
        time.sleep(0.3)
        self._last_status = "Entregue com sucesso"
        return True
    
    def _validate_phone_number(self, phone: str) -> bool:
        """Valida formato do número de telefone"""
        return len(phone) >= 10
    
    def get_channel_name(self) -> str:
        return "SMS"
    
    def is_available(self) -> bool:
        return self._service_status
    
    def get_delivery_status(self) -> str:
        return self._last_status


class PushChannel(NotificationChannel):
    """Canal de notificação Push (App Mobile)"""
    
    def __init__(self) -> None:
        self._app_id = "br.unb.aquitemfcte"
        self._notification_service = "FCM"  # Firebase Cloud Messaging
        self._device_tokens = {}  # Simulação de tokens de dispositivos
        self._last_status = "Pronto"
    
    def send_message(self, recipient: str, message: str, metadata: Dict) -> bool:
        if not self.is_available():
            self._last_status = "Falha: Serviço indisponível"
            return False
        
        # Simula envio de push notification
        print(f"🔔 [PUSH] Enviando notificação push")
        print(f"   Usuário: {recipient}")
        print(f"   Título: {metadata.get('title', 'AquiTemFCTE')}")
        print(f"   Mensagem: {message}")
        print(f"   Badge: {metadata.get('badge', 1)}")
        
        time.sleep(0.2)
        self._last_status = "Entregue com sucesso"
        return True
    
    def get_channel_name(self) -> str:
        return "Push Notification"
    
    def is_available(self) -> bool:
        return True  # Assume que o serviço push está sempre disponível
    
    def get_delivery_status(self) -> str:
        return self._last_status


# ---------- Abstraction ----------
class Notification:
    """Abstração para notificações do AquiTemFCTE"""
    
    def __init__(self, channel: NotificationChannel, recipient: str = "", message: str = "") -> None:
        self._channel = channel  # <-- PONTE: composição
        self._recipient = recipient
        self._message = message
        self._metadata: Dict = {}
    
    def set_channel(self, channel: NotificationChannel) -> None:
        """Troca o canal de notificação em tempo de execução"""
        self._channel = channel
        print(f"✓ Canal alterado para: {channel.get_channel_name()}")
    
    def set_recipient(self, recipient: str) -> None:
        """Define o destinatário"""
        self._recipient = recipient
    
    def set_message(self, message: str) -> None:
        """Define a mensagem"""
        self._message = message
    
    def add_metadata(self, key: str, value: any) -> None:
        """Adiciona metadados à notificação"""
        self._metadata[key] = value
    
    def send(self) -> bool:
        """Envia a notificação através do canal configurado"""
        if not self._recipient or not self._message:
            print("❌ Erro: Destinatário e mensagem são obrigatórios")
            return False
        
        print(f"\n{'='*60}")
        print(f"Enviando notificação via {self._channel.get_channel_name()}")
        print(f"{'='*60}")
        
        success = self._channel.send_message(self._recipient, self._message, self._metadata)
        
        if success:
            print(f"✓ Status: {self._channel.get_delivery_status()}")
        else:
            print(f"✗ Status: {self._channel.get_delivery_status()}")
        
        return success
    
    def get_status(self) -> str:
        """Retorna informações sobre a notificação"""
        return (f"Canal: {self._channel.get_channel_name()} | "
                f"Destinatário: {self._recipient or 'Não definido'} | "
                f"Mensagem: {'Configurada' if self._message else 'Não configurada'}")


# ---------- Refined Abstraction ----------
class UrgentNotification(Notification):
    """Notificação urgente com retry automático e priorização"""
    
    def __init__(self, channel: NotificationChannel, recipient: str = "", 
                 message: str = "", priority: int = 1) -> None:
        super().__init__(channel, recipient, message)
        self._priority = priority
        self._max_retries = 3
        self._retry_count = 0
        self.add_metadata("priority", "high")
        self.add_metadata("urgent", True)
    
    def mark_as_urgent(self) -> None:
        """Marca a notificação como urgente"""
        self._priority = max(self._priority, 5)
        self.add_metadata("priority", "critical")
        print(f"⚠️  Notificação marcada como URGENTE (prioridade {self._priority})")
    
    def send_with_retry(self) -> bool:
        """Envia com tentativas automáticas em caso de falha"""
        print(f"\n{'='*60}")
        print(f"🚨 NOTIFICAÇÃO URGENTE - Prioridade: {self._priority}")
        print(f"{'='*60}")
        
        self._retry_count = 0
        
        while self._retry_count < self._max_retries:
            if self._retry_count > 0:
                print(f"\n⟳ Tentativa {self._retry_count + 1}/{self._max_retries}")
                time.sleep(1)  # Aguarda antes de tentar novamente
            
            success = self.send()
            
            if success:
                print(f"✓ Notificação urgente entregue com sucesso!")
                return True
            
            self._retry_count += 1
        
        print(f"\n✗ Falha após {self._max_retries} tentativas")
        return False
    
    def get_priority(self) -> int:
        """Retorna o nível de prioridade"""
        return self._priority


# ---------- Tipos de Notificação Específicas ----------
class ProductNotification(Notification):
    """Notificação relacionada a produtos"""
    
    def __init__(self, channel: NotificationChannel, recipient: str = "") -> None:
        super().__init__(channel, recipient)
        self.add_metadata("type", "product")
        self.add_metadata("category", "marketplace")
    
    def notify_new_product(self, product_name: str, price: float) -> None:
        """Notifica sobre novo produto"""
        self.set_message(
            f"🆕 Novo produto disponível: {product_name}\n"
            f"💰 Preço: R$ {price:.2f}\n"
            f"Acesse AquiTemFCTE e confira!"
        )
        self.add_metadata("subject", f"Novo Produto: {product_name}")
        self.add_metadata("title", "Novo Produto!")


class TransactionNotification(Notification):
    """Notificação relacionada a transações"""
    
    def __init__(self, channel: NotificationChannel, recipient: str = "") -> None:
        super().__init__(channel, recipient)
        self.add_metadata("type", "transaction")
        self.add_metadata("category", "finance")
    
    def notify_purchase(self, product_name: str, amount: float) -> None:
        """Notifica sobre compra realizada"""
        self.set_message(
            f"✅ Compra confirmada!\n"
            f"Produto: {product_name}\n"
            f"Valor: R$ {amount:.2f}\n"
            f"Entre em contato com o vendedor para combinar a entrega."
        )
        self.add_metadata("subject", "Compra Confirmada - AquiTemFCTE")
        self.add_metadata("title", "Compra Confirmada")
        self.add_metadata("badge", 1)


# ---------- CLI ----------
HELP = """
Comandos disponíveis:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  help                           -> mostra esta ajuda
  status                         -> mostra status atual
  
  Configuração:
  set_recipient <email/telefone> -> define destinatário
  set_message <texto>            -> define mensagem
  
  Envio:
  send                           -> envia notificação
  send_retry                     -> (UrgentNotification) envia com retry
  mark_urgent                    -> (UrgentNotification) marca como urgente
  
  Canais:
  use <email|sms|push>           -> troca o canal de envio
  
  Tipos de Notificação:
  notification <basic|urgent|product|transaction>
                                 -> troca o tipo de notificação
  
  Exemplos Rápidos:
  quick_product                  -> exemplo de notificação de produto
  quick_transaction              -> exemplo de notificação de transação
  
  exit                           -> sai do programa
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
"""


def choose_channel(kind: str) -> NotificationChannel:
    """Escolhe o canal baseado no tipo"""
    k = kind.lower()
    if k == "email":
        return EmailChannel()
    if k == "sms":
        return SmsChannel()
    if k == "push":
        return PushChannel()
    raise ValueError("Canal inválido. Use: email | sms | push")


def cli() -> None:
    """Interface de linha de comando para demonstração do Bridge"""
    print("╔══════════════════════════════════════════════════════════╗")
    print("║          AquiTemFCTE - Sistema de Notificações          ║")
    print("║              Demonstração do Padrão Bridge              ║")
    print("╚══════════════════════════════════════════════════════════╝")
    print("\nDica: Digite 'help' para ver todos os comandos")
    print("Dica: Digite 'quick_product' para exemplo rápido\n")

    # Estado inicial
    current_channel = EmailChannel()
    notification: Notification = Notification(current_channel)

    while True:
        try:
            cmd = input("AquiTemFCTE> ").strip()
        except (EOFError, KeyboardInterrupt):
            print("\n\n👋 Encerrando sistema. Até logo!")
            return

        if not cmd:
            continue

        parts = cmd.split(maxsplit=1)
        op = parts[0].lower()

        try:
            if op == "help":
                print(HELP)

            elif op == "status":
                print(f"\n📊 Status Atual:")
                print(f"   Tipo: {notification.__class__.__name__}")
                print(f"   {notification.get_status()}")
                if isinstance(notification, UrgentNotification):
                    print(f"   Prioridade: {notification.get_priority()}")

            elif op == "set_recipient":
                if len(parts) < 2:
                    print("❌ Uso: set_recipient <email/telefone>")
                else:
                    notification.set_recipient(parts[1])
                    print(f"✓ Destinatário definido: {parts[1]}")

            elif op == "set_message":
                if len(parts) < 2:
                    print("❌ Uso: set_message <texto da mensagem>")
                else:
                    notification.set_message(parts[1])
                    print(f"✓ Mensagem definida")

            elif op == "send":
                notification.send()

            elif op == "send_retry":
                if isinstance(notification, UrgentNotification):
                    notification.send_with_retry()
                else:
                    print("❌ send_retry disponível apenas em UrgentNotification")
                    print("   Use: notification urgent")

            elif op == "mark_urgent":
                if isinstance(notification, UrgentNotification):
                    notification.mark_as_urgent()
                else:
                    print("❌ mark_urgent disponível apenas em UrgentNotification")
                    print("   Use: notification urgent")

            elif op == "use":
                if len(parts) < 2:
                    print("❌ Uso: use <email|sms|push>")
                else:
                    new_channel = choose_channel(parts[1])
                    notification.set_channel(new_channel)

            elif op == "notification":
                if len(parts) < 2:
                    print("❌ Uso: notification <basic|urgent|product|transaction>")
                else:
                    kind = parts[1].lower()
                    current_channel = notification._channel
                    recipient = notification._recipient
                    message = notification._message
                    
                    if kind == "basic":
                        notification = Notification(current_channel, recipient, message)
                        print("✓ Tipo alterado para: Notification (básica)")
                    
                    elif kind == "urgent":
                        notification = UrgentNotification(current_channel, recipient, message)
                        print("✓ Tipo alterado para: UrgentNotification")
                    
                    elif kind == "product":
                        notification = ProductNotification(current_channel, recipient)
                        print("✓ Tipo alterado para: ProductNotification")
                    
                    elif kind == "transaction":
                        notification = TransactionNotification(current_channel, recipient)
                        print("✓ Tipo alterado para: TransactionNotification")
                    
                    else:
                        print("❌ Tipo inválido. Use: basic|urgent|product|transaction")

            elif op == "quick_product":
                print("\n🎯 Exemplo: Notificação de Novo Produto")
                print("-" * 60)
                
                # Cria notificação de produto
                product_notif = ProductNotification(EmailChannel(), "estudante@unb.br")
                product_notif.notify_new_product("Livro de Cálculo 2", 45.00)
                product_notif.send()
                
                print("\n💡 Para reproduzir manualmente:")
                print("   notification product")
                print("   set_recipient estudante@unb.br")
                print("   use email")
                print("   send")

            elif op == "quick_transaction":
                print("\n🎯 Exemplo: Notificação de Transação")
                print("-" * 60)
                
                # Cria notificação de transação com retry
                trans_notif = TransactionNotification(SmsChannel(), "61999887766")
                trans_notif.notify_purchase("Cadeira de Escritório", 150.00)
                trans_notif.send()
                
                print("\n💡 Para reproduzir manualmente:")
                print("   notification transaction")
                print("   set_recipient 61999887766")
                print("   use sms")
                print("   send")

            elif op == "demo":
                print("\n🎬 Executando demonstração completa do padrão Bridge...")
                print("=" * 60)
                
                # Demo 1: Notificação básica por email
                print("\n1️⃣ Notificação Básica via Email")
                print("-" * 60)
                basic = Notification(EmailChannel(), "usuario@unb.br", 
                                    "Bem-vindo ao AquiTemFCTE!")
                basic.add_metadata("subject", "Bem-vindo!")
                basic.send()
                
                time.sleep(1)
                
                # Demo 2: Troca de canal em tempo de execução
                print("\n2️⃣ Trocando Canal para SMS (sem mudar notificação)")
                print("-" * 60)
                basic.set_channel(SmsChannel())
                basic.set_recipient("61988776655")
                basic.send()
                
                time.sleep(1)
                
                # Demo 3: Notificação urgente com retry
                print("\n3️⃣ Notificação Urgente com Retry via Push")
                print("-" * 60)
                urgent = UrgentNotification(PushChannel(), "usuario123", 
                                           "Seu produto foi vendido!", priority=3)
                urgent.mark_as_urgent()
                urgent.add_metadata("title", "Venda Confirmada!")
                urgent.send_with_retry()
                
                time.sleep(1)
                
                # Demo 4: Notificação de produto
                print("\n4️⃣ Notificação de Produto via Email")
                print("-" * 60)
                product = ProductNotification(EmailChannel(), "interessado@unb.br")
                product.notify_new_product("Calculadora Científica HP", 89.90)
                product.send()
                
                print("\n" + "=" * 60)
                print("✓ Demonstração completa!")
                print("=" * 60)

            elif op == "exit" or op == "quit":
                print("\n👋 Encerrando sistema. Até logo!")
                return

            else:
                print(f"❌ Comando não reconhecido: '{op}'")
                print("   Digite 'help' para ver os comandos disponíveis")

        except ValueError as e:
            print(f"❌ Erro: {e}")
        except Exception as e:
            print(f"❌ Erro inesperado: {e}")


# ---------- Entry Point ----------
if __name__ == "__main__":
    cli()