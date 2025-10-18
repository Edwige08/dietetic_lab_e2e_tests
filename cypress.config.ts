import { defineConfig } from 'cypress'
import path from 'path'

// Read environment variables (if a dotenv dependency is present, try to load a .env file)
try {
    // optional: only attempt to load dotenv if installed locally
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const dotenv = require('dotenv')
    const envPath = path.resolve(process.cwd(), '.env')
    dotenv.config({ path: envPath })
} catch (err) {
    // no-op: dotenv not installed; that's fine — we only attempt to make local dev easier
}

const baseUrl = "https://dietetic-lab.vercel.app"
const apiUrl = "https://dietetic-lab-back.vercel.app" 

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