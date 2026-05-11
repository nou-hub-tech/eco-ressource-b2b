# Guide des fichiers Kubernetes et Docker

## 1. Est-ce que la conteneurisation se fait sur VMware ?

La conteneurisation ne depend pas obligatoirement de VMware.

VMware sert surtout a creer des machines virtuelles Linux pour simuler ou heberger l'infrastructure :

- une VM master Kubernetes ;
- une ou plusieurs VM worker Kubernetes ;
- eventuellement une VM de controle avec Ansible.

La conteneurisation, elle, se fait avec Docker. Elle peut etre faite :

- sur ta machine locale avec Docker Desktop ;
- dans une VM Ubuntu sous VMware ;
- sur une machine cloud ;
- sur la VM master, meme si ce n'est pas toujours le meilleur choix.

Le choix conseille pour le projet :

1. Utiliser VMware pour creer les VMs Linux du cluster Kubernetes.
2. Installer Docker sur la machine ou tu veux construire les images.
3. Construire les images frontend et backend.
4. Pousser les images sur Docker Hub.
5. Depuis Kubernetes, utiliser ces images Docker Hub dans les fichiers YAML.

Donc VMware = infrastructure. Docker = creation des conteneurs. Kubernetes = execution et orchestration des conteneurs.

## 2. Dossier docker/

Le dossier `docker/` contient les fichiers qui servent a construire les images Docker.

### docker/frontend.Dockerfile

Ce fichier construit l'image du frontend.

Role :

- installer les dependances frontend ;
- compiler l'application Angular ;
- copier les fichiers compiles dans un serveur web Nginx ;
- exposer l'application sur le port 80.

Exemple de commande :

```bash
docker build -f deployment/docker/frontend.Dockerfile -t <dockerhub_user>/eco-frontend:v1 .
```

Resultat attendu :

- une image Docker appelee `<dockerhub_user>/eco-frontend:v1` ;
- cette image contient uniquement l'application frontend prete a etre servie par Nginx.

### docker/backend.Dockerfile

Ce fichier construit l'image du backend.

Role :

- installer les dependances backend ;
- copier le code backend ;
- definir la commande de demarrage ;
- exposer le port de l'API, par exemple `3000`, `8080` ou autre selon ton backend.

Exemple de commande :

```bash
docker build -f deployment/docker/backend.Dockerfile -t <dockerhub_user>/eco-backend:v1 ../eco-ressource-backend-main
```

Resultat attendu :

- une image Docker appelee `<dockerhub_user>/eco-backend:v1` ;
- cette image sera utilisee par Kubernetes dans `backend-deployment.yaml`.

## 3. Dossier k8s/

Le dossier `k8s/` contient les manifests Kubernetes. Un manifest est un fichier YAML qui decrit une ressource a creer dans le cluster.

### k8s/namespace.yaml

Ce fichier cree un espace logique pour le projet.

Role :

- regrouper toutes les ressources dans un namespace, par exemple `eco-app` ;
- eviter de melanger les ressources du projet avec celles du systeme Kubernetes.

Commande :

```bash
kubectl apply -f deployment/k8s/namespace.yaml
```

Verification :

```bash
kubectl get namespaces
```

### k8s/configmap.yaml

Ce fichier contient les configurations non sensibles.

Exemples :

- nom de la base de donnees ;
- host de la base de donnees ;
- port de l'API ;
- URL interne du backend.

Il ne faut pas mettre de mot de passe dans un ConfigMap.

Commande :

```bash
kubectl apply -f deployment/k8s/configmap.yaml
```

Verification :

```bash
kubectl get configmap -n eco-app
kubectl describe configmap eco-config -n eco-app
```

### k8s/secret.yaml

Ce fichier contient les donnees sensibles.

Exemples :

- mot de passe de la base de donnees ;
- utilisateur de la base de donnees ;
- token ;
- cle secrete.

Commande :

```bash
kubectl apply -f deployment/k8s/secret.yaml
```

Verification :

```bash
kubectl get secret -n eco-app
kubectl describe secret eco-secret -n eco-app
```

### k8s/database-deployment.yaml

Ce fichier deploie le conteneur de base de donnees.

Role :

- lancer PostgreSQL ou MySQL dans un Pod ;
- utiliser les variables venant du ConfigMap et du Secret ;
- definir les ressources CPU/RAM ;
- definir le nombre de replicas, souvent `1` pour une base simple.

Commande :

```bash
kubectl apply -f deployment/k8s/database-deployment.yaml
```

Verification :

```bash
kubectl get pods -n eco-app
kubectl logs deployment/eco-db -n eco-app
```

### k8s/database-service.yaml

Ce fichier cree un Service interne pour la base de donnees.

Role :

- donner un nom stable a la base de donnees, par exemple `eco-db` ;
- permettre au backend de se connecter avec `DB_HOST=eco-db` ;
- exposer la base seulement dans le cluster avec `ClusterIP`.

Commande :

```bash
kubectl apply -f deployment/k8s/database-service.yaml
```

Verification :

```bash
kubectl get svc -n eco-app
```

### k8s/backend-deployment.yaml

Ce fichier deploie l'API backend.

Role :

- lancer l'image Docker du backend ;
- definir le nombre de replicas ;
- injecter les variables d'environnement depuis `ConfigMap` et `Secret` ;
- connecter le backend a la base de donnees ;
- definir les limites CPU/RAM.

Commande :

```bash
kubectl apply -f deployment/k8s/backend-deployment.yaml
```

Verification :

