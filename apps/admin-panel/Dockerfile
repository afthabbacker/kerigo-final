FROM node:24.1.0-alpine AS build
WORKDIR /app

COPY ./package.json ./package-lock.json ./decorate-angular-cli.js ./nx.json ./tsconfig.base.json ./
RUN npm ci --force

COPY ./apps/admin-panel ./apps/admin-panel
RUN npx nx build admin-panel --prod


FROM nginx:1.25.1-alpine
COPY ./.nginx/default.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist/apps/admin-panel /usr/share/nginx/html