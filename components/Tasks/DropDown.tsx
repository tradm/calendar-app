import * as React from "react";
import Box from "@mui/material/Box";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import IconButton from "@mui/material/IconButton";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteIcon from "@mui/icons-material/Delete";
import { Divider } from "@mui/material";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import Edit_Task from "./Edit_Task";
import { useRouter } from "next/router";

export default function DropDown(props: {
  allTasks: any;
  setAllTasks: any;
  item: any;
  index: number;
  setOpenSnack: any;
  handleCloseSnack: any;
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
    const newTasks = props.allTasks.filter(
      (item: any, index: number) => item.id !== props.item.id
    );
    localStorage.setItem("tasks", JSON.stringify(newTasks));
    props.setAllTasks(newTasks);
    handleClose();
  };

  const handleMarkAsFinished = () => {
    let storeTasks = [...props.allTasks];
    storeTasks[props.index].status = "Finished";
    localStorage.setItem("tasks", JSON.stringify(storeTasks));
    props.setAllTasks(storeTasks);
    handleClose();
  };
  return (
    <React.Fragment>
      <Box sx={{ display: "flex", alignItems: "center", textAlign: "center" }}>
        <IconButton
          onClick={handleClick}
          size="small"
          sx={{ ml: 2 }}
          aria-controls={open ? "account-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
        >
          <MoreVertIcon />
        </IconButton>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            borderRadius: "10px",
            boxShadow:
              "0px 0px 2px 0px rgba(145, 158, 171, 0.2), 0px 12px 24px -4px rgba(145, 158, 171, 0.12)",
            mt: 0,
            px: 1,
          },
        }}
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
              <span>Mark As Finshed</span>
            </MenuItem>
            <Divider sx={{ borderStyle: "dashed" }} className="my-1" />
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
        <Edit_Task
          item={props.item}
          tasks={props.allTasks}
          setTasks={props.setAllTasks}
          closeDropdown={handleClose}
          index={props.index}
          setOpenSnack={props.setOpenSnack}
          handleCloseSnack={props.handleCloseSnack}
        />
        <Divider sx={{ borderStyle: "dashed" }} className="my-1" />
        <MenuItem
          className="text-sm rounded-md flex items-center text-orange-600"
          onClick={handleDelete}
        >
          <DeleteIcon className="mr-3 text-base" /> <span>Delete</span>
        </MenuItem>
      </Menu>
    </React.Fragment>
  );
}
