FROM node:18.17.1
ENV NODE_ENV=production

WORKDIR /app

COPY ["package.json","package-lock.json*","./"]

RUN npm install --production

COPY . .

CMD [ "node","servver.js"]
