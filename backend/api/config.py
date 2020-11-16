class BaseConfig:
    """Base configuration"""
    TESTING = False

class TestingConfig(BaseConfig):
    """Testing configuration"""
    TESTING = True

class DevelopmentConfig(BaseConfig):
    """Development configuration"""
    pass

class ProductionConfig(BaseConfig):
    """Production configuration"""
    pass