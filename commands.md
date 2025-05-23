# Build 
docker build --tag client-microservice:0.0.1 .
docker ps

# Run locally
docker run client-microservice:0.0.1

# Keep online on the docker hub
docker push rmc3408/client

# Update to kubernetes
kubectl apply -f client.yaml
kubectl rollout restart deployment client-deploy

# Verify k8s
kubectl get pods
kubectl get nodes
kubectl get services
kubectl get deployment
kubectl get endpoints
kubectl get ns 

kubectl logs <pod-name>

# Stop via file
kubectl pause -f client.yaml

# Stop services
kubectl get service --all-namespaces
kubectl delete service --namespace=default bus-srv
kubectl delete --all services

# Expose service to external (one option bellow)
minikube tunnel
kubectl port-forward service/auth-srv 443:4000
kubectl port-forward pods/nats-deploy-5b44df9ddf-wgs4m 4222:4222

# Stop deployment
kubectl get deploy
kubectl delete deploy query-deploy

# Installing Ingress - routing and load balance
kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-v1.8.2/deploy/static/provider/cloud/deploy.yaml
kubectl get pods --namespace=ingress-nginx
kubectl delete all  --all -n ingress-nginx
kubectl delete namespace ingress-nginx

# Skaffold
skaffold dev
skaffold delete

# creating secret
kubectl create secret generic jwt-secret --from-literal=JWTKEY=Secret123
kubectl delete secret jwt-secret


# Start from zero
install 4 points: docker, minikube, ingress URL and skaffold
1. start minikube `minikube start`
2. create secret in kubernetes - line above
3. run all deploy, pods, services `skaffold dev`
4. In another terminal, run `minikube tunnel` or port-forward
5. Open page `http://rmc3408.dev` - might need type "thisisunsafe" to avoid chrome privacy

# To run NATS
`kubectl get pods`
Find the nats-deploy pods name
`kubectl port-forward pod/nats-deploy-XXXXXX 4222:4222`

# PORTS
auth 4000
ticket 4001
orders 4002
client 3000
NATS 4222