import React from "react";
import SimpleBar from "simplebar-react";
import EditTask from "./EditTask";
import MainDrawer from "../Styled/MainDrawer";
import { alltaskprops, taskItem } from "../../types/tasks";

function TasksDrawer(props: {
  openDrawer: boolean;
  setOpenDrawer: React.Dispatch<React.SetStateAction<boolean>>;
  allTasks: alltaskprops;
  setAllTasks: React.Dispatch<React.SetStateAction<alltaskprops | undefined>>;
}) {
  return (
    <div>
      <MainDrawer
        anchor="right"
        open={props.openDrawer}
        onClose={() => props.setOpenDrawer(false)}
      >
        <div className="w-64 pt-4 overflow-hidden">
          <h2 className="font-bold pl-5 border-b pb-2">Tasks</h2>
          <SimpleBar className="max-h-[94vh]" autoHide>
            {props.allTasks?.data.map((item: taskItem, index: number) => {
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
      </MainDrawer>
    </div>
  );
}

export default TasksDrawer;
