import express, {Application} from 'express';

const app: Application = express()
const port = 5001

app.get('/', (req,res) => {
    res.send('<h1>Twitter clone API</h1>');
})

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
  });