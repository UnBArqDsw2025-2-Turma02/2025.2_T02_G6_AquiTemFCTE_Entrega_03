from django.db import models

# Create your models here.

class User(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField(max_length=100)
    phone = models.CharField(max_length=11)
    password = models.CharField(max_length=50)
    profile_photo_url = models.URLField(max_length=500, null=True, blank=True)


    class Meta:
        abstract = True
    

    def get_name(self):
        return self.name
    
    def set_name(self, name):
        self.name = name
    
    def get_email(self):
        return self.email
    
    # def set_email(self, email):
    #     self.email = email
    
    def get_phone(self):
        return self.phone
    
    def set_phone(self, phone):
        self.phone = phone

    def get_profile_photo_url(self):
        if self.profile_photo_url:
            return self.profile_photo_url
        return "colocar url de uma imagem padrao"
    
    def update_profile_photo_url(self, profile_photo_url):
        self.profile_photo_url = profile_photo_url
    
    def set_password(self, password):
        self.password = password
    
    def remove_profile_photo(self):
        if self.profile_photo_url != "colocar url de uma imagem padrao":
            self.profile_photo_url = "colocar url de uma imagem padrao"


class Student(User):
    enrollment = models.CharField(max_length=9)
    enrollment_proof = models.URLField(max_length=500)
    bio = models.TextField(null=True, blank=True)
    # published_products = vai ser criado na parte de publicação

    def get_enrollment(self):
        return self.enrollment
    
    def get_enrollment_proof(self):
        return self.enrollment
    
    def get_bio(self):
        return self.bio
    
    def set_bio(self, bio):
        self.bio = bio
    
    def get_published_products(self):
        # return self.published_products.all() 
        ...
    
    # def delete_publication(self, publication: Publication)
    # ver depois como vai implementar isso

    # def evaluate()
    # ver depois como vai implementar isso tambem

class Admin(User):
    
    def delete_product(self):
        pass

    def delete_student(self):
        pass

    def delete_publication(self):
        pass