```bash
kubectl get pods -n eco-app
kubectl logs deployment/eco-backend -n eco-app
```

### k8s/backend-service.yaml

Ce fichier expose le backend dans le cluster.

Role :

- donner une adresse stable au backend, par exemple `eco-backend` ;
- permettre au frontend ou a l'Ingress d'appeler l'API ;
- utiliser souvent le type `ClusterIP`.

Commande :

```bash
kubectl apply -f deployment/k8s/backend-service.yaml
```

Verification :

```bash
kubectl get svc -n eco-app
```

### k8s/frontend-deployment.yaml

Ce fichier deploie le frontend.

Role :

- lancer l'image Docker du frontend ;
- creer plusieurs replicas si necessaire ;
- exposer le port 80 du conteneur ;
- definir les ressources CPU/RAM.

Commande :

```bash
kubectl apply -f deployment/k8s/frontend-deployment.yaml
```

Verification :

```bash
kubectl get pods -n eco-app
kubectl logs deployment/eco-frontend -n eco-app
```

### k8s/frontend-service.yaml

Ce fichier expose le frontend.

Role :

- rendre le frontend accessible ;
- utiliser `NodePort` pour un test simple ;
- utiliser `LoadBalancer` si l'infrastructure cloud le supporte ;
- utiliser `ClusterIP` si l'acces passe par un Ingress.

Exemple avec `NodePort` :

```bash
kubectl get svc -n eco-app
curl http://<node_ip>:30080
```

### k8s/hpa.yaml

Ce fichier configure l'autoscaling horizontal.

Role :

- augmenter ou diminuer automatiquement le nombre de Pods ;
- surveiller l'utilisation CPU ;
- garder par exemple entre 2 et 5 replicas.

Prerequis :

```bash
kubectl apply -f https://github.com/kubernetes-sigs/metrics-server/releases/latest/download/components.yaml
```

Commande :

```bash
kubectl apply -f deployment/k8s/hpa.yaml
```

Verification :

```bash
kubectl get hpa -n eco-app
```

### k8s/ingress.yaml

Ce fichier gere l'acces HTTP externe avec des routes.

Role :

- exposer le frontend via un nom de domaine ;
- rediriger `/api` vers le backend ;
- centraliser l'acces externe ;
- preparer HTTPS si necessaire.

Prerequis :

- installer un Ingress Controller, par exemple Nginx Ingress Controller.

Commande :

```bash
kubectl apply -f deployment/k8s/ingress.yaml
```

Verification :

```bash
kubectl get ingress -n eco-app
kubectl describe ingress -n eco-app
```

## 4. Ordre d'execution conseille

### Etape 1 : creer les images Docker

```bash
docker build -f deployment/docker/frontend.Dockerfile -t <dockerhub_user>/eco-frontend:v1 .
docker build -f deployment/docker/backend.Dockerfile -t <dockerhub_user>/eco-backend:v1 ../eco-ressource-backend-main
```

### Etape 2 : tester les images localement

```bash
docker images
docker run -d --name test-frontend -p 8080:80 <dockerhub_user>/eco-frontend:v1
curl http://localhost:8080
docker logs test-frontend
```

Pour le backend, il faut souvent lancer aussi une base de donnees ou configurer les variables d'environnement.

### Etape 3 : pousser les images vers Docker Hub

```bash
docker login
docker push <dockerhub_user>/eco-frontend:v1
docker push <dockerhub_user>/eco-backend:v1
```

### Etape 4 : creer le cluster Kubernetes

Avec VMware :

1. creer les VMs Ubuntu ;
2. configurer le reseau ;
3. installer Kubernetes avec Ansible ou manuellement ;
4. verifier que les nodes sont `Ready`.

Commande de verification :

```bash
kubectl get nodes -o wide
```

### Etape 5 : deployer les fichiers Kubernetes

```bash
kubectl apply -f deployment/k8s/namespace.yaml
kubectl apply -f deployment/k8s/configmap.yaml
kubectl apply -f deployment/k8s/secret.yaml
kubectl apply -f deployment/k8s/database-deployment.yaml
kubectl apply -f deployment/k8s/database-service.yaml
kubectl apply -f deployment/k8s/backend-deployment.yaml
kubectl apply -f deployment/k8s/backend-service.yaml
kubectl apply -f deployment/k8s/frontend-deployment.yaml
kubectl apply -f deployment/k8s/frontend-service.yaml
kubectl apply -f deployment/k8s/hpa.yaml
kubectl apply -f deployment/k8s/ingress.yaml
```

Ou tout appliquer en une seule commande :

```bash
kubectl apply -f deployment/k8s/
```

### Etape 6 : verifier le deploiement

```bash
kubectl get all -n eco-app
kubectl get pods -n eco-app -o wide
kubectl get svc -n eco-app
kubectl get ingress -n eco-app
kubectl logs deployment/eco-backend -n eco-app
```

### Etape 7 : tester l'application

Avec NodePort :

```bash
curl http://<node_ip>:30080
```

Dans le navigateur :

```text
http://<node_ip>:30080
```

## 5. Resume simple

Pour la presentation, tu peux expliquer comme ceci :

1. Docker transforme le frontend et le backend en images executables partout.
2. Docker Hub stocke ces images pour que Kubernetes puisse les telecharger.
3. VMware fournit les machines virtuelles Linux du cluster.
4. Ansible installe et configure automatiquement Kubernetes sur ces VMs.
5. Kubernetes lance les Pods, connecte les services et expose l'application.
6. Les fichiers YAML de `k8s/` representent l'etat souhaite de l'application.
