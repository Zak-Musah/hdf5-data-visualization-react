from flask_testing import TestCase
from api import app


class BaseTestCase(TestCase):
    def create_app(self):
        app.config.from_object("api.config.TestingConfig")
        return app