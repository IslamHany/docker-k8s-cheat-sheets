# base image with node and npm preinstalled
FROM node:14-alpine

# If the folder does not exist it will be created
WORKDIR /usr/app

# See if new dependecies are added to avoid rebuilds
COPY ./package.json ./

RUN npm install

# The COPY command will copy the files into the working directory
COPY ./ ./


# Default command
CMD [ "npm", "start" ]