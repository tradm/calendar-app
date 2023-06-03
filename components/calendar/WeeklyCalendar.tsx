import React, { useState } from "react";
import {
  addDateBy,
  datesAreOnSameDayHour,
  dayHours,
  getWeekDates,
} from "@/utils/calendar";
import dayjs from "dayjs";
import { alltaskprops, taskItem } from "../../types/tasks";

const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

function WeeklyCalendar(props: {
  mondayDate: dayjs.Dayjs;
  setMondayDate: React.Dispatch<React.SetStateAction<dayjs.Dayjs>>;
  setAllTasks: React.Dispatch<React.SetStateAction<alltaskprops | undefined>>;
  allTasks: alltaskprops;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setStartDate: React.Dispatch<React.SetStateAction<string | Date>>;
}) {
  const [dragTaskId, setDragTaskId] = useState<string>("");
  const [dragTaskIndex, setDragTaskIndex] = useState<number>(0);

  return (
    <React.Fragment>
      <div className="flex border-t">
        <div className="w-16">
          <h3 className="w-full h-12 border-b"></h3>
          {dayHours.map((item: { time: string }, index: number) => {
            return (
              <h3
                key={index}
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
                {getWeekDates(days, condate).map(
                  (item: dayjs.Dayjs, index: number) => {
                    const date = dayjs(item);
                    const currentDate = dayjs();

                    return (
                      <div
                        key={index}
                        className={`${
                          date.date() === currentDate.date()
                            ? "bg-gray-50"
                            : "bg-white"
                        } relative`}
                      >
                        <h2
                          title="Double click to add new task"
                          onDragOver={(e) => e.preventDefault()}
                          onDrop={() => {
                            let newTasks = [...props.allTasks.data];
                            const startD = dayjs(
                              newTasks[dragTaskIndex].startDate
                            );
                            const newStartDate = startD
                              .set("date", date.date())
                              .set("hour", date.hour())
                              .set("minute", 0);
                            newTasks[dragTaskIndex].startDate =
                              newStartDate.toString();
                            props.setAllTasks({ data: newTasks });
                            localStorage.setItem(
                              "tasks",
                              JSON.stringify(newTasks)
                            );
                          }}
                          onDoubleClick={() => {
                            props.setStartDate(
                              dayjs(date).set("minute", 0).toString()
                            );
                            props.setOpen(true);
                          }}
                          className={`border-b ${
                            mainIndex !== 6 ? "border-r" : ""
                          } ${index === 0 ? "border-t" : ""} px-2 h-6`}
                        >
                          {props.allTasks?.data.map(
                            (item: taskItem, index: number) => {
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
                            }
                          )}
                        </h2>
                        <h2
                          title="Double click to add new task"
                          onDragOver={(e) => e.preventDefault()}
                          onDrop={() => {
                            let newTasks = [...props.allTasks.data];
                            const startD = dayjs(
                              newTasks[dragTaskIndex].startDate
                            );
                            const newStartDate = startD
                              .set("date", date.date())
                              .set("hour", date.hour())
                              .set("minute", 30);
                            newTasks[dragTaskIndex].startDate =
                              newStartDate.toString();
                            props.setAllTasks({ data: newTasks });
                            localStorage.setItem(
                              "tasks",
                              JSON.stringify(newTasks)
                            );
                          }}
                          onDoubleClick={() => {
                            props.setStartDate(
                              dayjs(date).set("minute", 30).toString()
                            );
                            props.setOpen(true);
                          }}
                          className={`border-b ${
                            mainIndex !== 6 ? "border-r" : ""
                          } ${index} px-2 h-6 border-b-gray-100`}
                        >
                          {props.allTasks?.data.map(
                            (item: taskItem, index: number) => {
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
                            }
                          )}
                        </h2>
                      </div>
                    );
                  }
                )}
              </div>
            );
          })}
        </div>
      </div>
    </React.Fragment>
  );
}

export default WeeklyCalendar;
