import React from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Grid2 as Grid } from "@mui/material";
import { useDateRange } from "../../context/DateRangeContext";
import dayjs from "dayjs";

const DateRangePicker: React.FC = () => {
  const { startDate, setStartDate, endDate, setEndDate, handleSubmit } =
    useDateRange();

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Grid container spacing={3} alignItems="center">
        <Grid>
          <DatePicker
            value={dayjs(startDate)}
            label={"Start Date"}
            onChange={(newValue) => {
              setStartDate(newValue ? newValue.format("YYYY-MM-DD") : "");
              handleSubmit();
            }}
          />
        </Grid>
        <Grid>
          <DatePicker
            value={dayjs(endDate)}
            label={"End Date"}
            onChange={(newValue) => {
              setEndDate(newValue ? newValue.format("YYYY-MM-DD") : "");
              handleSubmit();
            }}
          />
        </Grid>
      </Grid>
    </LocalizationProvider>
  );
};

export default DateRangePicker;
