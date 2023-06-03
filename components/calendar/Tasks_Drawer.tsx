import React from "react";
import Drawer from "@mui/material/Drawer";
import SimpleBar from "simplebar-react";
import dayjs from "dayjs";
import Edit_Task from "../Tasks/Edit_Task";
import EditTask from "./EditTask";
import { Button } from "@mui/material";

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
                <React.Fragment key={index}>
                  <EditTask
                    item={item}
                    tasks={props.allTasks}
                    setTasks={props.setAllTasks}
                    index={index}
                  />
                </React.Fragment>
              );
            })}
          </SimpleBar>
        </div>
      </Drawer>
    </div>
  );
}

export default Tasks_Drawer;
