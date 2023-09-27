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

# Installing Ingress - routing and load balance
kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-v1.8.2/deploy/static/provider/cloud/deploy.yaml
kubectl get pods --namespace=ingress-nginx