import React from "react";
import Drawer from "@mui/material/Drawer";
import SimpleBar from "simplebar-react";
import dayjs from "dayjs";

function Tasks_Drawer(props: {
  openDrawer: any;
  setOpenDrawer: any;
  allTasks: any;
  setAllTasks: any;
}) {
  return (
    <div>
      <Drawer
        anchor="right"
        open={props.openDrawer}
        onClose={() => props.setOpenDrawer(false)}
        sx={{
          "& .css-i9fmh8-MuiBackdrop-root-MuiModal-backdrop": {
            backgroundColor: "transparent",
          },
          "& .css-1160xiw-MuiPaper-root-MuiDrawer-paper": {
            boxShadow:
              "rgba(145, 158, 171, 0.2) 0px 0px 2px 0px,rgba(145, 158, 171, 0.12) 0px 12px 24px -4px",
          },
        }}
      >
        <div className="w-64 pt-4 overflow-hidden">
          <h2 className="font-bold pl-5 border-b pb-2">Tasks</h2>
          <SimpleBar className="max-h-[94vh]" autoHide>
            {props.allTasks?.map((item: any, index: number) => {
              return (
                <div
                  key={index}
                  className="p-3 border-b border-dashed hover:bg-gray-50 cursor-pointer relative"
                  draggable
                >
                  <span
                    className={`absolute ${
                      item.status === "Finished"
                        ? "bg-green-200 border-green-500"
                        : "bg-orange-200 border-orange-500"
                    } border h-2 w-2 top-1 left-1 rotate-45`}
                  ></span>
                  <p className="text-xs text-gray-500 my-1">
                    {item.startDate && item.endDate && (
                      <span>
                        {dayjs(item.startDate).format("D MMM, h:mm a")} -{" "}
                        {dayjs(item.endDate).format("D MMM, h:mm a")}
                      </span>
                    )}
                  </p>
                  <h2 className="text-sm font-Roboto">{item.title}</h2>
                  <h3 className="text-xs font-Roboto text-gray-500">
                    {item.description}
                  </h3>
                </div>
              );
            })}
          </SimpleBar>
        </div>
      </Drawer>
    </div>
  );
}

export default Tasks_Drawer;
