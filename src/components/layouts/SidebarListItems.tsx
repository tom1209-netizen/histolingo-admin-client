import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import LocalLibraryOutlinedIcon from '@mui/icons-material/LocalLibraryOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import PublicOutlinedIcon from '@mui/icons-material/PublicOutlined';
import SchoolOutlinedIcon from '@mui/icons-material/SchoolOutlined';
import LightbulbOutlinedIcon from '@mui/icons-material/LightbulbOutlined';
import EmojiEventsOutlinedIcon from '@mui/icons-material/EmojiEventsOutlined';
import ThumbUpAltOutlinedIcon from '@mui/icons-material/ThumbUpAltOutlined';
import { Link } from 'react-router-dom';

export const mainListItems = (
  <React.Fragment>

    <ListItemButton component={Link} to="/admin">
      <ListItemIcon>
        <PersonOutlineOutlinedIcon />
      </ListItemIcon>
      <ListItemText primary="Admin" />
    </ListItemButton>
    <ListItemButton component={Link} to="/learner">
      <ListItemIcon>
        <LocalLibraryOutlinedIcon />
      </ListItemIcon>
      <ListItemText primary="Learner" />
    </ListItemButton>
    <ListItemButton component={Link} to="/country">
      <ListItemIcon>
        <PublicOutlinedIcon />
      </ListItemIcon>
      <ListItemText primary="Country" />
    </ListItemButton>
    <ListItemButton component={Link} to="/topic">
      <ListItemIcon>
        <SchoolOutlinedIcon />
      </ListItemIcon>
      <ListItemText primary="Topic" />
    </ListItemButton>
    <ListItemButton component={Link} to="/question">
      <ListItemIcon>
        <LightbulbOutlinedIcon />
      </ListItemIcon>
      <ListItemText primary="Question" />
    </ListItemButton>
    <ListItemButton component={Link} to="/test">
      <ListItemIcon>
        <EmojiEventsOutlinedIcon />
      </ListItemIcon>
      <ListItemText primary="Test" />
    </ListItemButton>
    <ListItemButton component={Link} to="/feedback">
      <ListItemIcon>
        <ThumbUpAltOutlinedIcon />
      </ListItemIcon>
      <ListItemText primary="Feedback" />
    </ListItemButton>
  </React.Fragment>
);
