FROM node:18.18.0

#RUN npm install -g npm@9.8.1

# Install Babel CLI globally
RUN npm install -g @babel/cli

WORKDIR "/app"

COPY package*.json ./

RUN npm install

COPY . .

RUN chown -R node /app/node_modules

USER node

CMD ["/bin/bash", "-c", "npm start"]