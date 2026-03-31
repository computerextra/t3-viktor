FROM debian:trixie

RUN apt update && apt install git unzip curl -y
RUN curl -fsSL https://bun.com/install | bash

WORKDIR /app
RUN git clone https://github.com/computerextra/t3-viktor.git

WORKDIR /app/t3-viktor

RUN bun install
RUN bun run db:generate
