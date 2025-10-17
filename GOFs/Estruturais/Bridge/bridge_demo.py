# bridge_example.py
from __future__ import annotations
from abc import ABC, abstractmethod

# ---------- Implementor ----------
class Device(ABC):
    @abstractmethod
    def power_on(self) -> bool: ...
    @abstractmethod
    def power_off(self) -> bool: ...
    @abstractmethod
    def is_on(self) -> bool: ...
    @abstractmethod
    def get_volume(self) -> int: ...
    @abstractmethod
    def set_volume(self, v: int) -> None: ...
    @abstractmethod
    def get_channel(self) -> int: ...
    @abstractmethod
    def set_channel(self, c: int) -> None: ...
    @abstractmethod
    def name(self) -> str: ...

# ---------- Concrete Implementors ----------
class TvDevice(Device):
    def __init__(self) -> None:
        self._on = False
        self._volume = 10
        self._channel = 1

    def power_on(self) -> bool:
        self._on = True
        return self._on

    def power_off(self) -> bool:
        self._on = False
        return self._on

    def is_on(self) -> bool:
        return self._on

    def get_volume(self) -> int:
        return self._volume

    def set_volume(self, v: int) -> None:
        self._volume = max(0, min(100, v))

    def get_channel(self) -> int:
        return self._channel

    def set_channel(self, c: int) -> None:
        self._channel = max(1, c)

    def name(self) -> str:
        return "TV"

class RadioDevice(Device):
    def __init__(self) -> None:
        self._on = False
        self._volume = 5
        self._channel = 88  # estação FM simulada

    def power_on(self) -> bool:
        self._on = True
        return self._on

    def power_off(self) -> bool:
        self._on = False
        return self._on

    def is_on(self) -> bool:
        return self._on

    def get_volume(self) -> int:
        return self._volume

    def set_volume(self, v: int) -> None:
        self._volume = max(0, min(100, v))

    def get_channel(self) -> int:
        return self._channel

    def set_channel(self, c: int) -> None:
        self._channel = max(1, c)

    def name(self) -> str:
        return "Radio"

class SmartLightDevice(Device):
    """
    Exemplo extra de implementor:
    - volume -> brilho (0-100)
    - channel -> cena/mode numérico (1..N)
    """
    def __init__(self) -> None:
        self._on = False
        self._brightness = 50
        self._mode = 1

    def power_on(self) -> bool:
        self._on = True
        return self._on

    def power_off(self) -> bool:
        self._on = False
        return self._on

    def is_on(self) -> bool:
        return self._on

    def get_volume(self) -> int:
        return self._brightness

    def set_volume(self, v: int) -> None:
        self._brightness = max(0, min(100, v))

    def get_channel(self) -> int:
        return self._mode

    def set_channel(self, c: int) -> None:
        self._mode = max(1, c)

    def name(self) -> str:
        return "SmartLight"

# ---------- Abstraction ----------
class Remote:
    def __init__(self, device: Device) -> None:
        self._device = device  # <-- PONTE: composição
    def set_device(self, device: Device) -> None:
        self._device = device

    def toggle_power(self) -> None:
        if self._device.is_on():
            self._device.power_off()
        else:
            self._device.power_on()

    def volume_up(self) -> None:
        self._device.set_volume(self._device.get_volume() + 1)

    def volume_down(self) -> None:
        self._device.set_volume(self._device.get_volume() - 1)

    def channel_up(self) -> None:
        self._device.set_channel(self._device.get_channel() + 1)

    def channel_down(self) -> None:
        self._device.set_channel(self._device.get_channel() - 1)

    def status(self) -> str:
        state = "ON" if self._device.is_on() else "OFF"
        return (f"[{self._device.name()}] "
                f"Power={state} | Vol={self._device.get_volume()} | Ch={self._device.get_channel()}")

# ---------- Refined Abstraction ----------
class AdvancedRemote(Remote):
    def mute(self) -> None:
        self._device.set_volume(0)
    def set_channel_to(self, c: int) -> None:
        self._device.set_channel(c)

# ---------- Simple CLI ----------
HELP = """
Comandos:
  help                -> mostra esta ajuda
  status              -> mostra status atual
  power               -> liga/desliga
  vol+ / vol-         -> volume/brilho +1 ou -1
  ch+  / ch-          -> canal/estação/mode +1 ou -1
  setch <n>           -> (AdvancedRemote) define canal/estação/mode para <n>
  mute                -> (AdvancedRemote) volume/brilho = 0
  use <tv|radio|light>-> troca o device em tempo de execução
  remote <basic|adv>  -> troca o tipo de controle (Abstração)
  exit                -> sai
"""

def choose_device(kind: str) -> Device:
    k = kind.lower()
    if k == "tv":
        return TvDevice()
    if k == "radio":
        return RadioDevice()
    if k == "light":
        return SmartLightDevice()
    raise ValueError("device inválido. use: tv | radio | light")

def cli() -> None:
    print("Bridge demo (Remote ↔ Device).")
    print("Dica: 'use tv', 'use radio' ou 'use light' para trocar o implementor.")
    print(HELP)

    # Estado inicial
    current_device = TvDevice()
    remote: Remote = Remote(current_device)

    while True:
        try:
            cmd = input("> ").strip()
        except (EOFError, KeyboardInterrupt):
            print("\nSaindo.")
            return

        if not cmd:
            continue

        parts = cmd.split()
        op = parts[0].lower()

        try:
            if op == "help":
                print(HELP)

            elif op == "status":
                print(remote.status())

            elif op == "power":
                remote.toggle_power()
                print(remote.status())

            elif op == "vol+":
                remote.volume_up()
                print(remote.status())

            elif op == "vol-":
                remote.volume_down()
                print(remote.status())

            elif op == "ch+":
                remote.channel_up()
                print(remote.status())

            elif op == "ch-":
                remote.channel_down()
                print(remote.status())

            elif op == "setch":
                if len(parts) < 2 or not parts[1].isdigit():
                    print("uso: setch <numero>")
                else:
                    if isinstance(remote, AdvancedRemote):
                        remote.set_channel_to(int(parts[1]))
                        print(remote.status())
                    else:
                        print("setch disponível apenas no AdvancedRemote. use: remote adv")


            elif op == "mute":
                if isinstance(remote, AdvancedRemote):
                    remote.mute()
                    print(remote.status())
                else:
                    print("mute disponível apenas no AdvancedRemote. use: remote adv")

            elif op == "use":
                if len(parts) < 2:
                    print("uso: use <tv|radio|light>")
                else:
                    new_dev = choose_device(parts[1])
                    remote.set_device(new_dev)
                    print(f"Implementação trocada para {new_dev.name()}.")
                    print(remote.status())

            elif op == "remote":
                if len(parts) < 2:
                    print("uso: remote <basic|adv>")
                else:
                    kind = parts[1].lower()
                    if kind == "basic" and isinstance(remote, AdvancedRemote):
                        # mantém o device atual ao trocar a abstração
                        remote = Remote(remote._device)  # type: ignore[attr-defined]
                        print("Abstração trocada para Remote (básico).")
                    elif kind == "adv" and not isinstance(remote, AdvancedRemote):
                        remote = AdvancedRemote(remote._device)  # type: ignore[attr-defined]
                        print("Abstração trocada para AdvancedRemote.")
                    else:
                        print("já está nesse tipo de remote.")
                    print(remote.status())

            elif op == "exit":
                print("Saindo.")
                return

            else:
                print("comando não reconhecido. digite 'help'.")

        except Exception as e:
            print(f"erro: {e}")

# ---------- Entry ----------
if __name__ == "__main__":
    cli()
