import { Alert, Button, Snackbar, Tooltip } from "@mui/material";
import React, { useEffect, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import Link from "next/link";
import SimpleBar from "simplebar-react";
import localTasks from "@/json/tasks.json";
import { v4 as uuidv4 } from "uuid";
import DropDown from "./DropDown";
import dayjs from "dayjs";
import MainDialog from "../Styled/MainDialog";
import MainTextField from "../Styled/MainTextField";
import MainMobileDateTimePicker from "../Styled/MainMobileDateTimePicker";
import { alltaskprops, taskItem, newtaskprops } from "../../types/tasks";

function TaskList() {
  const [open, setOpen] = useState<boolean>(false);
  const [openSnack, setOpenSnack] = useState<boolean>(false);
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [allTasks, setAllTasks] = useState<alltaskprops>();
  const [startDate, setStartDate] = useState<string | Date>("");
  const [endDate, setEndDate] = useState<string | Date>("");

  const defaultStartDate = dayjs();
  const defaultEndDate = dayjs(startDate).add(1, "hour") as any;

  const handleAddTask = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let newTask: newtaskprops = { data: [] };

    if (allTasks?.data) {
      newTask.data = [
        {
          id: uuidv4().substring(0, 6),
          title: title,
          description: description,
          startDate: startDate.toString(),
          endDate: endDate.toString(),
          status: "Not Finished",
        },
        ...allTasks.data,
      ];
    } else {
      newTask.data = [
        {
          id: uuidv4().substring(0, 6),
          title: title,
          description: description,
          startDate: startDate.toString(),
          endDate: endDate.toString(),
          status: "Not Finished",
        },
      ];
    }

    localStorage.setItem("tasks", JSON.stringify(newTask.data));
    setAllTasks(newTask);
    setStartDate("");
    setEndDate("");
    setOpen(false);
  };

  //event type any required here
  const handleStartDateChange = (value: any) => {
    const date = dayjs(value);
    setStartDate(date.format());
  };

  //event type any required here
  const handleEndDateChange = (value: any) => {
    const date = dayjs(value);
    setEndDate(date.format());
  };

  const handleClose = () => {
    setStartDate(dayjs().toString());
    setEndDate("");
    setOpen(false);
  };

  const handleCloseSnack = (
    _event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnack(false);
  };

  useEffect(() => {
    setStartDate(defaultStartDate.toString());
    if (typeof window !== undefined) {
      const tasks = localStorage.getItem("tasks");
      if (tasks) {
        const data = JSON.parse(tasks as string);
        setAllTasks({ data: data });
      } else {
        localStorage.setItem("tasks", JSON.stringify(localTasks));
        setAllTasks({ data: localTasks });
      }
    }
  }, []);

  return (
    <>
      <Snackbar
        open={openSnack}
        autoHideDuration={3000}
        onClose={handleCloseSnack}
      >
        <Alert
          onClose={handleCloseSnack}
          severity="success"
          sx={{ width: "100%" }}
        >
          Update Successfull!
        </Alert>
      </Snackbar>
      <MainDialog open={open} onClose={handleClose}>
        <form onSubmit={handleAddTask} className="p-5">
          <h1 className="font-Roboto text-xl font-bold mb-7 text-center">
            Add Task
          </h1>
          <div className="w-96">
            <div className="my-3">
              <MainTextField
                onChange={(e) => setTitle(e.target.value)}
                className="w-full"
                id="outlined-basic"
                label="Title"
                variant="outlined"
                required
              />
            </div>
            <div className="my-3">
              <MainTextField
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
              <MainMobileDateTimePicker
                defaultValue={dayjs(startDate) as any}
                onChange={handleStartDateChange}
                className="w-full"
              />
            </div>
            <div className="my-3">
              <h3 className="mb-2 font-semibold">Duration Till</h3>
              <MainMobileDateTimePicker
                defaultValue={defaultEndDate}
                disablePast
                minDateTime={defaultEndDate}
                onChange={handleEndDateChange}
                className="w-full"
              />
            </div>
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
      </MainDialog>
      <div className="container max-w-6xl px-5 xl:px-0 m-auto font-Roboto">
        <div className="my-20">
          <div className="flex flex-row justify-between items-center">
            <div>
              <h1 className="font-Roboto text-2xl leading-[36px]">Task List</h1>
              <div className="flex items-center gap-3">
                <div className="flex items-center mt-2 text-gray-500">
                  <p className="text-xs font-semibold">Tasks</p>
                </div>
                <Link
                  href={"/calendar"}
                  className="flex items-center mt-2 text-gray-500 hover:text-gray-700 hover:underline"
                >
                  <FiberManualRecordIcon className={`text-[8px] mr-2`} />
                  <p className="text-xs font-semibold">Calendar</p>
                </Link>
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
          <div className="mt-10 new-shadow rounded-lg overflow-hidden">
            <div className="font-semibold text-sm font-Roboto grid grid-cols-12 p-5 bg-[#f4f6f8] rounded-t-lg gap-3">
              <p>ID</p>
              <p className="col-span-3 ml-3 sm:ml-0">Title</p>
              <p className="col-span-3">Starting Time</p>
              <p className="col-span-2">Duration Till</p>
              <p className="col-span-2">Status</p>
            </div>
            <SimpleBar className="max-h-[60vh]" autoHide>
              {allTasks?.data.map((item: taskItem, index: number) => (
                <div
                  key={index}
                  className="font-normal text-sm font-Roboto items-center grid grid-cols-12 p-5 hover:bg-[#f4f6f8] gap-3 border-b"
                >
                  <p>{item.id}</p>
                  <Link
                    href={{ pathname: "/calendar", query: { id: item.id } }}
                    className="col-span-3 lg:mr-5 ml-3 sm:ml-0 line-clamp-2 overflow-ellipsis hover:underline text-gray-800 hover:text-green-500"
                  >
                    {item.title}
                  </Link>
                  <p className="col-span-3">
                    {item.startDate && (
                      <span>
                        {dayjs(item.startDate).format("D MMM, h:mm a")}
                      </span>
                    )}
                  </p>
                  <p className="col-span-2">
                    {item.endDate && (
                      <span>{dayjs(item.endDate).format("D MMM, h:mm a")}</span>
                    )}
                  </p>
                  <div className="flex items-center col-span-2">
                    <FiberManualRecordIcon
                      className={`text-[8px] mr-2 ${
                        item.status === "Finished"
                          ? "text-green-500"
                          : "text-orange-500"
                      }`}
                    />
                    <p>{item.status}</p>
                  </div>
                  <div>
                    <DropDown
                      allTasks={allTasks}
                      setAllTasks={setAllTasks}
                      index={index}
                      item={item}
                      setOpenSnack={setOpenSnack}
                      handleCloseSnack={handleCloseSnack}
                    />
                  </div>
                </div>
              ))}
            </SimpleBar>
          </div>
        </div>
      </div>
    </>
  );
}

export default TaskList;
