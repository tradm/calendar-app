import {
  addDateBy,
  datesAreOnSameDay,
  generateDate,
  getMonday,
  months,
} from "@/utils/calendar";
import FilterListIcon from "@mui/icons-material/FilterList";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { Button, IconButton, MenuItem } from "@mui/material";
import dayjs from "dayjs";
import React, { useState } from "react";
import WeeklyCalendar from "./WeeklyCalendar";
import MainFormControl from "../Styled/MainFormControl";
import MainSelect from "../Styled/MainSelect";
import { alltaskprops, taskItem } from "../../types/tasks";

const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

function MainCalendar(props: {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setStartDate: React.Dispatch<React.SetStateAction<string | Date>>;
  setOpenDrawer: React.Dispatch<React.SetStateAction<boolean>>;
  allTasks: alltaskprops;
  setAllTasks: React.Dispatch<React.SetStateAction<alltaskprops | undefined>>;
}) {
  const currentDate = dayjs();
  const [today, setToday] = useState<dayjs.Dayjs>(currentDate);
  const [mondayDate, setMondayDate] = useState<dayjs.Dayjs>(getMonday());
  const [type, setType] = useState<string>("Month");
  const [dragTaskId, setDragTaskId] = useState<string>("");
  const [dragTaskIndex, setDragTaskIndex] = useState<number>(0);
  const [openEdit, setOpenEdit] = useState<boolean>(false);

  const nextWeek = () => setMondayDate(addDateBy(mondayDate.toDate(), 7));
  const prevWeek = () => setMondayDate(addDateBy(mondayDate.toDate(), -7));

  // event type any required here
  const handleSelect = (e: any) => {
    setType(e.target.value);
  };

  return (
    <div>
      <div className="new-shadow rounded-xl overflow-hidden">
        <div className="flex justify-between items-center p-5">
          {/* Select Calendar Type */}
          <MainFormControl className="text-sm">
            <MainSelect
              className="bg-gray-200 text-sm"
              value={type}
              onChange={handleSelect}
              displayEmpty
              inputProps={{ "aria-label": "Without label" }}
            >
              <MenuItem className="text-sm" value={"Month"}>
                Month
              </MenuItem>
              <MenuItem className="text-sm" value={"Week"}>
                Week
              </MenuItem>
            </MainSelect>
          </MainFormControl>
          
          <div className="flex items-center gap-3">
            <IconButton
              onClick={() => {
                if (type === "Month") {
                  setToday(today.month(today.month() - 1));
                } else {
                  prevWeek();
                }
              }}
              size="small"
            >
              <NavigateBeforeIcon />
            </IconButton>
            {type === "Month" ? (
              <h1 className="select-none font-semibold">
                {today.month() === currentDate.month() ? today.date() : "01"}{" "}
                {months[today.month()]}, {today.year()}
              </h1>
            ) : (
              <h1 className="select-none font-semibold">
                {mondayDate.format("MMM")}, {mondayDate.year()}
              </h1>
            )}
            <IconButton
              onClick={() => {
                if (type === "Month") {
                  setToday(today.month(today.month() + 1));
                } else {
                  nextWeek();
                }
              }}
              size="small"
            >
              <NavigateNextIcon />
            </IconButton>
          </div>
          <div className="flex items-center gap-5">
            <Button
              className="bg-orange-600 text-white py-1 rounded-md capitalize hover:bg-orange-700"
              onClick={() => {
                if (type === "Month") {
                  setToday(currentDate);
                } else {
                  setMondayDate(getMonday());
                }
              }}
            >
              Today
            </Button>
            <IconButton onClick={() => props.setOpenDrawer(true)} size="small">
              <FilterListIcon />
            </IconButton>
          </div>
        </div>
        {type === "Month" ? (
          <React.Fragment>
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
                  const sunday = dayjs(date).format("ddd");
                  return (
                    <div
                      title="Double click to add new task"
                      id={`${currentDate.year()}/${currentDate.month()}/${date}`}
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={() => {
                        let newTasks = [...props.allTasks.data];
                        const startD = dayjs(newTasks[dragTaskIndex].startDate);
                        const newStartDate = startD
                          .set("date", date.date())
                          .set("month", date.month());
                        newTasks[dragTaskIndex].startDate =
                          newStartDate.toString();
                        props.setAllTasks({ data: newTasks });
                        localStorage.setItem("tasks", JSON.stringify(newTasks));
                      }}
                      onDoubleClick={() => {
                        props.setStartDate(dayjs(date).toString());
                        props.setOpen(true);
                      }}
                      key={index}
                      className={`p-2 text-center min-h-[95px] ${
                        sunday === "Sun" ? "border-r-0" : "border-r"
                      } text-sm border-t hover:bg-gray-50 ${
                        today ? "bg-gray-100" : "bg-white"
                      }`}
                    >
                      <h1
                        className={`${
                          currentMonth ? "" : "text-gray-400"
                        } select-none text-right`}
                      >
                        {date.date()}
                      </h1>
                      {props.allTasks?.data.map(
                        (item: taskItem, index: number) => {
                          const startDate = dayjs(item.startDate);
                          return (
                            datesAreOnSameDay(
                              new Date(item.startDate),
                              new Date(date.format())
                            ) && (
                              <div
                                onClick={() => setOpenEdit(true)}
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
                                      {startDate.format("h a")}
                                    </span>
                                    {item.title}
                                  </h3>
                                </div>
                              </div>
                            )
                          );
                        }
                      )}
                    </div>
                  );
                }
              )}
            </div>
          </React.Fragment>
        ) : (
          <WeeklyCalendar
            mondayDate={mondayDate}
            setMondayDate={setMondayDate}
            allTasks={props.allTasks}
            setAllTasks={props.setAllTasks}
            setStartDate={props.setStartDate}
            setOpen={props.setOpen}
          />
        )}
      </div>
    </div>
  );
}

export default MainCalendar;

function cn(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}
