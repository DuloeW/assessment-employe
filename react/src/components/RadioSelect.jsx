import React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

const RadioSelect = ({ caption, value1, value2, nameInput, onChangeRadio }) => {


    const handleChange = (e) => {
        onChangeRadio(e.target)
    }

    return (
        <FormControl>
            <FormLabel id="demo-row-radio-buttons-group-label"
                style={{ color: '#f0f8ff' }}
            >{caption}</FormLabel>
            <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
            >
                <FormControlLabel
                name={nameInput}
                value={value1}
                control={<Radio />}
                label={value1}
                required
                onChange={(e) => handleChange(e)}
                />

                <FormControlLabel
                name={nameInput}
                value={value2}
                control={<Radio />}
                label={value2}
                required
                onChange={(e) => handleChange(e)}
                />

            </RadioGroup>
        </FormControl>
    );
}


export default RadioSelect
