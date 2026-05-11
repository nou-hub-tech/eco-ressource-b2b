# Explication du deploiement frontend Eco Ressource

Ce document resume tout ce qui a ete fait pour deployer le frontend Angular de l'application Eco Ressource et le connecter au backend deja heberge.

## 1. Situation de depart

Le backend etait deja deploye et accessible avec Swagger sur l'URL :

```text
https://coastline-rumor-falcon.ngrok-free.dev/swagger-ui/index.html
```

Le frontend se trouve dans :

```text
D:\Desktop\eco-ressource-b2b-main
```

Le backend local se trouve dans :

```text
D:\Desktop\eco-ressource-backend-main
```

L'objectif etait de deployer la partie frontend et de la faire communiquer avec le backend deploye.

## 2. Analyse du frontend

Le frontend est une application Angular.

Les fichiers importants identifies sont :

```text
package.json
Dockerfile
nginx.conf
deployment/docker/frontend.Dockerfile
deployment/docker/nginx.conf
src/environments/environment.ts
src/environments/environment.prod.ts
```

Dans les fichiers d'environnement Angular, l'API etait deja configuree avec une URL relative :

```ts
apiUrl: '/api'
```

Ce choix est correct pour un deploiement Docker, car le navigateur appelle le meme domaine que le frontend, puis Nginx redirige les appels `/api` vers le backend.

## 3. Probleme trouve

Certains fichiers du frontend contenaient encore des URLs locales hardcodees :

```text
http://localhost:9090
```

Cela fonctionne en local, mais pas apres deploiement cloud.

Exemples de cas corriges :

```text
http://localhost:9090/api/enterprise/finder
http://localhost:9090/files/...
http://localhost:9090/ai/chat
```

L'ancien tunnel ngrok etait aussi present dans certains QR codes :

```text
https://exes-unreal-movable.ngrok-free.dev
```

Il fallait tout remplacer par la nouvelle strategie de deploiement.

## 4. Strategie choisie pour le frontend

La strategie retenue :

```text
Navigateur
  -> Frontend Angular dans un container Nginx
  -> Nginx proxy
  -> Backend ngrok
```

Le frontend continue donc d'appeler :

```text
/api
/ai
/files
/product
/ws
```

Et Nginx redirige vers :

```text
https://coastline-rumor-falcon.ngrok-free.dev
```

Cela evite les problemes CORS, car le navigateur ne contacte pas directement le backend ngrok.

## 5. Fichiers modifies cote frontend

Les fichiers Nginx ont ete modifies :

```text
deployment/docker/nginx.conf
nginx.conf
```

Les routes proxy ajoutees ou corrigees sont :

```text
/api
/ai
/files
/product
/ws
```

Exemple de proxy :

```nginx
location /api/ {
    proxy_pass https://coastline-rumor-falcon.ngrok-free.dev/api/;
    proxy_http_version 1.1;
    proxy_ssl_server_name on;
    proxy_set_header Host coastline-rumor-falcon.ngrok-free.dev;
    proxy_set_header ngrok-skip-browser-warning true;
}
```

Le header suivant a ete ajoute pour eviter la page d'avertissement ngrok :

```nginx
proxy_set_header ngrok-skip-browser-warning true;
```

## 6. Suppression des URLs localhost dans Angular

Les fichiers Angular corriges incluent :

```text
src/app/features/enterprise/product-finder/product-finder.ts
src/app/features/enterprise/market-chatbot/market-chatbot.ts
src/app/components/chatbot/chatbot.html
src/app/components/chatbot/chatbot.ts
src/app/features/enterprise/dashboard/dashboard.html
src/app/features/enterprise/my-inventory/my-inventory.ts
```

Avant :

```ts
private readonly api = 'http://localhost:9090/api/enterprise/finder';
```

Apres :

```ts
private readonly api = `${environment.apiUrl}/enterprise/finder`;
```

Avant :

