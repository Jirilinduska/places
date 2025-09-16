"use client"

import * as React from 'react';
import dayjs, { Dayjs } from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

type Props = {
    tripDate: Dayjs | null
    setTripDate: React.Dispatch<React.SetStateAction<Dayjs | null>>
}

export const SelectTripDate = ({ tripDate, setTripDate } : Props) => {

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={['DatePicker', 'DatePicker']}>
        <DatePicker
          label="Trip date"
          value={tripDate}
          onChange={(newValue) => setTripDate(newValue)}
          maxDate={dayjs()}
        />
      </DemoContainer>
    </LocalizationProvider>
  );
};