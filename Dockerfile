# ----------------------
# 1️⃣ Stage build (builder)
# ----------------------
    FROM node:20-bullseye AS builder
    WORKDIR /app
    
    # kopiujemy tylko package.json + package-lock.json
    COPY package*.json ./
    
    # instalacja wszystkich zależności
    RUN npm ci
    
    # kopiujemy resztę kodu
    COPY . .
    
    # build aplikacji (Next.js / React)
    RUN npm run build
    
    # ----------------------
    # 2️⃣ Stage run (runner - produkcja)
    # ----------------------
    FROM node:20-bullseye-slim AS runner
    WORKDIR /app
    
    # kopiujemy tylko build i potrzebne pliki
    COPY --from=builder /app/.next ./.next
    COPY --from=builder /app/public ./public
    COPY --from=builder /app/package*.json ./
    COPY --from=builder /app/.env ./
    
    # instalacja tylko produkcyjnych zależności
    RUN npm ci --omit=dev
    
    EXPOSE 3000
    
    # uruchomienie aplikacji w trybie produkcyjnym
    CMD ["npm", "run", "start"]
    
    # ----------------------
    # 3️⃣ Opcjonalnie Stage dev (npm)
    # ----------------------
    # Jeśli chcesz uruchamiać dev server w Dockerze:
     CMD ["npm", "run", "dev", "--", "-H", "0.0.0.0"]
    