FROM node

WORKDIR /client

COPY "./package.json" .

RUN npm install 

COPY . .

EXPOSE 3000

CMD ["npx", "vite", "--host"]