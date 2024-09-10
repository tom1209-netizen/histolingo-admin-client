import { t } from "i18next";

export default {
  // PAGES
  login: {
    welcome: "Welcome back to Histolingo Admin!",
    logIn: "Log in",
    forgotPassword: "Forgot password?",
    validation: {
        invalid: "Invalid email or password",
        inactive: "User not found",
        unexpectedError: "An unexpected error occurred. Please try again.",
    }
  },
  forgotPassword: {
    title: "Forgot your password?",
    instruction: "No worries. We will send instruction via email.",
    sendLink: "Send reset link",
    backToLogin: "Back to login",
    result: {
        failedToSend: "Failed to send password reset instructions. Please try again.",
        success: "Password reset instructions sent to your email.",
        unexpectedError: "An unexpected error occurred. Please try again.",
    }
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
    table: {
      adminName: "Admin name",
      createdAt: "Created At",
      updatedAt: "Updated At",
      supervisor: "Supervisor",
      role: "Roles",
      status: "Status",
      edit: "Edit admin",
    },
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
    validation: {
        exist: "Admin name or email already existed",
    }
  },
  createRole: {
    role: "role",
    createRole: "Create a role",
    updateRole: "Update role",
    selectPrivileges: "Select privileges (Multiselect)",
    inputFields: {
      roleName: "Role name",
      privilege: "privilege",
    },
  },
  roleDashboard: {
    role: "role",
    title: "Role Dashboard",
    table: {
      roleName: "Role name",
      permission: "Permissions",
      createdAt: "Created At",
      updatedAt: "Updated At",
      status: "Status",
      edit: "Edit role",
    },
  },
  learnerDashboard: {
    learner: "learner",
    title: "Learner Dashboard",
    table: {
      username: "Username",
      createdAt: "Created At",
      updatedAt: "Updated At",
      status: "Status",
      ranking: "Ranking",
      registrationDate: "Registration Date",
      totalScore: "Total Score",
      totalTime: "Total Time",
    },
  },
  countryDashboard: {
    country: "country",
    title: "Country Dashboard",
    table: {
      countryName: "Country name",
      description: "Description",
      image: "Image",
      createdAt: "Created At",
      updatedAt: "Updated At",
      status: "Status",
      edit: "Edit country",
    },
  },
  createCountry: {
    country: "country",
    createCountry: "Create a country",
    updateCountry: "Update country",
    inputFields: {
      countryName: "Country name",
    },
  },
  topicDashboard: {
    topic: "topic",
    title: "Topic Dashboard",
    table: {
      topicName: "Topic name",
    },
  },
  createTopic: {
    topic: "topic",
    createTopic: "Create a topic",
    updateTopic: "Update topic",
    inputFields: {
      topicName: "Topic name",
    },
  },
  questionDashboard: {
    question: "question",
    title: "Question Dashboard",
    mcq: "Multiple Choice",
    tf: "True/False",
    fill: "Fill in the blank",
    matching: "Matching",
  },
  createQuestion: {
    question: "question",
    createQuestion: "Create a question",
    updateQuestion: "Update question",
    inputFields: {
      questionName: "Question name",
      questionType: "Question type (choose one only)",
      answer: "Answer",
      correct: "Correct answer",
      leftColumn: "Left column",
      rightColumn: "Right column",
      addPair: "Add pair",
      deletePair: "Delete pair",
    },
  },
  testDashboard: {
    test: "test",
    title: "Test Dashboard",
    table: {
      testName: "Test name",
      creator: "Creator",
      numberOfQuestions: "No. of questions",
      play: "Play test",
    },
  },
  createTest: {
    test: "test",
    createTest: "Create a test",
    updateTest: "Update test",
    inputFields: {
      testName: "Test name",
      select: "Select questions (min 5 questions and max 15 questions)",
    },
    validation: {
      selectMin: "Please select at least",
      selectMax: "Please select at most",
      question: "question",
    },
  },
  documentationDashboard: {
    documentation: "document",
    title: "Documentation Dashboard",
    table: {
      documentName: "Document name",
      source: "Source",
    },
  },
  createDocumentation: {
    documentation: "document",
    createDocumentation: "Create a documentation",
    updateDocumentation: "Update documentation",
    inputFields: {
      documentName: "Document name",
      source: "Source",
      content: "Content",
    },
  },
  testPlay: {
    testPlay: "Test Play",
    next: "Next",
    previous: "Previous",
    submit: "Submit",
  },
  testResult: {
    testResult: "Test Result",
    youAnswered: "You answered",
    correct: "correctly",
    time: "Time taken:",
    retake: "Retake Test",
    back: "Go back to test dashboard",
  },

  feedbackDashboard: {
    feedback: "feedback",
    title: "Feedback Dashboard",
    table: {
      playerName: "Player name",
      test: "Test",
      detail: "See detail",
    },
  },
  feedbackDialog: {
    title: "Reply Feedback",
    playerName: "Player's name",
    cancel: "Cancel",
    send: "Send",
    inputFields: {
      replyTitle: "Reply title",
      replyContent: "Reply content",
    },
  },
  profile: {
    title: "Welcome to Histolingo Admin",
    fullName: "Full Name",
    adminName: "Admin Name",
    roles: "Roles",
    status: "Status",
    supervisor: "Supervisor",
    createdAt: "Created At",
  },
  notFound: {
    title: "404 Not Found",
    backToHome: "Back to home",
  },

  // FORM COMPONENTS
  status: "Status",
  search: "Search",
  description: "Description",
  image: "Image",
  language: "Language",
  country: "Country",
  topic: "Topic",
  question: "Question",
  questionType: "Question Type",
  documentation: "Document",
  createdAt: "Created At",
  updatedAt: "Updated At",
  edit: "Edit",
  answerRequired: "Answer is required",
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
  selectTF: {
    true: "True",
    false: "False",
  },
  dropzone: {
    required: "Image is equired",
    instruction: "Drag 'n' drop a file here, or click to select file",
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
  },
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
    enUS: "Please fill information for English language.",
    uploadSuccess: "Upload image successfully",
    uploadFail: "Upload image failed",
    atLeastOnePair: "Please create at least one pair",
  },
};
