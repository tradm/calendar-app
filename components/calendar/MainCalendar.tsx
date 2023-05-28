import React, { useState } from "react";
import { generateDate, months } from "@/utils/calendar";
import dayjs from "dayjs";
import { Button, IconButton } from "@mui/material";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import AssignmentIcon from "@mui/icons-material/Assignment";

function MainCalendar(props: { setOpen: any; setStartDate: any }) {
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const currentDate = dayjs();
  const [today, setToday] = useState(currentDate);
  const [selectDate, setSelectDate] = useState(currentDate);

  console.log(today);

  return (
    <div>
      <div className="new-shadow rounded-xl overflow-hidden">
        <div className="flex justify-between items-center p-5">
          <IconButton size="small">
            <AssignmentIcon />
          </IconButton>
          <div className="flex items-center gap-3">
            <IconButton
              onClick={() => {
                setToday(today.month(today.month() - 1));
              }}
              size="small"
            >
              <NavigateBeforeIcon />
            </IconButton>
            <h1 className="select-none font-semibold">
              {today.month() === currentDate.month() ? today.date() : "01"}{" "}
              {months[today.month()]}, {today.year()}
            </h1>
            <IconButton
              onClick={() => {
                setToday(today.month(today.month() + 1));
              }}
              size="small"
            >
              <NavigateNextIcon />
            </IconButton>
          </div>
          <Button
            className="bg-orange-600 text-white py-1 rounded-md capitalize hover:bg-orange-700"
            onClick={() => {
              setToday(currentDate);
            }}
          >
            Today
          </Button>
        </div>
        <div className="grid grid-cols-7 border-t">
          {days.map((day, index) => {
            return (
              <h1
                key={index}
                className="text-sm text-center h-12 grid place-content-center text-gray-500 select-none"
              >
                {day}
              </h1>
            );
          })}
        </div>
        <div className="grid grid-cols-7 gbor">
          {generateDate(today.month(), today.year()).map(
            ({ date, currentMonth, today }, index) => {
              return (
                <div
                  onDrag={(e) => console.log(e)}
                  draggable
                  onClick={() => {
                    props.setStartDate(dayjs(date));
                    props.setOpen(true);
                    // setSelectDate(date);
                  }}
                  key={index}
                  className={`p-2 text-center min-h-[95px] border-r text-sm border-t hover:bg-gray-50 ${
                    today ? "bg-gray-50" : "bg-white"
                  } ${
                    selectDate.toDate().toDateString() ===
                    date.toDate().toDateString()
                      ? "text-orange-600"
                      : ""
                  }`}
                >
                  <h1
                    className={`${
                      currentMonth ? "" : "text-gray-400"
                    } select-none text-right`}
                  >
                    {date.date()}
                  </h1>
                </div>
              );
            }
          )}
        </div>
      </div>
    </div>
  );
}

export default MainCalendar;

function cn(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}
