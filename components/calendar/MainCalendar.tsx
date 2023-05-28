import React, { useRef, useState } from "react";
import {
  addDateBy,
  datesAreOnSameDay,
  generateDate,
  getMonday,
  months,
} from "@/utils/calendar";
import dayjs from "dayjs";
import {
  Button,
  FormControl,
  IconButton,
  MenuItem,
  Select,
} from "@mui/material";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import WeeklyCalendar from "./WeeklyCalendar";
const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

function MainCalendar(props: {
  setOpen: any;
  setStartDate: any;
  setOpenDrawer: any;
  allTasks: any;
  setAllTasks: any;
}) {
  const dragDateRef = useRef<any>();
  const dragindexRef = useRef<any>();
  const currentDate = dayjs();
  const [today, setToday] = useState(currentDate);
  const [mondayDate, setMondayDate] = useState(getMonday());
  const [selectDate, setSelectDate] = useState(currentDate);
  const [type, setType] = useState("Month");

  const nextWeek = () => setMondayDate(addDateBy(mondayDate.toDate(), 7));
  const prevWeek = () => setMondayDate(addDateBy(mondayDate.toDate(), -7));

  const drag = (index: any, e: React.DragEvent<HTMLDivElement>) => {
    dragindexRef.current = { index, target: e.target };
  };

  const onDragEnter = (date: any, e: any) => {
    e.preventDefault();
    dragDateRef.current = { date, target: e.target.id };
  };

  const drop = (ev: any) => {
    ev.preventDefault();

    props.setAllTasks((prev: any) =>
      prev.map((ev: any, index: number) => {
        if (index === dragindexRef.current.index) {
          ev.date = dragDateRef.current.date;
        }
        return ev;
      })
    );
  };
  return (
    <div>
      <div className="new-shadow rounded-xl overflow-hidden">
        <div className="flex justify-between items-center p-5">
          {/* Select Calendar Type */}
          <FormControl
            className="text-sm"
            sx={{
              m: 0,
              minWidth: 120,
              "& .css-1yk1gt9-MuiInputBase-root-MuiOutlinedInput-root-MuiSelect-root":
                { borderRadius: "10px" },
              "& .css-11u53oe-MuiSelect-select-MuiInputBase-input-MuiOutlinedInput-input":
                { py: "6px" },
              "& .css-1x7s2qr-MuiInputBase-root-MuiOutlinedInput-root-MuiSelect-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                { borderWidth: 0, borderColor: "transparent" },
            }}
          >
            <Select
              sx={{
                "& .css-1d3z3hw-MuiOutlinedInput-notchedOutline": {
                  borderWidth: 0,
                },
                borderRadius: "10px",
              }}
              className="bg-gray-200 text-sm"
              value={type}
              onChange={(e) => setType(e.target.value)}
              displayEmpty
              inputProps={{ "aria-label": "Without label" }}
            >
              <MenuItem className="text-sm" value={"Month"}>
                Month
              </MenuItem>
              <MenuItem className="text-sm" value={"Week"}>
                Week
              </MenuItem>
            </Select>
          </FormControl>
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
                {mondayDate.date()} {mondayDate.format("MMM")},{" "}
                {mondayDate.year()}
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
              <i className="fa-solid fa-bars-filter m-1 font-bold text-[16px]"></i>
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
                      id={`${currentDate.year()}/${currentDate.month()}/${date}`}
                      onDragEnter={(e) => onDragEnter(dayjs(date), e)}
                      onDragEnd={drop}
                      onClick={() => {
                        props.setStartDate(dayjs(date));
                        props.setOpen(true);
                        // setSelectDate(date);
                      }}
                      key={index}
                      className={`p-2 text-center min-h-[95px] ${
                        sunday === "Sun" ? "border-r-0" : "border-r"
                      } text-sm border-t hover:bg-gray-50 ${
                        today ? "bg-gray-100" : "bg-white"
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
                      {props.allTasks?.map((item: any, index: number) => {
                        const startDate = dayjs(item.startDate);
                        return (
                          datesAreOnSameDay(
                            new Date(item.startDate),
                            new Date(date.format())
                          ) && (
                            <div
                              onDragStart={(e) => drag(index, e)}
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
                      })}
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
