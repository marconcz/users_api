FROM node:alpine
# Create app directory
WORKDIR /app
# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./
RUN npm install
# If you are building your code for production
#RUN npm ci 
# Bundle app source
COPY . .

RUN npm run build

RUN npm install ts-node

EXPOSE 3000

CMD ["npm", "run", "start" ]

#docker build . -t api
#docker run -t -p 3000:3000 api