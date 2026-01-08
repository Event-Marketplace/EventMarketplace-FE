# 1️⃣ Stage build (builder)
FROM node:20-bullseye AS builder
WORKDIR /app

# kopiujemy tylko package.json + lockfile
COPY package*.json ./

# instalacja wszystkich zależności (dev + prod)
RUN npm ci

# kopiujemy cały kod
COPY . .

# budujemy aplikację (np. Next.js, React)
RUN npm run build

# 2️⃣ Stage run (runner)
FROM node:20-bullseye-slim AS runner
WORKDIR /app

# kopiujemy tylko gotowy build i potrzebne pliki
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/package*.json ./

# instalacja tylko produkcyjnych zależności
RUN npm ci --omit=dev

EXPOSE 3000

# uruchomienie aplikacji w trybie produkcyjnym
CMD ["npm", "run", "start"]
