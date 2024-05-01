// frontend/src/App.tsx
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

interface Holiday {
  id: number;
  name: string;
  date: string;
}

const HolidayForm: React.FC = () => {
  const [name, setName] = useState('');
  const [date, setDate] = useState(new Date());

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const holiday = { id: Date.now(), name, date: date.toISOString() };
    await axios.post('http://localhost:5000/holidays', holiday);
    setName('');
    setDate(new Date());
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" value={name} onChange={e => setName(e.target.value)} required />
      <DatePicker selected={date} onChange={date => setDate(date as Date)} />
      <button type="submit">Add Holiday</button>
    </form>
  );
};

const HolidayList: React.FC = () => {
  const [holidays, setHolidays] = useState<Holiday[]>([]);

  useEffect(() => {
    const fetchHolidays = async () => {
      const res = await axios.get('http://localhost:5000/holidays');
      setHolidays(res.data);
    };
    fetchHolidays();
  }, []);

  return (
    <ul>
      {holidays.map(holiday => (
        <li key={holiday.id}>
          {holiday.name} - {new Date(holiday.date).toLocaleDateString()}
        </li>
      ))}
    </ul>
  );
};

const App: React.FC = () => (
  <div>
    <h1>Holiday Planner</h1>
    <HolidayForm />
    <HolidayList />
  </div>
);

export default App;