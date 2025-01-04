import { defineConfig } from "drizzle-kit";
import "dotenv/config"


export default ({
  dialect: "postgresql", 
  schema: "./src/model/model.ts",
  out: "./drizzle",
  dbCredentials: {
    
    url:process.env.DATABASE_URL as string
  },
});