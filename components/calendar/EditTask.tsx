import React, { useState } from "react";
import { Button } from "@mui/material";
import dayjs from "dayjs";
import MainDialog from "../Styled/MainDialog";
import MainTextField from "../Styled/MainTextField";
import MainMobileDateTimePicker from "../Styled/MainMobileDateTimePicker";
import { alltaskprops, taskItem } from "../../types/tasks";

function EditTask(props: {
  item: taskItem;
  tasks: alltaskprops;
  setTasks: React.Dispatch<React.SetStateAction<alltaskprops | undefined>>;
  index: number;
}) {
  const [open, setOpen] = useState<boolean>(false);
  const [title, setTitle] = useState<string>(props.item.title);
  const [description, setDescription] = useState<string>(
    props.item.description
  );
  const [startDate, setStartDate] = useState<string | Date>(
    props.item.startDate
  );
  const [endDate, setEndDate] = useState<string | Date>(props.item.endDate);

  const handleEditTask = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let storeTasks = [...props.tasks.data];
    storeTasks[props.index] = {
      ...storeTasks[props.index],
      title: title,
      description: description,
      startDate: startDate.toString(),
      endDate: endDate.toString(),
    };
    localStorage.setItem("tasks", JSON.stringify(storeTasks));
    props.setTasks({ data: storeTasks });
    handleClose();
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
    setStartDate("");
    setEndDate("");
    setOpen(false);
  };
  return (
    <>
      <MainDialog open={open} onClose={handleClose}>
        <form onSubmit={handleEditTask} className="p-5">
          <h1 className="font-Roboto text-xl font-bold mb-7 text-center">
            Edit Task
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
                defaultValue={title}
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
                defaultValue={description}
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
                defaultValue={dayjs(endDate) as any}
                disablePast
                minDateTime={dayjs(startDate) as any}
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
                Update
              </Button>
            </div>
          </div>
        </form>
      </MainDialog>

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
