export default {
  // PAGES
  login: {
    welcome: "Welcome back to Histolingo Admin!",
    logIn: "Log in",
    forgotPassword: "Forgot password?",
  },
  forgotPassword: {
    title: "Forgot your password?",
    instruction: "No worries. We will send instruction via email.",
    sendLink: "Send reset link",
    backToLogin: "Back to login",
  },
  resetPassword: {
    title: "Reset your password",
    instruction: "Fill in your new password",
    resetPassword: "Send reset link",
    backToLogin: "Back to login",
  },
  adminDashboard: {
    admin: "admin",
    title: "Admin Dashboard",
  },
  createAdmin: {
    admin: "admin",
    createAdmin: "Create an admin",
    updateAdmin: "Update admin",
    inputFields: {
      firstName: "First name",
      lastName: "Last name",
      adminName: "Admin name",
      role: "Role",
      password: "Password (at least 8 characters)",
    },
  },
  createRole: {
    role: "role",
    createRole: "Create a role",
    updateAdmin: "Update role",
    selectPrivileges: "Select privileges (Multiselect)",
    inputFields: {
      roleName: "Role name",
      privilege: "privilege",
    },
  },
  feedbackDialog: {
    inputFields: {
      reply: "Reply",
      title: "Title",
    },
  },
  profile: {
    title: "My profile",
    fullName: "Full Name",
    adminName: "Admin Name",
    roles: "Roles",
    status: "Status",
    supervisor: "Supervisor",
    createdAt: "Created At",
  },
  // FORM COMPONENTS
  status: "Status",
  emailInputField: {
    placeholder: "Enter email",
    validation: {
      required: "Email is required",
      invalid: "Email is invalid",
    },
  },
  passwordInputField: {
    placeholder: "Enter password",
    validation: {
      required: "Password is required",
      length: "Password must be at least 8 characters",
    },
  },
  confirmPasswordInputField: {
    placeholder: "Enter confirm password",
    validation: {
      required: "Confirm password is required",
      match: "Confirm password must match password",
    },
  },
  localeInputField: {
    placeholder: "Enter",
    validation: {
      required: "is required",
      maxLength1: "must be less than",
      maxLength2: "characters",
      emptyOrWhitespace: "Cannot be empty or whitespace only",
    },
  },
  multiSelectFieldInput: {
    validation: {
      required: "Please select at least one",
    },
  },
  selectInputField: {
    validation: {
      required: "is required",
    },
  },
  selectStatus: {
    active: "Active",
    inactive: "Inactive",
  },
  dropzone: {
    required: "Image is equired",
    instruction: "Drag 'n' drop some files here, or click to select files",
  },
  // REUSABLE COMPONENTS
  createButtonGroup: {
    create: "Create",
    cancel: "Cancel",
    update: "Update",
  },
  sidebar: {
    admin: "Admin",
    role: "Role",
    feedback: "Feedback",
    country: "Country",
    topic: "Topic",
    question: "Question",
    test: "Test",
    documentation: "Document",
    learner: "Learner",
  },
  navTab: {
    all: "All",
    active: "Active",
    inactive: "Inactive",
  }
  ,
  // AVATAR MENu
  avatarMenu: {
    profile: "Profile",
    logout: "Logout",
  },

  // TOAST
  toast: {
    createSuccess: "Created successfully",
    updateSuccess: "Updated successfully",
    switchStatusSuccess: "Switch status success",
    switchStatusFail: "Switch status failed",
    error: "An error occured. Please try again",
    enUS: "Please fill in the name and description for English language.",
    uploadSuccess: "Upload image successfully",
    uploadFail: "Upload image failed",
  },
};
