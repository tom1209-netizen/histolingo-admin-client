import Logout from "@mui/icons-material/Logout";
import Avatar from "@mui/material/Avatar";
import { grey } from "@mui/material/colors";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Cookies from "js-cookie";
import * as React from "react";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";
import { getProfile } from "../../api/admin";
import { DataContext } from "./ProfileContext";

export default function AvatarMenu() {
  const context = React.useContext(DataContext);
  if (context === undefined) {
    throw new Error('YourComponent must be used within a DataProvider');
  }
  const { data, loading, error } = context;
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [nameInitial, setNameInitial] = React.useState<string>("");

  const handleLogout = () => {
    Cookies.remove("accessToken");
    Cookies.remove("refreshToken");
    navigate("/login");
  };
  

  // React.useEffect(() => {
  //   const fetchName = async () => {
  //     try {
  //       const response = await getProfile();
  //       const firstNameInitial = response.data.data.firstName[0];
  //       const lastNameInitial = response.data.data.lastName[0];
  //       setNameInitial(firstNameInitial + lastNameInitial);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };
  //   fetchName();
  // }, []);

  // if (loading) return <p>Loading...</p>;
  // if (error) return <p>Error: {error}</p>;

  return (
    <React.Fragment>
      <IconButton
        onClick={handleClick}
        size="small"
        sx={{ ml: 2 }}
        aria-controls={open ? "account-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
      >
        <Avatar sx={{ bgcolor: grey[100], color: grey[800] }}>
          {data?.nameInitial}
        </Avatar>
      </IconButton>

      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&::before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem onClick={handleClose} component={Link} to="/account">
          <Avatar /> {t("avatarMenu.profile")}
        </MenuItem>
        <Divider />

        <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          {t("avatarMenu.logout")}
        </MenuItem>
      </Menu>
    </React.Fragment>
  );
}
