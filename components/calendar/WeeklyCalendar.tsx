import React, { useState } from "react";
const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
import {
  addDateBy,
  generateDateWeek,
  getHours,
  getMonday,
} from "@/utils/calendar";
import dayjs from "dayjs";

function WeeklyCalendar(props: { mondayDate: any; setMondayDate: any }) {
  const currentDate = dayjs();
  const [today, setToday] = useState(currentDate);

  // console.log(getHours());

  return (
    <React.Fragment>
      <div className="grid grid-cols-7 border-t">
        {days.map((day, index) => {
          const condate = addDateBy(props.mondayDate.toDate(), index);
          return (
            <h1
              key={index}
              className="text-sm text-center h-12 grid place-content-center text-gray-500 select-none"
            >
              {day} {condate.month()} / {condate.date()}
            </h1>
          );
        })}
      </div>
      <div></div>
    </React.Fragment>
  );
}

export default WeeklyCalendar;
