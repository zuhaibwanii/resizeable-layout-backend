import express from "express"
import cors from "cors"

const app = express()
let baseEndpoint = process.env.API_BASE_ENDPOINT;

app.use(cors())

app.all('*', (req, res, next) => {
    req.header("Access-Control-Allow-Origin : *");
    res.header("Access-Control-Allow-Origin : *");
    next();
});

app.use(express.json({ limit: "16kb" }))
app.use(express.urlencoded({ extended: true, limit: "16kb" }))

//routes import
import windowRouter from './routes/window.routes.js'

//routes declaration
app.use(`${baseEndpoint}`, windowRouter)


app.get('/', (_req, res) => res.send('Backend health ok!'));

export { app }