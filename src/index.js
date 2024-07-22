import express from 'express'
import { PORT } from './config/config.js'
import usuarioRoutes from './routes/usuario.routes.js'
import incidenciaRoutes from './routes/incidencia.routes.js'
import { corsMiddlewares } from './middlewares/corsMiddlewares.js'

const app = express()
app.use(corsMiddlewares)
app.use(express.json())

app.use('/usuario', usuarioRoutes)
app.use('/incidencia', incidenciaRoutes)

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})
