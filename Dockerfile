# Dockerfile for Portainer

# use the official Bun image
# see all versions at https://hub.docker.com/r/oven/bun/tags
FROM oven/bun:debian

RUN sudo apt-get update && sudo apt-get install -y git

WORKDIR /usr/src/app

RUN git clone https://github.com/computerextra/t3-viktor.git

WORKDIR /usr/src/app/t3-viktor

RUN bun install
RUN bun run db:generate
RUN bun run build
RUN bun run start