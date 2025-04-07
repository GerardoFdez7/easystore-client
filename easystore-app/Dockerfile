FROM node:22.14-alpine AS base

WORKDIR /app

COPY package*.json ./

# Production build stage
FROM base AS production
RUN npm install --only=production
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "run", "start"]

# Development build stage
FROM base AS development
RUN npm install
COPY . .
EXPOSE 3000
CMD ["npm", "run", "dev"]
