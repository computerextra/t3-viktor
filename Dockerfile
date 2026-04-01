FROM oven/bun:1 AS base
WORKDIR /usr/src/app

# RUN apt update && apt install git unzip curl nodejs npm -y
# RUN curl -fsSL https://bun.com/install | bash

WORKDIR /app
RUN git clone https://github.com/computerextra/t3-viktor.git

WORKDIR /app/t3-viktor

RUN bun install --frozen-lockfile
RUN bun run db:generate