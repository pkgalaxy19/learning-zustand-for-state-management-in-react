import { TextField , Box, FormControl, InputLabel, Select, MenuItem, Button } from '@mui/material';
import React from 'react'
import { useState } from 'react'
import useHabitStore from '../store/store'

const addHabitForm = () => {
    const [name, setName] = useState("");
    const [frequency, setFrequency] = useState<"Daily" | "Weekly">("Daily");
 
    const {habits , addHabit} = useHabitStore();
    console.log(habits);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if(name.trim()){
            addHabit(name, frequency);
            setName("");
        }
    };

  return (
    <form onSubmit={handleSubmit}>
        <Box sx = {{
            display: 'flex',
            gap: 2,
            flexDirection: 'column',
            margin: 'auto'
        }}>
            <TextField 
            label = "Habit Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder='Enter habit name'
            fullWidth            
            />
            <FormControl fullWidth>
                <InputLabel>Frequency</InputLabel>
                <Select
                label = "Frequency"
                value={frequency}
                onChange={(e) => setFrequency(e.target.value as "Daily" | "Weekly")}
                >
                    <MenuItem value="Daily">Daily</MenuItem>
                    <MenuItem value="Weekly">Weekly</MenuItem>
                </Select>
            </FormControl>
            <Button type="submit" variant="contained" color="primary" fullWidth>
                Add Habit
            </Button>
        </Box>
    </form>
  );
}
export default addHabitForm