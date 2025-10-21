import { defineConfig } from 'cypress'
import path from 'path'

// Read environment variables from .env file
try {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const dotenv = require('dotenv')
    const envPath = path.resolve(process.cwd(), '.env')
    dotenv.config({ path: envPath })
} catch (err) {
    // no-op: dotenv not installed; that's fine — we only attempt to make local dev easier
}

// Use environment variables with fallback to default values for backward compatibility
const baseUrl = process.env.CYPRESS_BASE_URL || "https://dietetic-lab.vercel.app"
const apiUrl = process.env.CYPRESS_API_URL || "https://dietetic-lab-back.vercel.app" 

export default defineConfig({
    e2e: {
        // front-end where Cypress will navigate
        baseUrl,

        setupNodeEvents(on, config) {
            // Example: you can add node event handlers here (task, file:preprocessor, etc.)
            // Keep the config object in case other tooling wants to mutate it.
            return config
        },

        env: {
            // make the API url available in tests as Cypress.env('apiUrl')
            apiUrl,
        },

        defaultCommandTimeout: 10000,
        viewportWidth: 1280,
        viewportHeight: 720,

        chromeWebSecurity: false,
        retries: {
            runMode: 2,
            openMode: 0,
        },
    },
})