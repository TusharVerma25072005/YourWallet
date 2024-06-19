import express from 'express';
import UserRouter from './routes/user';
import AccountRouter from './routes/account';
import cors from 'cors';
const app  = express();
app.use(cors());
app.use(express.json());
app.use('/users', UserRouter);
app.use('/accounts', AccountRouter);

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});