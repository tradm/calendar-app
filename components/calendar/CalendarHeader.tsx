import { Button, Dialog, TextField, Tooltip } from "@mui/material";
import { MobileDateTimePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import localTasks from "@/json/tasks.json";
import AddIcon from "@mui/icons-material/Add";
import MainCalendar from "./MainCalendar";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import Link from "next/link";

function Calendar() {
  const [open, setOpen] = useState(false);
  const [openSnack, setOpenSnack] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [allTasks, setAllTasks] = useState(undefined as any);
  const [startDate, setStartDate] = useState(undefined as any);
  const [endDate, setEndDate] = useState(undefined as any);

  const defaultEndDate = dayjs(startDate).add(1, "hour") as any;

  const handleAddTask = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let newTask: any[] = [];

    if (allTasks) {
      newTask = [
        {
          id: uuidv4().substring(0, 6),
          title: title,
          description: description,
          startDate: startDate,
          endDate: endDate,
          status: "Not Finished",
        },
        ...allTasks,
      ];
    } else {
      newTask = [
        {
          id: uuidv4().substring(0, 6),
          title: title,
          description: description,
          startDate: startDate,
          endDate: endDate,
          status: "Not Finished",
        },
      ];
    }

    localStorage.setItem("tasks", JSON.stringify(newTask));
    setAllTasks(newTask);
    setStartDate(undefined);
    setEndDate(undefined);
    setOpen(false);
  };

  const handleStartDateChange = (value: Date | null) => {
    const date = dayjs(value);
    setStartDate(date.format());
  };

  const handleEndDateChange = (value: Date | null) => {
    const date = dayjs(value);
    setEndDate(date.format());
  };

  const handleClose = () => {
    setStartDate(undefined);
    setEndDate(undefined);
    setOpen(false);
  };

  const handleCloseSnack = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnack(false);
  };

  useEffect(() => {
    if (typeof window !== undefined) {
      const tasks = localStorage.getItem("tasks");
      if (tasks) {
        const data = JSON.parse(tasks as any);
        setAllTasks(data);
      } else {
        localStorage.setItem("tasks", JSON.stringify(localTasks));
        setAllTasks(localTasks);
      }
    }
  }, []);
  return (
    <div>
      <Dialog
        sx={{
          "& .css-1t1j96h-MuiPaper-root-MuiDialog-paper": {
            borderRadius: "15px",
          },
        }}
        open={open}
        onClose={handleClose}
      >
        <form onSubmit={handleAddTask} className="p-5">
          <h1 className="font-Roboto text-xl font-bold mb-7 text-center">
            Add Task
          </h1>
          <div className="w-96">
            <div className="my-3">
              <TextField
                sx={{
                  "& .css-9ddj71-MuiInputBase-root-MuiOutlinedInput-root": {
                    borderRadius: "10px",
                  },
                }}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full"
                id="outlined-basic"
                label="Title"
                variant="outlined"
                required
              />
            </div>
            <div className="my-3">
              <TextField
                sx={{
                  "& .css-9ddj71-MuiInputBase-root-MuiOutlinedInput-root": {
                    borderRadius: "10px",
                  },
                }}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full"
                id="outlined-basic"
                label="Description"
                variant="outlined"
                required
              />
            </div>
            <div className="my-3">
              <h3 className="mb-2 font-semibold">Starting Time</h3>
              <MobileDateTimePicker
                defaultValue={startDate}
                onChange={handleStartDateChange}
                sx={{
                  "& .css-9ddj71-MuiInputBase-root-MuiOutlinedInput-root": {
                    borderRadius: "10px",
                  },
                }}
                className="w-full"
              />
            </div>
            {startDate && (
              <div className="my-3">
                <h3 className="mb-2 font-semibold">Duration Till</h3>
                <MobileDateTimePicker
                  defaultValue={defaultEndDate}
                  disablePast
                  minDateTime={defaultEndDate}
                  onChange={handleEndDateChange}
                  sx={{
                    "& .css-9ddj71-MuiInputBase-root-MuiOutlinedInput-root": {
                      borderRadius: "10px",
                    },
                  }}
                  className="w-full"
                />
              </div>
            )}
            <div className="flex justify-end items-center gap-3 mt-7">
              <Button
                onClick={handleClose}
                className="capitalize bg-gray-50 text-gray-800 hover:bg-gray-200"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="capitalize bg-green-600 text-white hover:bg-green-700"
              >
                Save
              </Button>
            </div>
          </div>
        </form>
      </Dialog>
      <div className="container max-w-6xl m-auto font-Roboto">
        <div className="my-20">
          <div className="flex flex-row justify-between items-center">
            <div>
              <h1 className="font-Roboto text-2xl leading-[36px]">Calendar</h1>
              <div className="flex items-center gap-3">
                <Link
                  href={"/"}
                  className="flex items-center mt-2 text-gray-500 hover:text-gray-700 hover:underline"
                >
                  <FiberManualRecordIcon className={`text-[8px] mr-2`} />
                  <p className="text-xs font-semibold">Tasks</p>
                  <NavigateNextIcon className={`text-base ml-2`} />
                </Link>
                <div className="flex items-center mt-2 text-gray-500">
                  <FiberManualRecordIcon className={`text-[8px] mr-2`} />
                  <p className="text-xs font-semibold">Calendar</p>
                </div>
              </div>
            </div>
            <Tooltip placement="top" title="Create">
              <Button
                onClick={() => setOpen(true)}
                startIcon={<AddIcon />}
                className="capitalize bg-green-600 text-white font-bold hover:bg-green-700 hover:shadow-lg hover:shadow-green-200 px-5"
              >
                New Task
              </Button>
            </Tooltip>
          </div>
          <div className="mt-10">
            <MainCalendar />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Calendar;
