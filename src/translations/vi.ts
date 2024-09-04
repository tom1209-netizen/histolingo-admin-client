import { createCountry } from "../api/country";

export default {
  // PAGES
  login: {
    welcome: "Chào mừng quay trở lại Histolingo Admin!",
    logIn: "Đăng nhập",
    forgotPassword: "Quên mật khẩu?",
  },
  forgotPassword: {
    title: "Quên mật khẩu?",
    instruction: "Đừng lo. Chúng tôi sẽ gửi hướng dẫn cho bạn qua email",
    sendLink: "Gửi hướng dẫn",
    backToLogin: "Quay lại đăng nhập",
  },
  resetPassword: {
    title: "Đặt lại mật khẩu",
    instruction: "Điền mật khẩu mới của bạn",
    resetPassword: "Đặt lại mật khẩu",
    backToLogin: "Quay lại đăng nhập",
  },
  adminDashboard: {
    admin: "admin",
    title: "Danh sách admin",
    table: {
      adminName: "Tên admin",
      createdAt: "Ngày tạo",
      updatedAt: "Ngày sửa cuối",
      supervisor: "Giám sát",
      role: "Vai trò",
      status: "Trạng thái",
      edit: "Sửa admin",
    },
  },
  createAdmin: {
    admin: "admin",
    createAdmin: "Tạo admin",
    updateAdmin: "Cập nhật admin",
    inputFields: {
      firstName: "Tên",
      lastName: "Họ",
      adminName: "Tên admin",
      role: "Vai trò",
      password: "Mật khẩu (ít nhất 8 ký tự)",
    },
  },
  createRole: {
    role: "vai trò",
    createRole: "Tạo vai trò",
    updateAdmin: "Cập nhật vai trò",
    selectPrivileges: "Chọn ít nhất một quyền",
    inputFields: {
      roleName: "Tên vai trò",
      privilege: "quyền",
    },
  },
  roleDashboard: {
    role: "vai trò",
    title: "Danh sách vai trò",
    table: {
      roleName: "Tên vai trò",
      permission: "Các quyền",
    },
  },
  learnerDashboard: {
    learner: "người chơi",
    title: "Danh sách người chơi",
    table: {
      username: "Tên người chơi",
      ranking: "Xếp hạng",
      registrationDate: "Ngày đăng ký",
      totalScore: "Tổng điểm",
      totalTime: "Tổng thời gian chơi",
    },
  },
  countryDashboard: {
    country: "quốc gia",
    title: "Danh sách quốc gia",
    table: {
      countryName: "Tên quốc gia",
    },
  },
  createCountry: {
    country: "quốc gia",
    createCountry: "Tạo quốc gia",
    updateCountry: "Cập nhật quốc gia",
    inputFields: {
      countryName: "Tên quốc gia",
      image: "Ảnh",
    },
  },
  topicDashboard: {
    topic: "chủ đề",
    title: "Danh sách chủ đề",
    table: {
      topicName: "Tên chủ đề",
    },
  },
  createTopic: {
    topic: "chủ đề",
    createTopic: "Tạo chủ đề",
    updateTopic: "Cập nhật chủ đề",
    inputFields: {
      topicName: "Tên chủ đề",
    },
  },
  questionDashboard: {
    question: "câu hỏi",
    title: "Danh sách câu hỏi",
    mcq: "Trắc nghiệm",
    tf: "Đúng sai",
    fill: "Điền từ",
    matching: "Ghép cặp",
  },
  createQuestion: {
    question: "câu hỏi",
    createQuestion: "Tạo câu hỏi",
    updateQuestion: "Cập nhật câu hỏi",
    inputFields: {
      questionName: "Tên câu hỏi",
      questionType: "Loại câu hỏi (chỉ chọn một)",
      answer: "Câu trả lời",
      correct: "Đáp án đúng",
      leftColumn: "Cột trái",
      rightColumn: "Cột phải",
    },
  },
  testDashboard: {
    test: "bài kiểm tra",
    title: "Danh sách bài kiểm tra",
    table: {
      testName: "Tên bài kiểm tra",
      creator: "Người tạo",
      numberOfQuestions: "Số câu hỏi",
      play: "Chơi thử",
    },
  },
  createTest: {
    test: "bài kiểm tra",
    createTest: "Tạo bài kiểm tra",
    updateTest: "Cập nhật bài kiểm tra",
    inputFields: {
      testName: "Tên bài kiểm tra",
      select: "Chọn câu hỏi (ít nhất 5 câu và nhiều nhất 15 câu)",
    },
  },
  documentationDashboard: {
    documentation: "tài liệu",
    title: "Danh sách tài liệu",
    table: {
      documentName: "Tên tài liệu",
      source: "Nguồn",
    },
  },
  createDocumentation: {
    documentation: "tài liệu",
    createDocumentation: "Tạo tài liệu",
    updateDocumentation: "Cập nhật tài liệu",
    inputFields: {
      documentName: "Tên tài liệu",
      source: "Nguồn",
      content: "Nội dung",
    },
  },
  feedbackDashboard: {
    feedback: "feedback",
    title: "Danh sách feedback",
    table: {
      playerName: "Tên người chơi",
      test: "Bài kiểm tra",
      detail: "Xem chi tiết",
    },
  },
  feedbackDialog: {
    title: "Trả lời feedback",
    playerName: "Tên người chơi",
    cancel: "Huỷ",
    send: "Gửi",
    inputFields: {
      replyTitle: "Tiêu đề feedback",
      replyContent: "Trả lời feedback",
    },
  },
  // FORM COMPONENTS
  status: "Trạng thái",
  search: "Tìm kiếm",
  description: "Mô tả",
  image: "Ảnh",
  language: "Ngôn ngữ",
  country: "Quốc gia",
  topic: "Chủ đề",
  documentation: "Tài liệu",
  question: "Câu hỏi",
  questionType: "Loại câu hỏi",
  createdAt: "Ngày tạo",
  updatedAt: "Ngày sửa cuối",
  edit: "Sửa",
  emailInputField: {
    placeholder: "Điền email",
    validation: {
      required: "Email là bắt buộc",
      invalid: "Email không hợp lệ",
    },
  },
  passwordInputField: {
    placeholder: "Điền mật khẩu",
    validation: {
      required: "Mật khẩu là bắt buộc",
      length: "Mật khẩu phải có ít nhất 8 ký tự",
    },
  },
  confirmPasswordInputField: {
    placeholder: "Xác nhận mật khẩu",
    validation: {
      required: "Xác nhận mật khẩu là bắt buộc",
      match: "Mật khẩu phải khớp",
    },
  },
  localeInputField: {
    placeholder: "Điền",
    validation: {
      required: "là bắt buộc",
      maxLength1: "phải ít hơn",
      maxLength2: "ký tự",
      emptyOrWhitespace: "Không được để trống",
    },
  },
  multiSelectFieldInput: {
    validation: {
      required: "Chọn ít nhất một",
    },
  },
  selectInputField: {
    validation: {
      required: "is required",
    },
  },
  selectStatus: {
    active: "Hoạt động",
    inactive: "Không hoạt động",
  },
  dropzone: {
    required: "Ảnh là bắt buộc",
    instruction: "Thả file vào đây hoặc click để chọn file",
  },

  // REUSABLE COMPONENTS
  createButtonGroup: {
    create: "Tạo",
    cancel: "Huỷ",
    update: "Cập nhật",
  },

  sidebar: {
    admin: "Admin",
    role: "Vai trò",
    feedback: "Feedback",
    country: "Quốc gia",
    topic: "Chủ đề",
    question: "Câu hỏi",
    test: "Bài kiểm tra",
    documentation: "Tài liệu",
    learner: "Người chơi",
  },
  navTab: {
    all: "Tất cả",
    active: "Đang hoạt động",
    inactive: "Không hoạt động",
  },
  // TOAST
  toast: {
    createSuccess: "Tạo thành công",
    updateSuccess: "Cập nhật thành công",
    switchStatusSuccess: "Thay đổi trạng thái thành công",
    switchStatusFail: "Thay đổi trạng thái không thành công",
    uploadSuccess: "Tải ảnh lên thành công",
    error: "Có lỗi xảy ra. Xin thử lại sau",
    enUS: "Vui lòng điền các trường cho ngôn ngữ tiếng Anh",
  },
};
