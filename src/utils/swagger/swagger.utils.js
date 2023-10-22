import CONFIG from "../../config/environment/config.js"
import __dirname from "../../__dirname.js"

export const swaggerOptions = {
      definition: {
            openapi: '3.0.0',
            info: {
                  title: 'Desafío - Documentación de la API',
                  version: '1.0.0',
                  description: `Documentación sobre endpoints de Productos y Carritos. \\n
            Contacto:`,
                  contact: {
                        name: 'Valentín Alvarez',
                        url: 'https://www.linkedin.com/in/valentin-alvarez-bianchi/',
                        email: `${CONFIG.MAIL_HOST}`
                  }
            },
            components: {
                  securitySchemes: {
                        CookieAuth: {
                              type: 'apiKey',
                              in: 'cookie',
                              name: 'auth'
                        }
                  }
            }
      },
      apis: [`${__dirname}/docs/**/*.yaml`]
}