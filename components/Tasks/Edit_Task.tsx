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

function Edit_Task(props: {
  item: any;
  tasks: any;
  setTasks: any;
  closeDropdown: any;
  index: number;
  setOpenSnack: any;
  handleCloseSnack: any;
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
    props.setOpenSnack(true);
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
    props.closeDropdown();
  };
  return (
    <div>
      <MenuItem
        className="text-sm rounded-md flex items-center"
        onClick={() => setOpen(true)}
      >
        <EditIcon className="mr-3 text-base" /> <span>Edit</span>
      </MenuItem>

      {/* Edit Dialog */}
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
    </div>
  );
}

export default Edit_Task;
