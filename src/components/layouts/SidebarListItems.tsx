import ArticleOutlinedIcon from "@mui/icons-material/ArticleOutlined";
import EmojiEventsOutlinedIcon from "@mui/icons-material/EmojiEventsOutlined";
import LightbulbOutlinedIcon from "@mui/icons-material/LightbulbOutlined";
import LocalLibraryOutlinedIcon from "@mui/icons-material/LocalLibraryOutlined";
import MilitaryTechOutlinedIcon from "@mui/icons-material/MilitaryTechOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import PublicOutlinedIcon from "@mui/icons-material/PublicOutlined";
import SchoolOutlinedIcon from "@mui/icons-material/SchoolOutlined";
import ThumbUpAltOutlinedIcon from "@mui/icons-material/ThumbUpAltOutlined";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import * as React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { getProfile } from "../../api/admin";
import { rolePrivileges } from "../../constant/rolePrivileges";
const MainListItems = () => {
  const { t } = useTranslation();
  const [permissions, setPermissions] = React.useState<number[]>([]);
  React.useEffect(() => {
    const fetchPermissions = async () => {
      try {
        const response = await getProfile();
        const fetchedPermissions = response.data.data.roles
          .map((role) => role.permissions)
          .flat();
        console.log(fetchedPermissions, "fetchedPermissions");
        setPermissions(fetchedPermissions);
        console.log(permissions);
      } catch (error) {
        console.log(error);
      }
    };
    fetchPermissions();
  }, []);

  return (
    <React.Fragment>
      {permissions.includes(rolePrivileges.admin.read) && (
        <ListItemButton component={Link} to="/admin">
          <ListItemIcon>
            <PersonOutlineOutlinedIcon />
          </ListItemIcon>
          <ListItemText primary={t("sidebar.admin")} />
        </ListItemButton>
      )}
      {/* 
      <ListItemButton component={Link} to="/admin">
        <ListItemIcon>
          <PersonOutlineOutlinedIcon />
        </ListItemIcon>
        <ListItemText primary={t("sidebar.admin")} />
      </ListItemButton> */}
      {permissions.includes(rolePrivileges.role.read) && (
        <ListItemButton component={Link} to="/role">
          <ListItemIcon>
            <MilitaryTechOutlinedIcon />
          </ListItemIcon>
          <ListItemText primary={t("sidebar.role")} />
        </ListItemButton>
      )}

      {permissions.includes(rolePrivileges.player.read) && (
        <ListItemButton component={Link} to="/learner">
          <ListItemIcon>
            <LocalLibraryOutlinedIcon />
          </ListItemIcon>
          <ListItemText primary={t("sidebar.learner")} />
        </ListItemButton>
      )}
      {permissions.includes(rolePrivileges.country.read) && (
        <ListItemButton component={Link} to="/country">
          <ListItemIcon>
            <PublicOutlinedIcon />
          </ListItemIcon>
          <ListItemText primary={t("sidebar.country")} />
        </ListItemButton>
      )}
      {permissions.includes(rolePrivileges.topic.read) && (
        <ListItemButton component={Link} to="/topic">
          <ListItemIcon>
            <SchoolOutlinedIcon />
          </ListItemIcon>
          <ListItemText primary={t("sidebar.topic")} />
        </ListItemButton>
      )}
      {permissions.includes(rolePrivileges.question.read) && (
        <ListItemButton component={Link} to="/question">
          <ListItemIcon>
            <LightbulbOutlinedIcon />
          </ListItemIcon>
          <ListItemText primary={t("sidebar.question")} />
        </ListItemButton>
      )}

      {permissions.includes(rolePrivileges.test.read) && (
        <ListItemButton component={Link} to="/playertest">
          <ListItemIcon>
            <EmojiEventsOutlinedIcon />
          </ListItemIcon>
          <ListItemText primary={t("sidebar.test")} />
        </ListItemButton>
      )}
      {permissions.includes(rolePrivileges.documentation.read) && (
        <ListItemButton component={Link} to="/documentation">
          <ListItemIcon>
            <ArticleOutlinedIcon />
          </ListItemIcon>
          <ListItemText primary={t("sidebar.documentation")} />
        </ListItemButton>
      )}
      {permissions.includes(rolePrivileges.feedback.read) && (
        <ListItemButton component={Link} to="/feedback">
          <ListItemIcon>
            <ThumbUpAltOutlinedIcon />
          </ListItemIcon>
          <ListItemText primary={t("sidebar.feedback")} />
        </ListItemButton>
      )}
    </React.Fragment>
  );
};

export default MainListItems;
