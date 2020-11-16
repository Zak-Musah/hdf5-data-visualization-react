#!/bin/bash

docker-compose down

export REACT_APP_BACKEND_SERVICE_URL=http://localhost

docker-compose up -d --build

>&2 echo "Waiting for application to run. Please wait....."
sleep 20
>&2 echo "Application started :)"


docker-compose exec backend python manage.py test
>&2 echo "Backend api tests done..."

docker-compose exec frontend npm test -u
>&2 echo "Frontend tests done..."

>&2 echo "IRUBIS ANALYTICS DASHBOARD is now ready at http://localhost"
sleep 10
exit 0