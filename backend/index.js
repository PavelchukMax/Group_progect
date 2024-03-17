import express from 'express';
import session from 'express-session';
import cors from 'cors';
import dotenv from 'dotenv';
import YAML from 'yamljs';
import authRoute from './routes/auth.js';
import bookRoute from './routes/books.js';
import RentRoute from './routes/Rents.js';
import sequelize from './db.js';
import swaggerUi from 'swagger-ui-express';

const app = express();
dotenv.config();

const PORT = process.env.PORT || 3001;

const swaggerDocument = YAML.load('./backend/swagger.yaml');

app.use(
  cors({
    origin: 'http://localhost:3000', 
    credentials: true,
  })
);

app.use(express.json());

app.use(
  session({
    secret: '0509', 
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }, 
  })
);

app.use((req, res, next) => {
  console.log(`Request: ${req.method} ${req.url}`);
  console.log('Headers:', req.headers);
  console.log('Session:', req.session); 
  next();
});

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/api/rents',RentRoute)
app.use('/api/auth', authRoute);
app.use('/api/book', bookRoute);


async function start() {
  try {
    await sequelize.sync();
    app.listen(PORT, () => console.log(`Server started on port: ${PORT}`));
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}

start();
