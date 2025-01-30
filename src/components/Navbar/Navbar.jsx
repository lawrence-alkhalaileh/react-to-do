import { Link } from "react-router-dom";
import {
  Card,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
} from "@material-tailwind/react";
import {
  UserCircleIcon,
  PowerIcon,
} from "@heroicons/react/24/solid";

import { Assignment, Dashboard, Article } from '@mui/icons-material';

function Navbar() {
  return (
    <Card className="flex flex-row items-center justify-between top-0 w-full p-4 shadow-xl shadow-blue-gray-900/5 bg-[#2973B2] rounded-none">
      <div className="mb-2 p-4">
        <Typography variant="h5" color="blue-gray" className="text-white">
          <Link to='/'>To-Do List</Link>
        </Typography>
      </div>
      <List className="flex flex-row gap-6 items-center hidden md:flex">
        <ListItem className="flex items-center">
          <Link to='/task' className="flex items-center text-white">
            <ListItemPrefix>
              <Assignment className="h-5 w-5" />
            </ListItemPrefix>
            Task
          </Link>
        </ListItem>

        <ListItem className="flex items-center">
          <Link to='/dashboard' className="flex items-center text-white">
            <ListItemPrefix>
              <Dashboard className="h-5 w-5" />
            </ListItemPrefix>
            Dashboard
          </Link>
        </ListItem>

        <ListItem className="flex items-center">
          <Link to='/articles' className="flex items-center text-white">
            <ListItemPrefix>
              <Article className="h-5 w-5" />
            </ListItemPrefix>
            Articles
          </Link>
        </ListItem>

        <ListItem className="flex items-center">
          <Link to='/profile' className="flex items-center text-white">
            <ListItemPrefix>
              <UserCircleIcon className="h-5 w-5" />
            </ListItemPrefix>
            Profile
          </Link>
        </ListItem>

        <ListItem className="flex items-center min-w-[150px]">
          <Link to='/logout' className="flex items-center text-white">
            <ListItemPrefix>
              <PowerIcon className="h-5 w-5" />
            </ListItemPrefix>
            Log Out
          </Link>
        </ListItem>
      </List>

      {/* Mobile Menu */}
      <div className="md:hidden">
        <List className="flex flex-row gap-4 items-center">
          <ListItem className="flex items-center">
            <Link to='/task' className="text-white">
              Task
            </Link>
          </ListItem>
          <ListItem className="flex items-center">
            <Link to='/dashboard' className="text-white">
              Dashboard
            </Link>
          </ListItem>
          <ListItem className="flex items-center">
            <Link to='/articles' className="text-white">
              Articles
            </Link>
          </ListItem>
          <ListItem className="flex items-center">
            <Link to='/profile' className="text-white">
              Profile
            </Link>
          </ListItem>
          <ListItem className="flex items-center">
            <Link to='/logout' className="text-white">
              Log Out
            </Link>
          </ListItem>
        </List>
      </div>
    </Card>
  );
}

export default Navbar;
