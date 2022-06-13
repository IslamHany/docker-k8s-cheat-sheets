# Docker run
```bash
docker run <image name> <command>
docker run busybox echo hi there
docker run busybox ls
```
# List container
-list running containers
```bash
docker ps
```
-list all created containers
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

