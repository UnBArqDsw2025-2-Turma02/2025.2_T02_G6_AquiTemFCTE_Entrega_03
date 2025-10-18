# Protótipo do Padrão Multiton para Microsserviços
# Demonstração Acadêmica

class ResourceManagerMultiton:
    _resource_managers = {}

    def __new__(cls, resource_type):
        if resource_type not in cls._resource_managers:
            instance = super().__new__(cls)
            instance.resource_type = resource_type
            instance.resources = []
            instance.config = {}
            cls._resource_managers[resource_type] = instance
            print(f"✓ Nova instância criada para: {resource_type}")
        else:
            print(f"⟳ Retornando instância existente de: {resource_type}")
        return cls._resource_managers[resource_type]

    def add_resource(self, resource):
        """Adiciona um recurso ao gerenciador"""
        self.resources.append(resource)
        print(f"  → Recurso '{resource.name}' adicionado a {self.resource_type}")

    def get_resources(self):
        """Retorna todos os recursos gerenciados"""
        return self.resources

    def set_config(self, key, value):
        """Define uma configuração"""
        self.config[key] = value
        print(f"  → Config '{key}' = '{value}' definida para {self.resource_type}")

    def get_config(self, key):
        """Obtém uma configuração"""
        return self.config.get(key)
    
    def show_status(self):
        """Exibe o status completo do gerenciador"""
        print(f"\n{'='*60}")
        print(f"STATUS: {self.resource_type}")
        print(f"{'='*60}")
        print(f"Configurações:")
        for key, value in self.config.items():
            print(f"  • {key}: {value}")
        print(f"\nRecursos gerenciados ({len(self.resources)}):")
        for i, resource in enumerate(self.resources, 1):
            print(f"  {i}. {resource.name}")
            print(f"     Status: {resource.status}")
            print(f"     Config: {resource.config_data}")
        print(f"{'='*60}\n")


class Resource:
    """
    Representa um recurso específico gerenciado pelo Multiton
    """
    def __init__(self, name, config_data):
        self.name = name
        self.config_data = config_data
        self.status = "active"
    
    def __repr__(self):
        return f"Resource(name='{self.name}', status='{self.status}')"


def demonstracao_basica():
    print("\n" + "="*60)
    print("DEMONSTRAÇÃO 1: Conceito Básico do Multiton")
    print("="*60 + "\n")
    
    print("1. Criando gerenciador de Database Connection...")
    db_manager = ResourceManagerMultiton("DatabaseConnection")
    db_manager.set_config("host", "localhost")
    db_manager.set_config("port", 5432)
    db_manager.add_resource(Resource("UserDB", {"schema": "users", "pool_size": 10}))
    db_manager.add_resource(Resource("ProductDB", {"schema": "products", "pool_size": 5}))
    
    print("\n2. Criando gerenciador de Cache...")
    cache_manager = ResourceManagerMultiton("CacheManager")
    cache_manager.set_config("type", "Redis")
    cache_manager.set_config("ttl", 3600)
    cache_manager.add_resource(Resource("UserCache", {"size": "1GB", "strategy": "LRU"}))
    
    print("\n3. Tentando criar outro gerenciador de Database Connection...")
    db_manager2 = ResourceManagerMultiton("DatabaseConnection")
    
    print("\n4. Verificando se são a mesma instância...")
    print(f"   db_manager is db_manager2: {db_manager is db_manager2}")
    print(f"   ID de db_manager: {id(db_manager)}")
    print(f"   ID de db_manager2: {id(db_manager2)}")
    
    # Mostrando status
    db_manager.show_status()
    cache_manager.show_status()


