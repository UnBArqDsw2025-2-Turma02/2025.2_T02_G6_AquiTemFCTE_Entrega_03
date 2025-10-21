from django.test import TestCase
from django.contrib.auth.models import User
from .models import Product, Publication, StatusEnum, PublicationDecorator, VerifiedPublicationDecorator


class StatusEnumTestCase(TestCase):
    def test_status_enum_values(self):
        self.assertEqual(StatusEnum.PENDING, "PENDING")
        self.assertEqual(StatusEnum.APPROVED, "APPROVED")
        self.assertEqual(StatusEnum.REJECTED, "REJECTED")

    def test_status_enum_choices(self):
        choices = StatusEnum.choices
        self.assertEqual(len(choices), 3)


class PublicationModelTestCase(TestCase):
    @classmethod
    def setUpTestData(cls):
        cls.user = User.objects.create_user(username="testuser", password="testpass123")
        cls.product = Product.objects.create(name="Produto Teste", description="Descrição")

    def test_default_status_is_pending(self):
        publication = Publication.objects.create(owner=self.user, product=self.product)
        self.assertEqual(publication.status, StatusEnum.PENDING)

    def test_change_status(self):
        publication = Publication.objects.create(owner=self.user, product=self.product)
        publication.change_status(StatusEnum.APPROVED)
        publication.refresh_from_db()
        self.assertEqual(publication.status, StatusEnum.APPROVED)

    def test_get_methods(self):
        publication = Publication.objects.create(owner=self.user, product=self.product)
        self.assertEqual(publication.get_owner(), self.user)
        self.assertEqual(publication.get_status(), StatusEnum.PENDING)
        self.assertEqual(publication.get_product(), self.product)


class DecoratorPatternTestCase(TestCase):
    @classmethod
    def setUpTestData(cls):
        cls.user = User.objects.create_user(username="testuser", password="testpass123")
        cls.product = Product.objects.create(name="Produto Teste", description="Descrição")
    
    def setUp(self):
        self.publication = Publication.objects.create(owner=self.user, product=self.product)

    def test_decorator_wraps_publication(self):
        decorator = PublicationDecorator(self.publication)
        self.assertEqual(decorator._publication, self.publication)

    def test_decorator_delegates_methods(self):
        decorator = PublicationDecorator(self.publication)
        self.assertEqual(decorator.get_owner(), self.publication.get_owner())
        self.assertEqual(decorator.get_status(), self.publication.get_status())
        self.assertEqual(decorator.get_product(), self.publication.get_product())

    def test_decorator_change_status(self):
        decorator = PublicationDecorator(self.publication)
        decorator.change_status(StatusEnum.APPROVED)
        self.publication.refresh_from_db()
        self.assertEqual(self.publication.status, StatusEnum.APPROVED)


class VerifiedPublicationDecoratorTestCase(TestCase):
    @classmethod
    def setUpTestData(cls):
        cls.user = User.objects.create_user(username="testuser", password="testpass123")
        cls.product = Product.objects.create(name="Produto Teste", description="Descrição")
    
    def setUp(self):
        self.publication = Publication.objects.create(owner=self.user, product=self.product)

    def test_blocks_pending_publication(self):
        decorator = VerifiedPublicationDecorator(self.publication)
        with self.assertRaises(PermissionError):
            decorator.get_product()

    def test_blocks_rejected_publication(self):
        self.publication.change_status(StatusEnum.REJECTED)
        decorator = VerifiedPublicationDecorator(self.publication)
        with self.assertRaises(PermissionError):
            decorator.get_product()

    def test_allows_approved_publication(self):
        self.publication.change_status(StatusEnum.APPROVED)
        decorator = VerifiedPublicationDecorator(self.publication)
        product = decorator.get_product()
        self.assertEqual(product, self.product)

    def test_approve_method(self):
        decorator = VerifiedPublicationDecorator(self.publication)
        decorator.approve()
        self.publication.refresh_from_db()
        self.assertEqual(self.publication.status, StatusEnum.APPROVED)

    def test_decorator_extends_behavior(self):
        # Publicação original sempre funciona
        self.assertEqual(self.publication.get_product(), self.product)
        
        # Decorator adiciona verificação
        decorator = VerifiedPublicationDecorator(self.publication)
        with self.assertRaises(PermissionError):
            decorator.get_product()

    def test_maintains_other_methods(self):
        decorator = VerifiedPublicationDecorator(self.publication)
        self.assertEqual(decorator.get_owner(), self.user)
        self.assertEqual(decorator.get_status(), StatusEnum.PENDING)