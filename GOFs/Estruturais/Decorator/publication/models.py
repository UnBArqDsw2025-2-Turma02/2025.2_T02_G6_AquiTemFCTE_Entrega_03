from django.db import models
from django.contrib.auth.models import User
from abc import ABC, abstractmethod

# classe Product apenas para testes aqui
class Product(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField(blank=True)

    def __str__(self):
        return self.name


class StatusEnum(models.TextChoices):
    PENDING = "PENDING", "Pendente"
    APPROVED = "APPROVED", "Aprovada"
    REJECTED = "REJECTED", "Rejeitada"


# INTERFACE
class PublicationInterface(ABC):
    @abstractmethod
    def get_owner(self):
        pass

    @abstractmethod
    def get_status(self):
        pass

    @abstractmethod
    def change_status(self, status):
        pass

    @abstractmethod
    def get_product(self):
        pass


class Publication(models.Model):
    owner = models.ForeignKey(User, on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    status = models.CharField(max_length=10, choices=StatusEnum.choices, default=StatusEnum.PENDING)

    def get_owner(self):
        return self.owner

    def get_status(self):
        return self.status

    def change_status(self, status):
        self.status = status
        self.save()

    def get_product(self):
        return self.product

    def __str__(self):
        return f"{self.product.name} ({self.status})"


# DECORATOR
class PublicationDecorator(PublicationInterface):
    def __init__(self, publication: PublicationInterface):
        self._publication = publication

    def get_owner(self):
        return self._publication.get_owner()

    def get_status(self):
        return self._publication.get_status()

    def change_status(self, status):
        self._publication.change_status(status)

    def get_product(self):
        return self._publication.get_product()

    def approve(self):
        pass


class VerifiedPublicationDecorator(PublicationDecorator):
    def __init__(self, publication: PublicationInterface):
        super().__init__(publication)
        self.is_approved: bool = self._publication.get_status() == StatusEnum.APPROVED

    def get_product(self):
        if self._publication.get_status() != StatusEnum.APPROVED:
            raise PermissionError("Esta publicação ainda não foi aprovada.")
        return self._publication.get_product()

    def approve(self):
        self._publication.change_status(StatusEnum.APPROVED)
        self.is_approved = True