```ts
return `http://localhost:9090/files/${img}`;
```

Apres :

```ts
return `/files/${img}`;
```

## 7. Correction des QR codes

Les QR codes utilisaient un ancien tunnel ngrok.

Fichiers modifies :

```text
src/environments/environment.prod.ts
src/app/core/services/qr-code.service.ts
src/app/core/services/pdf-generator.service.ts
```

En production :

```ts
qrCodeBaseUrl: 'https://coastline-rumor-falcon.ngrok-free.dev'
```

Le service QR code construit maintenant l'URL dynamiquement :

```ts
const baseUrl = environment.qrCodeBaseUrl || window.location.origin;
return `${baseUrl.replace(/\/$/, '')}/api/delivery-orders/update-by-qr/${orderId}`;
```

## 8. Verification du build Angular

Le build Angular a ete lance avec :

```powershell
npm.cmd run build -- --configuration production
```

La premiere tentative avec `npm` a echoue a cause de la politique PowerShell :

```text
npm.ps1 n'est pas signe numeriquement
```

Solution :

```powershell
npm.cmd run build -- --configuration production
```

Le build a aussi eu besoin d'acces Internet pour recuperer les polices Google pendant l'optimisation Angular.

Resultat :

```text
Application bundle generation complete.
```

Il restait seulement des warnings Angular sur la taille CSS et certaines dependances CommonJS. Ce ne sont pas des erreurs bloquantes.

## 9. Creation du fichier ACI YAML

Un fichier de deploiement Azure Container Instances a ete genere :

```text
aci-frontend.yaml
```

Il contient :

```yaml
apiVersion: 2021-09-01
location: germanywestcentral
name: ecoressource-frontend
properties:
  containers:
    - name: frontend
      properties:
        image: ahmedmansour0604/eco-ressource-b2b:v2
        command:
          - /bin/sh
          - -c
          - "sed -i 's|http://backend:9090|https://coastline-rumor-falcon.ngrok-free.dev|g; s|http://eco-backend:9090|https://coastline-rumor-falcon.ngrok-free.dev|g' /etc/nginx/conf.d/default.conf && nginx -g 'daemon off;'"
        ports:
          - port: 80
        resources:
          requests:
            cpu: 0.5
            memoryInGb: 0.5
  ipAddress:
    type: Public
    ports:
      - protocol: tcp
        port: 80
    dnsNameLabel: ecoressource-b2b-2026
  osType: Linux
type: Microsoft.ContainerInstance/containerGroups
```

La commande `sed` permet de corriger l'URL backend dans le fichier Nginx au demarrage du container.

## 10. Deploiement Azure Container Instances

Connexion Azure :

```powershell
az login --use-device-code
```

Creation du resource group :

```powershell
az group create --name ecoressource-rg --location germanywestcentral
```

Deploiement ACI :

```powershell
cd D:\Desktop\eco-ressource-b2b-main
az container create -g ecoressource-rg -f aci-frontend.yaml
```

Le deploiement a reussi :

```text
provisioningState: Succeeded
state: Running
image: ahmedmansour0604/eco-ressource-b2b:v2
```

URL obtenue :

```text
http://ecoressource-b2b-2026.germanywestcentral.azurecontainer.io
```

Exemple de route :

```text
http://ecoressource-b2b-2026.germanywestcentral.azurecontainer.io/enterprise/my-deliveries
```

## 11. Erreurs rencontrees pendant le deploiement ACI

### Resource group introuvable

Erreur :

```text
Resource group 'ecoressource-rg' could not be found
```

Solution :

```powershell
az group create --name ecoressource-rg --location germanywestcentral
```

### Provider Microsoft.ContainerInstance non enregistre

Erreur :

```text
MissingSubscriptionRegistration
The subscription is not registered to use namespace 'Microsoft.ContainerInstance'
```

Solution :

```powershell
az provider register --namespace Microsoft.ContainerInstance
```

Verification :

```powershell
az provider show --namespace Microsoft.ContainerInstance --query registrationState -o tsv
```

### DNS deja utilise

Erreur :

```text
DnsNameLabelAlreadyTaken
```

Solution :

Changer :

```yaml
dnsNameLabel: ecoressource-b2b
```

par :

```yaml
dnsNameLabel: ecoressource-b2b-2026
```

### Image Docker inaccessible

Erreur :

```text
InaccessibleImage
The image 'eco-ressource-b2b:v2' is not accessible
```

Cause :

L'image etait locale et non disponible pour Azure.

Solution :

Pousser l'image vers Docker Hub et utiliser :

```yaml
image: ahmedmansour0604/eco-ressource-b2b:v2
```

## 12. Verification du login

Le frontend ne connecte pas l'admin automatiquement.

Le login fait toujours une requete backend :

```text
POST /api/auth/login
```

Le backend retourne un JWT avec le role :

```text
ROLE_ADMIN
ROLE_ENTERPRISE
ROLE_TRANSPORTER
```

Le frontend stocke ensuite :

```text
localStorage eco_token
localStorage eco_user
```

Comptes seedes trouves dans le backend :

```text
Admin:
email: admin@marketplace.com
password: admin123

Entreprise:
email: slim@entreprise.tn
password: demo123

Transporteur:
email: karim@transport.tn
password: demo123
```

Si admin fonctionne mais pas les autres, les causes probables sont :

```text
1. Les utilisateurs entreprise/transporteur n'existent pas dans la base Azure.
2. Le backend utilise une autre base de donnees.
3. Le login reussit mais une API apres redirection retourne 403.
4. Le mot de passe utilise n'est pas celui de la base de donnees active.
```

## 13. Push Git vers main

Le projet etait sur la branche :

```text
integration_finale
```

Un commit a ete cree pour ajouter le YAML ACI :

```text
3435a3da Add Azure Container Instance frontend deployment
```

Puis la branche actuelle a ete poussee vers `origin/main` en ecrasant l'ancien main :

```powershell
git push origin HEAD:main --force-with-lease=main
```

Resultat :

```text
HEAD -> main (forced update)
```

## 14. Discussion CI/CD

La strategie CI/CD proposee :

```text
GitHub
  -> GitHub Actions
  -> Build Docker image
  -> Push Docker Hub
  -> Deploy Azure Container Instance
