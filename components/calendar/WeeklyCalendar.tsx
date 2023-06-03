import React, { useState } from "react";
const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
import {
  addDateBy,
  datesAreOnSameDayHour,
  dayHours,
  getWeekDates,
} from "@/utils/calendar";
import dayjs from "dayjs";

function WeeklyCalendar(props: {
  mondayDate: any;
  setMondayDate: any;
  setAllTasks: any;
  allTasks: any;
  setOpen: any;
  setStartDate: any;
}) {
  const currentDate = dayjs();
  const [today, setToday] = useState(currentDate);
  const [dragTaskId, setDragTaskId] = useState("");
  const [dragTaskIndex, setDragTaskIndex] = useState(0);

  return (
    <React.Fragment>
      <div className="flex border-t">
        <div className="w-16">
          <h3 className="w-full h-12 border-b"></h3>
          {dayHours.map((item: any, index: number) => {
            return (
              <h3
                className={`w-full h-6 flex items-center border-r border-b justify-center text-sm ${
                  item.time === "" ? "border-b-gray-100" : ""
                }`}
              >
                {item.time}
              </h3>
            );
          })}
        </div>
        <div className="w-full grid grid-cols-7">
          {days.map((day, index) => {
            const condate = addDateBy(props.mondayDate.toDate(), index);
            const mainIndex = index;
            return (
              <div key={index}>
                <h1 className="text-sm text-center h-12 grid place-content-center text-gray-500 select-none">
                  {day} {condate.month()} / {condate.date()}
                </h1>
                {getWeekDates(days, condate).map((item: any, index: number) => {
                  const date = dayjs(item);
                  const currentDate = dayjs();

                  return (
                    <div
                      key={index}
                      className={`${
                        date.date() === currentDate.date()
                          ? "bg-gray-50"
                          : "bg-white"
                      }`}
                    >
                      <h2
                        title="Double click to add new task"
                        onDragOver={(e) => e.preventDefault()}
                        onDrop={() => {
                          const task = props.allTasks?.filter(
                            (item: any) => item.id === dragTaskId
                          );
                          let newTasks = [...props.allTasks];
                          const startD = dayjs(
                            newTasks[dragTaskIndex].startDate
                          );
                          const newStartDate = startD
                            .set("date", date.date())
                            .set("hour", date.hour())
                            .set("minute", 0);
                          newTasks[dragTaskIndex].startDate = newStartDate;
                          props.setAllTasks(newTasks);
                          localStorage.setItem(
                            "tasks",
                            JSON.stringify(newTasks)
                          );
                        }}
                        onDoubleClick={() => {
                          props.setStartDate(dayjs(date).set("minute", 0));
                          props.setOpen(true);
                          // setSelectDate(date);
                        }}
                        className={`border-b ${
                          mainIndex !== 6 ? "border-r" : ""
                        } ${index === 0 ? "border-t" : ""} px-2 h-6`}
                      >
                        {props.allTasks?.map((item: any, index: number) => {
                          const startDate = dayjs(item.startDate);
                          return (
                            datesAreOnSameDayHour(
                              new Date(item.startDate),
                              new Date(date.format())
                            ) && (
                              <>
                                {startDate.minute() >= 0 &&
                                  startDate.minute() < 29 && (
                                    <div
                                      // onClick={() => setOpenEdit(true)}
                                      key={index}
                                      onDragStart={() => {
                                        setDragTaskId(item.id);
                                        setDragTaskIndex(index);
                                      }}
                                      draggable
                                      className={`${
                                        item.status === "Finished"
                                          ? "bg-green-200 text-green-700 border-green-500"
                                          : "bg-orange-200 text-orange-700 border-orange-500"
                                      } border mb-1 rounded-md hover:cursor-pointer`}
                                    >
                                      <div className="px-1 w-full">
                                        <h3 className="line-clamp-2 overflow-ellipsis text-left">
                                          <span className="text-xs font-bold mr-1 whitespace-nowrap">
                                            {startDate.format("h:mm a")}
                                          </span>
                                          {item.title}
                                        </h3>
                                      </div>
                                    </div>
                                  )}
                              </>
                            )
                          );
                        })}
                      </h2>
                      <h2
                        title="Double click to add new task"
                        onDragOver={(e) => e.preventDefault()}
                        onDrop={() => {
                          const task = props.allTasks?.filter(
                            (item: any) => item.id === dragTaskId
                          );
                          let newTasks = [...props.allTasks];
                          const startD = dayjs(
                            newTasks[dragTaskIndex].startDate
                          );
                          const newStartDate = startD
                            .set("date", date.date())
                            .set("hour", date.hour())
                            .set("minute", 30);
                          newTasks[dragTaskIndex].startDate = newStartDate;
                          props.setAllTasks(newTasks);
                          localStorage.setItem(
                            "tasks",
                            JSON.stringify(newTasks)
                          );
                        }}
                        onDoubleClick={() => {
                          props.setStartDate(dayjs(date).set("minute", 30));
                          props.setOpen(true);
                          // setSelectDate(date);
                        }}
                        className={`border-b ${
                          mainIndex !== 6 ? "border-r" : ""
                        } ${index} px-2 h-6 border-b-gray-100`}
                      >
                        {props.allTasks?.map((item: any, index: number) => {
                          const startDate = dayjs(item.startDate);
                          return (
                            datesAreOnSameDayHour(
                              new Date(item.startDate),
                              new Date(date.format())
                            ) && (
                              <>
                                {startDate.minute() >= 30 &&
                                  startDate.minute() <= 60 && (
                                    <div
                                      // onClick={() => setOpenEdit(true)}
                                      key={index}
                                      onDragStart={() => {
                                        setDragTaskId(item.id);
                                        setDragTaskIndex(index);
                                      }}
                                      draggable
                                      className={`${
                                        item.status === "Finished"
                                          ? "bg-green-200 text-green-700 border-green-500"
                                          : "bg-orange-200 text-orange-700 border-orange-500"
                                      } border mb-1 rounded-md hover:cursor-pointer`}
                                    >
                                      <div className="px-1 w-full">
                                        <h3 className="line-clamp-2 overflow-ellipsis text-left">
                                          <span className="text-xs font-bold mr-1 whitespace-nowrap">
                                            {startDate.format("h:m a")}
                                          </span>
                                          {item.title}
                                        </h3>
                                      </div>
                                    </div>
                                  )}
                              </>
                            )
                          );
                        })}
                      </h2>
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
    </React.Fragment>
  );
}

export default WeeklyCalendar;