def demonstracao_microsservicos():
    print("\n" + "="*60)
    print("DEMONSTRAÇÃO 2: Simulação de Microsserviços")
    print("="*60 + "\n")
    
    print("=== Microsserviço A: Sistema de Usuários ===\n")
    
    # Microsserviço A precisa de DB e Cache
    print("Microsserviço A requisitando Database...")
    ms_a_db = ResourceManagerMultiton("DatabaseConnection")
    ms_a_db.add_resource(Resource("UsersDB", {"connection": "pool_1"}))
    
    print("\nMicrosserviço A requisitando Cache...")
    ms_a_cache = ResourceManagerMultiton("CacheManager")
    ms_a_cache.add_resource(Resource("SessionCache", {"ttl": 1800}))
    
    print("\n=== Microsserviço B: Sistema de Produtos ===\n")
    
    # Microsserviço B também precisa de DB (receberá a mesma instância)
    print("Microsserviço B requisitando Database...")
    ms_b_db = ResourceManagerMultiton("DatabaseConnection")
    ms_b_db.add_resource(Resource("ProductsDB", {"connection": "pool_2"}))
    
    print("\nMicrosserviço B requisitando Message Queue...")
    ms_b_queue = ResourceManagerMultiton("MessageQueue")
    ms_b_queue.set_config("broker", "RabbitMQ")
    ms_b_queue.set_config("port", 5672)
    ms_b_queue.add_resource(Resource("ProductQueue", {"exchange": "products"}))
    
    # Verificações
    print("\n" + "-"*60)
    print("VERIFICAÇÕES DE COMPARTILHAMENTO:")
    print("-"*60)
    print(f"Database compartilhado entre microsserviços: {ms_a_db is ms_b_db}")
    print(f"Total de recursos no Database: {len(ms_a_db.get_resources())}")
    print(f"Cache é exclusivo do Microsserviço A: {ms_a_cache not in [ms_b_db, ms_b_queue]}")
    print(f"Queue é exclusivo do Microsserviço B: True")
    
    # Status final
    ms_a_db.show_status()
    ms_a_cache.show_status()
    ms_b_queue.show_status()


def demonstracao_avancada():
    """Demonstração avançada com múltiplos tipos de recursos"""
    print("\n" + "="*60)
    print("DEMONSTRAÇÃO 3: Cenário Avançado")
    print("="*60 + "\n")
    
    tipos_recursos = [
        "DatabaseConnection",
        "CacheManager",
        "MessageQueue",
        "LoggingService",
        "MetricsCollector"
    ]
    
    print("Criando múltiplos tipos de gerenciadores...\n")
    gerenciadores = {}
    
    for tipo in tipos_recursos:
        gerenciadores[tipo] = ResourceManagerMultiton(tipo)
    
    # Configurando cada tipo
    print("\nConfigurando gerenciadores...\n")
    gerenciadores["DatabaseConnection"].set_config("pool_size", 20)
    gerenciadores["CacheManager"].set_config("max_memory", "2GB")
    gerenciadores["MessageQueue"].set_config("max_retries", 3)
    gerenciadores["LoggingService"].set_config("level", "INFO")
    gerenciadores["MetricsCollector"].set_config("interval", 60)
    
    # Verificando total de instâncias únicas
    print("\n" + "-"*60)
    print(f"Total de instâncias únicas criadas: {len(ResourceManagerMultiton._resource_managers)}")
    print("Tipos de recursos disponíveis:")
    for tipo in ResourceManagerMultiton._resource_managers.keys():
        print(f"  • {tipo}")
    print("-"*60)


def limpar_terminal():
    """Limpa o terminal de forma compatível com diferentes sistemas operacionais"""
    import os
    os.system('cls' if os.name == 'nt' else 'clear')


def menu_interativo():
    """Menu interativo para explorar o sistema"""
    while True:
        limpar_terminal()
        print("\n" + "="*60)
        print("MENU INTERATIVO - Sistema Multiton")
        print("="*60)
        print("1. Demonstração Básica")
        print("2. Demonstração de Microsserviços")
        print("3. Demonstração Avançada")
        print("4. Executar todas as demonstrações")
        print("5. Limpar instâncias e reiniciar")
        print("0. Sair")
        print("="*60)
        
        escolha = input("\nEscolha uma opção: ").strip()
        limpar_terminal()
        
        if escolha == "1":
            demonstracao_basica()
        elif escolha == "2":
            demonstracao_microsservicos()
        elif escolha == "3":
            demonstracao_avancada()
        elif escolha == "4":
            demonstracao_basica()
            demonstracao_microsservicos()
            demonstracao_avancada()
        elif escolha == "5":
            ResourceManagerMultiton._resource_managers.clear()
            print("\n✓ Todas as instâncias foram limpas!")
        elif escolha == "0":
            print("\nEncerrando demonstração. Até logo!")
            break
        else:
            print("\n✗ Opção inválida! Tente novamente.")
        
        input("\nPressione ENTER para continuar...")


if __name__ == "__main__":
    print("\n" + "="*60)
    print("PROTÓTIPO MULTITON - Sistema de Microsserviços")
    print("Demonstração Acadêmica")
    print("="*60)
    
    menu_interativo()