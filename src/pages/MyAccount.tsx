import { MilitaryTech } from "@mui/icons-material";
import AccessTimeFilledIcon from "@mui/icons-material/AccessTimeFilled";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import BadgeIcon from "@mui/icons-material/Badge";
import SpokeIcon from "@mui/icons-material/Spoke";
import SupervisedUserCircleIcon from "@mui/icons-material/SupervisedUserCircle";
import {
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@mui/material";
import React, { useEffect } from "react";
import { toast } from "react-toastify";
import { getProfile } from "../api/admin";
import { formatTimestamp } from "../utils/formatTime";
import { useTranslation } from "react-i18next";
import { LoadingForm } from "../components/reusable/Loading";
const MyAccount = () => {
  const { t } = useTranslation();
  const [profile, setProfile] = React.useState<any>(null);
  const [loading, setLoading] = React.useState<boolean>(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await getProfile();
        console.log(response);
        setProfile(response.data.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
        toast.error(t("toast.error"));
      }
    };
    fetchProfile();
  }, []);

  if (loading) {
    return <LoadingForm />;
  }

  return (
    <>
      <h1>{t("profile.title")}</h1>
      <List sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
        <ListItem>
          <ListItemAvatar>
            <Avatar>
              <AccountCircleIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText
            primary={profile.firstName + " " + profile.lastName}
            secondary={t("profile.fullName")}
          />
        </ListItem>

        <ListItem>
          <ListItemAvatar>
            <Avatar>
              <BadgeIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText
            primary={profile.adminName}
            secondary={t("profile.adminName")}
          />
        </ListItem>

        <ListItem>
          <ListItemAvatar>
            <Avatar>
              <AlternateEmailIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary={profile.email} secondary="Email" />
        </ListItem>

        <ListItem>
          <ListItemAvatar>
            <Avatar>
              <MilitaryTech />
            </Avatar>
          </ListItemAvatar>
          <ListItemText
            primary={profile.roles}
            secondary={t("profile.roles")}
          />
        </ListItem>

        <ListItem>
          <ListItemAvatar>
            <Avatar>
              <SpokeIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText
            primary={profile.status === 1 ? "Active" : "Inactive"}
            secondary={t("profile.status")}
          />
        </ListItem>

        <ListItem>
          <ListItemAvatar>
            <Avatar>
              <SupervisedUserCircleIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText
            primary={profile.supervisorId}
            secondary={t("profile.supervisor")}
          />
        </ListItem>

        <ListItem>
          <ListItemAvatar>
            <Avatar>
              <AccessTimeFilledIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText
            primary={formatTimestamp(profile.createdAt)}
            secondary={t("profile.createdAt")}
          />
        </ListItem>
      </List>
    </>
  );
};

export default MyAccount;
