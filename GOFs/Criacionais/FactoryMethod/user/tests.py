from django.db import IntegrityError
from django.forms import ValidationError
from django.test import TestCase
from user.factories.factory_method_user import StudentCreator, AdminCreator, UserCreator
from user.models import Student, Admin


class TestFactoryMethod(TestCase):
    def setUp(self):
        self.student_creator = StudentCreator()
        self.admin_creator = AdminCreator()

    def test_student_creator_creates_student(self):
        student = self.student_creator.create_user(
            name="Ludmila",
            email="ludmila@example.com",
            phone="61999999999",
            password="senha123",
            enrollment="231022384",
            enrollment_proof="comprovante.pdf",
            bio="Estudante de Engenharia de Software",
        )
        self.assertIsInstance(student, Student)
        self.assertEqual(student.name, "Ludmila")
        self.assertEqual(student.email, "ludmila@example.com")

    def test_admin_creator_creates_admin(self):
        admin = self.admin_creator.create_user(
            name="Lucas",
            email="lucas@example.com",
            phone="61888888888",
            password="senha123",
        )
        self.assertIsInstance(admin, Admin)
        self.assertEqual(admin.name, "Lucas")
        self.assertEqual(admin.email, "lucas@example.com")
    
    def test_cannot_instantiate_usercreator(self):
        with self.assertRaises(TypeError):
            UserCreator()

class BlankFieldsValidation(TestCase):
    def setUp(self):
        self.student_creator = StudentCreator()
        self.admin_creator = AdminCreator()

    def test_student_creator_requires_name(self):
        with self.assertRaises((IntegrityError, ValidationError)):
            self.student_creator.create_user(
                name=None,
                email="teste@example.com",
                phone="61888888888",
                password="123",
                enrollment="231022384",
                enrollment_proof="pdf"
            )

    def test_student_creator_requires_email(self):
        with self.assertRaises((IntegrityError, ValidationError)):
            self.student_creator.create_user(
                name="Maria",
                email=None,
                phone="61888888888",
                password="123",
                enrollment="231022384",
                enrollment_proof="pdf"
            )

    def test_student_creator_requires_phone(self):
        with self.assertRaises((IntegrityError, ValidationError)):
            self.student_creator.create_user(
                name="Maria",
                email="maria@gmail.com",
                phone=None,
                password="123",
                enrollment="231022384",
                enrollment_proof="pdf"
            )

    def test_student_creator_requires_password(self):
        with self.assertRaises((IntegrityError, ValidationError)):
            self.student_creator.create_user(
                name="Maria",
                email="maria@gmail.com",
                phone="61888888888",
                password=None,
                enrollment="231022384",
                enrollment_proof="pdf"
            )

    def test_student_creator_requires_enrollment(self):
        with self.assertRaises((IntegrityError, ValidationError)):
            self.student_creator.create_user(
                name="Maria",
                email="maria@gmail.com",
                phone="61888888888",
                password="123",
                enrollment=None,
                enrollment_proof="pdf"
            )

    def test_student_creator_requires_enrollment_proof(self):
        with self.assertRaises((IntegrityError, ValidationError)):
            self.student_creator.create_user(
                name="Maria",
                email="maria@gmail.com",
                phone="61888888888",
                password="123",
                enrollment="231022384",
                enrollment_proof=None
            )

    def test_admin_creator_requires_name(self):
        with self.assertRaises((IntegrityError, ValidationError)):
            self.admin_creator.create_user(
                name=None,
                email="teste@example.com",
                phone="61888888888",
                password="123"
            )

    def test_admin_creator_requires_email(self):
        with self.assertRaises((IntegrityError, ValidationError)):
            self.admin_creator.create_user(
                name="Maria",
                email=None,
                phone="61888888888",
                password="123"
            )

    def test_admin_creator_requires_phone(self):
        with self.assertRaises((IntegrityError, ValidationError)):
            self.admin_creator.create_user(
                name="Maria",
                email="maria@gmail.com",
                phone=None,
                password="123"
            )

    def test_admin_creator_requires_password(self):
        with self.assertRaises((IntegrityError, ValidationError)):
            self.admin_creator.create_user(
                name="Maria",
                email="maria@gmail.com",
                phone="61888888888",
                password=None
            )

class TestPhoneValidation(TestCase):
    def setUp(self):
        self.student_creator = StudentCreator()
        self.admin_creator = AdminCreator()

    def test_student_phone_too_short_raises_error(self):
        student = self.student_creator.create_user(
            name="Ana",
            email="ana@example.com",
            phone="618888999",
            password="123",
            enrollment="231026755",
            enrollment_proof="pdf"
        )
        with self.assertRaises(ValidationError):
            student.full_clean()

    def test_student_phone_too_long_raises_error(self):
        student = self.student_creator.create_user(
            name="Bruno",
            email="bruno@example.com",
            phone="619888899990",
            password="123",
            enrollment="231026756",
            enrollment_proof="pdf"
        )
        with self.assertRaises(ValidationError):
            student.full_clean()

    def test_student_phone_with_letters_raises_error(self):
        student = self.student_creator.create_user(
            name="Carla",
            email="carla@example.com",
            phone="61999abc999",
            password="123",
            enrollment="231026757",
            enrollment_proof="pdf"
        )
        with self.assertRaises(ValidationError):
            student.full_clean()

    def test_admin_phone_too_short_raises_error(self):
        admin = self.admin_creator.create_user(
            name="Ana",
            email="ana@example.com",
            phone="618888999",
            password="123"
        )
        with self.assertRaises(ValidationError):
            admin.full_clean()

    def test_admin_phone_too_long_raises_error(self):
        admin = self.admin_creator.create_user(
            name="Bruno",
            email="bruno@example.com",
            phone="619888899990",
            password="123"
        )
        with self.assertRaises(ValidationError):
            admin.full_clean()

    def test_admin_phone_with_letters_raises_error(self):
        admin = self.admin_creator.create_user(
            name="Carla",
            email="carla@example.com",
            phone="61999abc999",
            password="123"
        )
        with self.assertRaises(ValidationError):
            admin.full_clean()


