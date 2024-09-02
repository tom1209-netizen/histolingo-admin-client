import * as React from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import LocalLibraryOutlinedIcon from "@mui/icons-material/LocalLibraryOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import PublicOutlinedIcon from "@mui/icons-material/PublicOutlined";
import SchoolOutlinedIcon from "@mui/icons-material/SchoolOutlined";
import QuizIcon from '@mui/icons-material/Quiz';
import LightbulbOutlinedIcon from "@mui/icons-material/LightbulbOutlined";
import EmojiEventsOutlinedIcon from "@mui/icons-material/EmojiEventsOutlined";
import ArticleOutlinedIcon from "@mui/icons-material/ArticleOutlined";
import ThumbUpAltOutlinedIcon from "@mui/icons-material/ThumbUpAltOutlined";
import MilitaryTechOutlinedIcon from "@mui/icons-material/MilitaryTechOutlined";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const MainListItems = () => {
  const { t } = useTranslation();
  return (
    <React.Fragment>
      <ListItemButton component={Link} to="/admin">
        <ListItemIcon>
          <PersonOutlineOutlinedIcon />
        </ListItemIcon>
        <ListItemText primary={t("sidebar.admin")} />
      </ListItemButton>
      <ListItemButton component={Link} to="/role">
        <ListItemIcon>
          <MilitaryTechOutlinedIcon />
        </ListItemIcon>
        <ListItemText primary={t("sidebar.role")} />
      </ListItemButton>
      <ListItemButton component={Link} to="/learner">
        <ListItemIcon>
          <LocalLibraryOutlinedIcon />
        </ListItemIcon>
        <ListItemText primary={t("sidebar.learner")} />
      </ListItemButton>
      <ListItemButton component={Link} to="/country">
        <ListItemIcon>
          <PublicOutlinedIcon />
        </ListItemIcon>
        <ListItemText primary={t("sidebar.country")} />
      </ListItemButton>
      <ListItemButton component={Link} to="/topic">
        <ListItemIcon>
          <SchoolOutlinedIcon />
        </ListItemIcon>
        <ListItemText primary={t("sidebar.topic")} />
      </ListItemButton>
      <ListItemButton component={Link} to="/question">
        <ListItemIcon>
          <LightbulbOutlinedIcon />
        </ListItemIcon>
        <ListItemText primary={t("sidebar.question")} />
      </ListItemButton>
      <ListItemButton component={Link} to="/playertest">
        <ListItemIcon>
          <EmojiEventsOutlinedIcon />
        </ListItemIcon>
        <ListItemText primary={t("sidebar.test")} />
      </ListItemButton>
      <ListItemButton component={Link} to="/documentation">
        <ListItemIcon>
          <ArticleOutlinedIcon />
        </ListItemIcon>
        <ListItemText primary={t("sidebar.documentation")} />
      </ListItemButton>
      <ListItemButton component={Link} to="/feedback">
        <ListItemIcon>
          <ThumbUpAltOutlinedIcon />
        </ListItemIcon>
        <ListItemText primary={t("sidebar.feedback")}/>
      </ListItemButton>
    <ListItemButton component={Link} to="/testplay">
        <ListItemIcon>
            <QuizIcon />
        </ListItemIcon>
        <ListItemText primary="Test Play" />
    </ListItemButton>

    </React.Fragment>
  );
};

export default MainListItems;
