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

export const mainListItems = (
  <React.Fragment>

    <ListItemButton>
      <ListItemIcon>
        <PersonOutlineOutlinedIcon />
      </ListItemIcon>
      <ListItemText primary="Admin" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <LocalLibraryOutlinedIcon />
      </ListItemIcon>
      <ListItemText primary="Learner" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <PublicOutlinedIcon />
      </ListItemIcon>
      <ListItemText primary="Country" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <SchoolOutlinedIcon />
      </ListItemIcon>
      <ListItemText primary="Topic" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <LightbulbOutlinedIcon />
      </ListItemIcon>
      <ListItemText primary="Question" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <EmojiEventsOutlinedIcon />
      </ListItemIcon>
      <ListItemText primary="Test" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <ThumbUpAltOutlinedIcon />
      </ListItemIcon>
      <ListItemText primary="Feedback" />
    </ListItemButton>
  </React.Fragment>
);
