# Docker run
```bash
docker run <image name> <command>
docker run busybox echo hi there
docker run busybox ls
```
# List container
- list running containers
```bash
docker ps
```
- list all created containers
```bash
docker ps --all
```
# create container
- the create command will return the container id
```bash
docker create hello-world
docker start -a <container id>
```
- [-a] is responsible of output from container to our terminal
# start container again
```bash
docker start -a <container id>
```
# delete all container
```bash
docker system prune
```
# docker clean up stopped containers and remove unlinked images
```bash
docker system prune -a
```
# view container logs
```bash
docker logs <container id>
```
# stop a container
- stop: sends SIGTERM message which allows the process to clean up
before stopping
```bash
docker stop <container id>
```
- kill: sends SIGKILL message which will shut the process immediatly
```bash
docker kill <container id>
```
# Execute an additional command in a container
- [-i] is to attach our terminal to stdin channel of the process
- [-t] is to format text appearing on screen
```bash
docker exec -it <container id> <command>
```
# Open a shell on running container
- get full terminal access inside a container
```bash
docker exec -it <container id> sh
```
# Start with shell
```bash
docker run -it <image name> sh
```
# Build an image
```bash
docker build .
```
# Differnce between RUN and CMD in dockerfile
- RUN: is for intermediary and running process
- CMD: is the primary command or process of the container(it tells the container if you were to ever run you will run the command of CMD)
# Tag an image
```bash
docker build -t benhany/redis:latest .
```
# Manual image genetation (not best practice)
```bash
docker run -it alpine sh
apk add --update redis
```
- Open another terminal window
```bash
docker ps
docker commit -c 'CMD ["redis-server"]' <alpine container id>
docker run <sha>
```
# Container port mapping
```bash
docker run -p outer_port:inner_port benhany/simplweb
```
# Docker compose
- It exists to make you avoid writing a ton of repetitive commands with the docker cli
# Start docker compose
```bash
docker compose up
```
# Rebuild images inside docker-compose file
```bash
docker compose up --build
```
# Run docker compose in the background
- [-d] is for running in the background
```bash
docker compose up -d
```
# Stop docker compose containers
```bash
docker compose down
```
# no in yml file
- If you type [no] in yml file without quotes it means false
# Display docker compose containers status
- Run the command from the directory that contains the docker-compose.yml file
```bash
docker compose ps
```
# Docker build with a specific file
```bash
docker build -f Dockerfile.de# Docker build with a specific file
```bash
docker build -t benhany/frontend -f Dockerfile.dev .
```
# Docker volume
- [-v] to set up a volume
- $(pwd):/app => map the current working directory to /usr/app directory inside the container
- [-v /usr/app/node_modules] this tells docker do not try to map node_modules to an external volume
```bash
docker run -p 3000:3000 -v /usr/app/node_modules -v $(pwd):/usr/app benhany/frontend
```
# Attach a terminal to a docker container(it attaches to the primary command)
```bash
docker attach <container id>
```
# Specify docker compose file to run
```bash
docker compose -f docker-compose-dev.yml up
docker compose -f docker-compose-dev.yml down
```
# Start minikube with VM driver
- Note - It is very important to use a vm driver like hyperkit. If you do not pass a driver flag to the start command Minikube will use the docker driver instead.
```bash
minikube start --driver=hyperkit
```
# check minikube status
```bash
minikube status
```
# Display addresses of the master and services
```bash
kubectl cluster-info
```
# Feed a config file to Kubectl
```bash
kubectl apply -f <file name>
```
# Print the status of all running pods
```bash
kubectl get pods
```
- firstNum is the number of pods that are running
- secondNum is the number of copies that we have
```bash
NAME		READY
pod name    	firstNum:secondNum
client-pod	1/1
```
# Print out all of our different services
```bash
kubectl get services
```
# To get k8s vm ip address
```bash
minikube ip
```
# Access node port service with port-forward
```bash
kubectl port-forward svc/<service name> localPort:podPort
```
# Expose pod port
- Access on localhost:<localhost-port>
```bash
kubectl port-forward <pod-name> <localhost-port>:<pod-port>
```
# Open terminal inside minikube vm
- containers run with kubectl are inside minikube vm
```bash
minikube ssh
docker ps
```
# Get detailed info about an object
```bash
kubectl describe <object type> <object name>
kubectl describe pod client-pod
```
# If you want k8s to run container with local image
- run the following 
```bash
eval $(minikube docker-env)
minikube start
```
- if the pod already created with online image make sure you delete the pod
```bash
kubectl delete pod <pod-name>
```
- another way to delete a pod
```bash
kubectl delete -f <config file>
```
- set imagePullPolicy to Never or IfNotPresent
- re-apply the config file to kubectl
```bash
kubectl apply -f <pod-object-file>
```
# Display deployments status
```bash
kubectl get <object type>
kubectl get deployments
```
# Display pods status with more info
```bash
kubectl get pods -o wide
```
# Update property inside on one of the objects inside the cluster
```bash
kubectl set <property> <object-type>/<object name> <container name>=<new image to use>
```
# Force deployment to use specific image version
- Using the kubectl set command
```bash
kubectl set image deployment/client-deployment client=benhany/multi-client:v1
```
# Configure your current terminal to make your docker client to talk to minikube docker server inside the VM
- If you open a new terminal it will go back to its previous behavior
```bash
eval $(minikube docker-env)
```
# Execute a shell inside a pod
```bash
kubectl exec -it <pod name> sh
```
# Get pod logs
```bash
kubectl logs <pod name>
```
- The same debugging techniques used by docker cli is the same used by kubectl
# apply group of object files to kubectl
```bash
kubectl apply -f <folder name>
kubectl apply -f .
```
# Display all options that k8s has for creating a persistent volume
```bash
kubectl get storageclass
```
# Get list of persistent volumes
```bash
kubectl get pv
```
# Get list of persistent volume claims
```bash
kubectl get pvc
```
# Create a secret
- generic is the type of secret
```bash
kubectl create secret generic <secret_name> --from-literal key=value
kubectl create secret generic pgpassword --from-literal PGPASSWORD=12345
```
# Get secrets
```bash
kubectl get secrets
```
# Port forward ingress controller if you are not using minikube and using docker desktop
```bash
kubectl port-forward --namespace=ingress-nginx service/ingress-nginx-controller 8080:80
```
# Get objects under a specific namespace
```bash
kubectl get pods --namespace=ingress-nginx
```
# Access kubectl proxy
```bash
kubectl proxy
```
# Get current git commit sha
- You can use the sha to uniquely tag docker image
```bash
git rev-parse HEAD
```
# Get only first 7 characters of the sha
```bash
git rev-parse --short=7 HEAD
```
# Get namespaces
- kube-system namespace: contains a set k8s objects that make your entire cluster work the way you expect
```bash
kubectl get namespaces
```
# Create a service account in a namespace
```bash
kubectl create serviceaccount --namespace kube-system <service-account-name>
```
# Create cluster role binding
- [--clusterrole] is the set of permissions.
- cluster-admin role can do anything in the cluster.
```bash
kubectl create clusterrolebinding <cluster-role-name> --clusterrole=cluster-admin --serviceaccount=<namespace>:<service-account-name>
```
# Deleting pods, deployments, services inside a folder
```bash
kubectl delete -f <directory>
```
# Delete minikube cluster
```bash
minikube delete
```
# Run skaffold
- Run that command inside the directory containing skaffold.yml file
```bash
skaffold dev
```
