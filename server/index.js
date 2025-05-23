import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import helmet from 'helmet';
import morgan from 'morgan';
import kpiRoutes from './routes/kpi.js';
import productRoutes from './routes/product.js';
import transactionRoutes from './routes/transaction.js';
import Transaction from './models/Transaction.js';
import Product from './models/Product.js';
import KPI from './models/KPI.js';
import { kpis, products, transactions } from './data/data.js';





//configurations
dotenv.config();

const app = express();


app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({policy: "cross-origin"}));
app.use(morgan("common"));
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}));
app.use(cors());


app.get('/', (req, res) => {
    res.send('Backend is live and working!');
  });

  
/*Routes */
app.use('/kpi', kpiRoutes);
app.use('/product', productRoutes)
app.use('/transaction', transactionRoutes);



/* DB connection */
const PORT = process.env.PORT || 9000;

mongoose.connect(process.env.MONGODB_URL).then(async() =>{
    app.listen(PORT, () => console.log(`connected to server on Port ${PORT}`));

    //ADD DATA AS NEEDED TO DATABASE OR AS NECESSARY
    // await mongoose.connection.db.dropDatabase();
    // KPI.insertMany(kpis);
    // Product.insertMany(products);
    // Transaction.insertMany(transactions);

}).catch((error) => console.log(`${error} could not connect to server`))
