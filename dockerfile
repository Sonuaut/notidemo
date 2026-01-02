FROM node:22-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install -f

COPY . .

RUN npm run build

EXPOSE 3005

CMD ["npm", "start", "--", "--port", "3005", "--hostname", "0.0.0.0"]
