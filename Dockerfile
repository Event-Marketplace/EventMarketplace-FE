# ----------------------
# Stage 1: builder (instaluje wszystko)
# ----------------------
    FROM node:20-bullseye AS builder
    WORKDIR /app
    
    # kopiujemy package.json i package-lock.json
    COPY package*.json ./
    
    # instalacja wszystkich zależności dev + prod
    RUN npm ci
    
    # kopiujemy resztę kodu
    COPY . .
    
    # ----------------------
    # Stage 2: dev runner
    # ----------------------
    FROM node:20-bullseye AS dev
    WORKDIR /app
    
    # kopiujemy wszystko z buildera
    COPY --from=builder /app ./
    
    EXPOSE 3000
    
    # uruchomienie dev servera z hot-reload
    CMD ["npm", "run", "dev", "--", "-H", "0.0.0.0"]
    