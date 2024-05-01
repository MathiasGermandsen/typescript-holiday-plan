// backend/src/index.ts
import cors from 'cors';
import express, { Request, Response } from 'express';
import path from 'path';

interface Holiday {
  id: number;
  name: string;
  date: string;
}

let holidays: Holiday[] = [];

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(path.join('frontend/index.html'))); // Serve static files


app.get('/', (req: Request, res: Response) => {
  res.send('Welcome to the Holiday Planner API!');
});

app.get('/holidays', (req: Request, res: Response) => {
  res.json(holidays);
});

app.post('/holidays', (req: Request, res: Response) => {
  const holiday: Holiday = req.body;
  holidays.push(holiday);
  res.json(holiday);
});

app.delete('/holidays/:id', (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  holidays = holidays.filter(holiday => holiday.id !== id);
  res.json({ message: 'Holiday deleted' });
});

app.listen(5000, () => console.log('Server is running on port 5000'));