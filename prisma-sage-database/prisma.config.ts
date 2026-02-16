import "dotenv/config"
import {defineConfig, env} from "prisma/config"

export default defineConfig({
    schema: "prisma-sage-database/schema.prisma",
    datasource: {
        url: env("SAGE_DATABASE_URL")
    }
})