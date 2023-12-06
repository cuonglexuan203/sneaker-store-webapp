FROM node:18-alpine AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY package.json package-lock.json ./
RUN  npm install --production

FROM node:18-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

ENV NEXT_TELEMETRY_DISABLED 1

RUN npm run build

FROM node:18-alpine AS runner
WORKDIR /app

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1
# 
ENV NEXTAUTH_URL=http://localhost:3000
ENV NEXTAUTH_SECRET=bij/T5daKnaEgdn0eFvyX6CAHD/gClvH5slv7uZiNrQ=
ENV GITHUB_ID=cfb5e10b4fb70eb5c4c3
ENV GITHUB_SECRET=a8b0c08a25018ecdb895bef33ceb8405203378ee
ENV GOOGLE_CLIENT_ID=801694130525-kpbonotkui4f5bk1ioaf4f7u4n1fk0tr.apps.googleusercontent.com
ENV GOOGLE_CLIENT_SECRET=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
ENV FACEBOOK_CLIENT_ID=643241468024507
ENV FACEBOOK_CLIENT_SECRET=56f98f878986111561c83d4da1b9e7e1


RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder --chown=nextjs:nodejs /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

USER nextjs

EXPOSE 3000

ENV PORT 3000

CMD ["npm", "start"]