```

Le pipeline GitHub Actions propose :

```yaml
name: Frontend CI/CD

on:
  push:
    branches:
      - main

env:
  IMAGE_NAME: ahmedmansour0604/eco-ressource-b2b
  RESOURCE_GROUP: ecoressource-rg
  CONTAINER_GROUP: ecoressource-frontend

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Login Docker Hub
        uses: docker/login-action@v3
        with:
          username: ${{ secrets.DOCKERHUB_USERNAME }}
          password: ${{ secrets.DOCKERHUB_TOKEN }}

      - name: Build Docker image
        run: |
          docker build \
            -f deployment/docker/frontend.Dockerfile \
            -t $IMAGE_NAME:${{ github.sha }} \
            .

      - name: Push Docker image
        run: |
          docker push $IMAGE_NAME:${{ github.sha }}

      - name: Azure login
        uses: azure/login@v2
        with:
          creds: ${{ secrets.AZURE_CREDENTIALS }}

      - name: Update image in ACI YAML
        run: |
          sed -i "s|image: .*|image: $IMAGE_NAME:${{ github.sha }}|g" aci-frontend.yaml

      - name: Deploy to Azure Container Instances
        run: |
          az container create \
            --resource-group $RESOURCE_GROUP \
            --file aci-frontend.yaml
```

Secrets GitHub necessaires :

```text
DOCKERHUB_USERNAME
DOCKERHUB_TOKEN
AZURE_CREDENTIALS
```

## 15. Est-ce qu'un controller est necessaire ?

Non, pas avec Azure Container Instances.

Un controller est surtout necessaire dans Kubernetes :

```text
Deployment Controller
ReplicaSet Controller
Ingress Controller
HPA Controller
```

Dans notre cas :

```text
Azure Container Instances execute directement le container.
Il n'y a pas besoin de controller Kubernetes.
```

## 16. HTTPS

L'URL ACI par defaut est en HTTP :

```text
http://ecoressource-b2b-2026.germanywestcentral.azurecontainer.io
```

ACI ne fournit pas directement HTTPS sur ce domaine.

Une premiere solution proposee etait Azure Front Door :

```text
Utilisateur -> HTTPS Front Door -> HTTP ACI
```

Un fichier Bicep a ete genere :

```text
frontdoor-https.bicep
```

Mais le deploiement Azure Front Door a echoue avec :

```text
Free Trial and Student account is forbidden for Azure Frontdoor resources.
```

Conclusion :

```text
Azure for Students bloque Azure Front Door.
```

## 17. Alternative HTTPS avec Azure App Service

Pour obtenir HTTPS avec Azure for Students, la solution proposee est Azure App Service.

Creation du plan App Service :

```powershell
az appservice plan create `
  -g ecoressource-rg `
  -n ecoressource-plan `
  --location germanywestcentral `
  --is-linux `
  --sku B1
```

Cette etape a reussi :

```text
provisioningState: Succeeded
status: Ready
sku: B1
```

Etapes suivantes pour deployer le frontend sur App Service :

```powershell
az webapp create `
  -g ecoressource-rg `
  -p ecoressource-plan `
  -n ecoressource-b2b-2026 `
  --deployment-container-image-name ahmedmansour0604/eco-ressource-b2b:v2
```

Configurer le port :

```powershell
az webapp config appsettings set `
  -g ecoressource-rg `
  -n ecoressource-b2b-2026 `
  --settings WEBSITES_PORT=80
```

Configurer l'image Docker :

```powershell
az webapp config container set `
  -g ecoressource-rg `
  -n ecoressource-b2b-2026 `
  --docker-custom-image-name ahmedmansour0604/eco-ressource-b2b:v2 `
  --docker-registry-server-url https://index.docker.io
```

Redemarrer :

```powershell
az webapp restart `
  -g ecoressource-rg `
  -n ecoressource-b2b-2026
```

URL HTTPS attendue :

```text
https://ecoressource-b2b-2026.azurewebsites.net/enterprise/my-deliveries
```

## 18. Resume final

Ce qui a ete accompli :

```text
1. Analyse du frontend Angular.
2. Correction des URLs backend.
3. Configuration Nginx pour proxy vers le backend ngrok.
4. Correction des QR codes.
5. Build Angular production valide.
6. Creation du fichier aci-frontend.yaml.
7. Deploiement reussi sur Azure Container Instances.
8. Image Docker publiee et utilisee depuis Docker Hub.
9. Push vers main en ecrasant l'ancien main.
10. Proposition de pipeline CI/CD avec GitHub Actions.
11. Test de solution HTTPS avec Front Door.
12. Identification de la limitation Azure for Students.
13. Creation du plan Azure App Service pour obtenir HTTPS.
```

URL ACI actuelle :

```text
http://ecoressource-b2b-2026.germanywestcentral.azurecontainer.io
```

URL App Service HTTPS attendue :

```text
https://ecoressource-b2b-2026.azurewebsites.net
```

