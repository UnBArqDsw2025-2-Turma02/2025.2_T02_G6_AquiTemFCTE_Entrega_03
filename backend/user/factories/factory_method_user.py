from abc import ABC, abstractmethod
from user.models import Admin, Student


class UserCreator(ABC):
    
    @abstractmethod
    def create_user(self):
        pass


class StudentCreator(UserCreator):
    def create_user(self, name, email, phone, password, enrollment, enrollment_proof, bio=None, profile_photo_url="default"):
        student = Student.objects.create(
            name=name,
            email=email,
            phone=phone,
            password=password, # colocar hash depois pra salvar no db
            enrollment=enrollment,
            enrollment_proof=enrollment_proof,
            bio=bio,
            profile_photo_url=profile_photo_url
        )

        return student

class AdminCreator(UserCreator):
    def create_user(self, name, email, phone, password, profile_photo_url="default"):
        admin = Admin.objects.create(
            name=name,
            email=email,
            phone=phone,
            password=password,
            profile_photo_url=profile_photo_url
        )

        return admin
