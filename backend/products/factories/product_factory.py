from products.models import Product, ProductImage
from django.core.files import File


class ProductFactory:
    """
    Factory Method responsável pela criação de produtos
    """
    
    @staticmethod
    def create_product(name, price, description, category, sale_method, status, image_files=None):
        product = Product.objects.create(
            name=name,
            price=price,
            description=description,
            category=category,
            sale_method=sale_method,
            status=status
        )
        product._from_factory = True
        product.save()
        
        if image_files:
            if len(image_files) > 5:
                raise ValueError("Limite de imagens por produto é 5.")
            
            for image_file in image_files:
                ProductImage.objects.create(product=product, image=image_file)
        
        return product