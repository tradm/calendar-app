import React, { useState } from "react";
import {
  Alert,
  Button,
  Dialog,
  MenuItem,
  Snackbar,
  TextField,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { MobileDateTimePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";

function EditTask(props: {
  item: any;
  tasks: any;
  setTasks: any;
  index: number;
}) {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState(props.item.title);
  const [description, setDescription] = useState(props.item.description);
  const [startDate, setStartDate] = useState(props.item.startDate);
  const [endDate, setEndDate] = useState(props.item.endDate);

  const handleEditTask = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let storeTasks = [...props.tasks];
    storeTasks[props.index] = {
      ...storeTasks[props.index],
      title: title,
      description: description,
      startDate: startDate,
      endDate: endDate,
    };
    localStorage.setItem("tasks", JSON.stringify(storeTasks));
    props.setTasks(storeTasks);
    handleClose();
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
  return (
    <>
      <Dialog
        sx={{
          "& .css-1t1j96h-MuiPaper-root-MuiDialog-paper": {
            borderRadius: "15px",
          },
        }}
        open={open}
        onClose={handleClose}
      >
        <form onSubmit={handleEditTask} className="p-5">
          <h1 className="font-Roboto text-xl font-bold mb-7 text-center">
            Edit Task
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
                defaultValue={title}
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
                defaultValue={description}
              />
            </div>
            <div className="my-3">
              <h3 className="mb-2 font-semibold">Starting Time</h3>
              <MobileDateTimePicker
                defaultValue={dayjs(startDate) as any}
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
                  defaultValue={dayjs(endDate) as any}
                  disablePast
                  minDateTime={dayjs(startDate) as any}
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
                Update
              </Button>
            </div>
          </div>
        </form>
      </Dialog>

      <div
        onClick={() => setOpen(true)}
        className="p-3 border-b border-dashed hover:bg-gray-50 cursor-pointer relative"
        // draggable
      >
        <span
          className={`absolute ${
            props.item.status === "Finished"
              ? "bg-green-200 border-green-500"
              : "bg-orange-200 border-orange-500"
          } border h-2 w-2 top-1 left-1 rotate-45`}
        ></span>
        <p className="text-xs text-gray-500 my-1">
          {props.item.startDate && props.item.endDate && (
            <span>
              {dayjs(props.item.startDate).format("D MMM, h:mm a")} -{" "}
              {dayjs(props.item.endDate).format("D MMM, h:mm a")}
            </span>
          )}
        </p>
        <h2 className="text-sm font-Roboto">{props.item.title}</h2>
        <h3 className="text-xs font-Roboto text-gray-500">
          {props.item.description}
        </h3>
      </div>
    </>
  );
}

export default EditTask;
