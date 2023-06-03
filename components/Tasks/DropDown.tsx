import * as React from "react";
import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteIcon from "@mui/icons-material/Delete";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import EditTask from "./EditTask";
import { useRouter } from "next/router";
import MainBox from "../Styled/MainBox";
import MainMenu from "../Styled/MainMenu";
import MainDivider from "../Styled/MainDivider";
import MainIconButton from "../Styled/MainIconButton";
import { alltaskprops, taskItem } from "../../types/tasks";

export default function DropDown(props: {
  allTasks: alltaskprops;
  setAllTasks: React.Dispatch<React.SetStateAction<alltaskprops | undefined>>;
  item: taskItem;
  index: number;
  setOpenSnack: React.Dispatch<React.SetStateAction<boolean>>;
  handleCloseSnack: (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => void;
}) {
  const router = useRouter();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDelete = () => {
    const newTasks = props.allTasks.data.filter(
      (item: taskItem) => item.id !== props.item.id
    );
    localStorage.setItem("tasks", JSON.stringify(newTasks));
    props.setAllTasks({ data: newTasks });
    handleClose();
  };

  const handleMarkAsFinished = () => {
    let storeTasks = [...props.allTasks.data];
    storeTasks[props.index].status = "Finished";
    localStorage.setItem("tasks", JSON.stringify(storeTasks));
    props.setAllTasks({ data: storeTasks });
    handleClose();
  };
  return (
    <React.Fragment>
      <MainBox>
        <MainIconButton
          onClick={handleClick}
          size="small"
          aria-controls={open ? "account-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
        >
          <MoreVertIcon />
        </MainIconButton>
      </MainBox>
      <MainMenu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        PaperProps={{ elevation: 0 }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        {props.item.status === "Not Finished" && (
          <Box>
            <MenuItem
              className="text-sm rounded-md flex items-center text-green-600"
              onClick={handleMarkAsFinished}
            >
              <FiberManualRecordIcon
                className={`text-[8px] mr-3 text-green-600`}
              />
              <span>Mark As Finished</span>
            </MenuItem>
            <MainDivider className="my-1" />
          </Box>
        )}
        <MenuItem
          className="text-sm rounded-md flex items-center"
          onClick={() =>
            router.push({ pathname: "/calendar", query: { id: props.item.id } })
          }
        >
          <VisibilityIcon className="mr-3 text-base" /> <span>View</span>
        </MenuItem>
        <EditTask
          item={props.item}
          tasks={props.allTasks}
          setTasks={props.setAllTasks}
          closeDropdown={handleClose}
          index={props.index}
          setOpenSnack={props.setOpenSnack}
          handleCloseSnack={props.handleCloseSnack}
        />
        <MainDivider className="my-1" />
        <MenuItem
          className="text-sm rounded-md flex items-center text-orange-600"
          onClick={handleDelete}
        >
          <DeleteIcon className="mr-3 text-base" /> <span>Delete</span>
        </MenuItem>
      </MainMenu>
    </React.Fragment>
  );
}
