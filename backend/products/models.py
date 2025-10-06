from django.db import models

# Create your models here.

class CategoryEnum(models.TextChoices):
    ELETRONIC_DEVICE = "eletronic_device", "Aparelho Eletrônico"
    BOOK = "book", "Livro"
    CLOTHING = "clothing", "Roupa"
    FURNITURE = "furniture", "Móvel Doméstico"
    OTHER = "other", "Outro"
    

class SaleMethodEnum(models.TextChoices):
    SALE = "sale", "Venda"
    EXCHANGE = "exchange", "Troca"
    SALE_EXCHANGE = "sale_exchange", "Venda e Troca"


class StatusEnum(models.TextChoices):
    NEW = "new", "Novo"
    USED = "used", "Usado"


class Product(models.Model):
    id_product = models.AutoField(primary_key=True)
    name = models.CharField(max_length=100)
    price = models.DecimalField(max_digits=8, decimal_places=2)
    description = models.CharField(max_length=500)
    category = models.CharField(choices=CategoryEnum.choices, default=CategoryEnum.OTHER, max_length=18)
    sale_method = models.CharField(choices=SaleMethodEnum.choices, default=SaleMethodEnum.SALE, max_length=15)
    status = models.CharField(choices=StatusEnum.choices, default=StatusEnum.USED, max_length=4)
    
    def update_data(self, name, price, description, category, sale_method, status):
        pass
    
    def add_image(self, image_file, alt_text):
        pass
    
    def delete_image(self, id_image):
        pass
    

class ProductImage(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name="images")
    image = models.ImageField(upload_to="products/")
    alt_text = models.CharField(max_length=150, blank=True)
