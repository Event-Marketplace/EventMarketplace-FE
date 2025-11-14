FROM node:20-bullseye
WORKDIR /app

# kopiujemy package.json i lockfile
COPY package*.json ./

# instalacja zależności
RUN yarn install --frozen-lockfile

# kopiujemy resztę kodu
COPY . .

EXPOSE 3000

# uruchomienie dev servera dostępnego z zewnątrz
CMD ["yarn", "dev", "-H", "0.0.0.0"]
