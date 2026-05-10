# Commandes Docker pour la conteneurisation

## 1. Frontend Angular

Depuis le dossier frontend `eco-ressource-b2b-main` :

```bash
docker build -f deployment/docker/frontend.Dockerfile -t <dockerhub_user>/eco-frontend:v1 .
```

Test local :

```bash
docker run --rm --name eco-frontend -p 8080:80 <dockerhub_user>/eco-frontend:v1
```

Ouvrir :

```text
http://localhost:8080
```

## 2. Backend Spring Boot

Depuis le dossier frontend `eco-ressource-b2b-main`, avec le backend dans `../eco-ressource-backend-main` :

```bash
docker build -f deployment/docker/backend.Dockerfile -t <dockerhub_user>/eco-backend:v1 ../eco-ressource-backend-main
```

Test local avec une base MySQL deja lancee sur la machine :

```bash
docker run --rm --name eco-backend -p 9090:9090 \
  -e SPRING_DATASOURCE_URL="jdbc:mysql://host.docker.internal:3306/eco_ressource_db?useSSL=false&serverTimezone=UTC&allowPublicKeyRetrieval=true&createDatabaseIfNotExist=true" \
  -e SPRING_DATASOURCE_USERNAME=root \
  -e SPRING_DATASOURCE_PASSWORD="" \
  <dockerhub_user>/eco-backend:v1
```

Verification :

```bash
curl http://localhost:9090/actuator/health
curl http://localhost:9090/swagger-ui.html
```

## 3. Base de donnees MySQL en conteneur

```bash
docker network create eco-net

docker run -d --name eco-db --network eco-net \
  -e MYSQL_DATABASE=eco_ressource_db \
  -e MYSQL_ROOT_PASSWORD=root \
  -p 3306:3306 \
  mysql:8.4
```

Backend connecte a MySQL Docker :

```bash
docker run --rm --name eco-backend --network eco-net -p 9090:9090 \
  -e SPRING_DATASOURCE_URL="jdbc:mysql://eco-db:3306/eco_ressource_db?useSSL=false&serverTimezone=UTC&allowPublicKeyRetrieval=true&createDatabaseIfNotExist=true" \
  -e SPRING_DATASOURCE_USERNAME=root \
  -e SPRING_DATASOURCE_PASSWORD=root \
  <dockerhub_user>/eco-backend:v1
```

## 4. Push vers Docker Hub

```bash
docker login
docker push <dockerhub_user>/eco-frontend:v1
docker push <dockerhub_user>/eco-backend:v1
```

## 5. Lancer toute l'application avec Docker Compose

Depuis le dossier frontend `eco-ressource-b2b-main` :

```bash
docker compose -f deployment/docker/docker-compose.yml up --build
```

Ouvrir le frontend :

```text
http://localhost:8080
```

Ouvrir le backend :

```text
http://localhost:9090/swagger-ui.html
```

Arreter les conteneurs :

```bash
docker compose -f deployment/docker/docker-compose.yml down
```

Supprimer aussi les volumes MySQL et uploads :

```bash
docker compose -f deployment/docker/docker-compose.yml down -v
```

## 6. Utilisation dans Kubernetes

Dans `frontend-deployment.yaml` :

```yaml
image: <dockerhub_user>/eco-frontend:v1
```

Dans `backend-deployment.yaml` :

```yaml
image: <dockerhub_user>/eco-backend:v1
```

Ensuite :

```bash
kubectl apply -f deployment/k8s/
kubectl get pods -n eco-app
kubectl logs deployment/eco-backend -n eco-app
```
