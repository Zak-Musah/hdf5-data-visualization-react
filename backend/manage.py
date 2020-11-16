import sys
import unittest
import coverage
from flask.cli import FlaskGroup
from api import app

COV = coverage.coverage(
    branch=True,
    include='api/*',
    omit=[
        'api/tests/*',
        'api/config.py',
    ]
)
COV.start()

cli = FlaskGroup(app)

@cli.command()
def cov():
    """Runs the unit tests with coverage."""
    tests = unittest.TestLoader().discover('api/tests')
    result = unittest.TextTestRunner(verbosity=2).run(tests)
    if result.wasSuccessful():
        COV.stop()
        COV.save()
        print('Coverage Summary:')
        COV.report()
        COV.html_report()
        COV.erase()
        return 0
    sys.exit(result)

@cli.command()
def test():
    """Runs the tests without code coverage."""
    tests = unittest.TestLoader().discover('api/tests', pattern='test*.py')
    result = unittest.TextTestRunner(verbosity=2).run(tests)
    if result.wasSuccessful():
        return 0
    sys.exit(result)


if __name__== '__main__':
    cli()
