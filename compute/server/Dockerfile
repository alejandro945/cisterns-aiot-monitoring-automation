#App environment you can reproduced anywhere
FROM node:20-alpine As Core-Service-Development

# Create app directory
WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

# Bundle app source
COPY . /usr/src/app

# Creation of dist folder
RUN npm run build

#Production Image
FROM node:20-alpine As Core-Service-Production

ARG NODE_ENV=production 

ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY --from=Core-Service-Development /usr/src/app/dist ./dist
COPY --from=Core-Service-Development /usr/src/app/package.json .
COPY --from=Core-Service-Development /usr/src/app/.env .

CMD [ "node", "dist/main" ]