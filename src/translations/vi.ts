export default {
  // PAGES 
  "login": {
      "welcome": "Chào mừng quay trở lại Histolingo Admin!",
      "logIn": "Đăng nhập",
      "forgotPassword": "Quên mật khẩu?",
  },
  "forgotPassword": {
      "title": "Quên mật khẩu?",
      "instruction": "Đừng lo. Chúng tôi sẽ gửi hướng dẫn cho bạn qua email",
      "sendLink": "Gửi hướng dẫn",
      "backToLogin": "Quay lại đăng nhập"
  },
  "resetPassword": {
      "title": "Đặt lại mật khẩu",
      "instruction": "Điền mật khẩu mới của bạn",
      "resetPassword": "Đặt lại mật khẩu",
      "backToLogin": "Quay lại đăng nhập"
  },
  "adminDashboard": {
    "admin": "admin",
    "title": "Danh sách admin"
},
"createAdmin": {
    "admin": "admin",
    "createAdmin": "Tạo admin",
    "updateAdmin": "Cập nhật admin",
    "inputFields": {
            "firstName": "Tên",
            "lastName": "Họ",
            "adminName": "Tên admin",
            "role": "Vai trò",
            "password": "Mật khẩu (ít nhất 8 ký tự)"
        }
},
"createRole": {
        "role": "vai trò",
        "createRole": "Tạo vai trò",
        "updateAdmin": "Cập nhật vai trò",
        "selectPrivileges": "Chọn ít nhất một quyền",
        "inputFields": {
            "roleName": "Tên vai trò",
            "privilege": "quyền",
        }
    },

    "feedbackDialog": {
      "inputFields": {
          "reply": "trả lời",
          "title": "tiêu đề"
      }
  } 
  ,

  // FORM COMPONENTS
  "status": "Trạng thái",
  "emailInputField": {
      "placeholder": "Điền email",
      "validation": {
          "required": "Email là bắt buộc",
          "invalid": "Email không hợp lệ"
      }
  },
  "passwordInputField": {
      "placeholder": "Điền mật khẩu",
      "validation": {
          "required": "Mật khẩu là bắt buộc",
          "length": "Mật khẩu phải có ít nhất 8 ký tự"
      }
  },
  "confirmPasswordInputField": {
      "placeholder": "Xác nhận mật khẩu",
      "validation": {
          "required": "Xác nhận mật khẩu là bắt buộc",
          "match": "Mật khẩu phải khớp"
      }
  },
  "nonLocaleInputField": {
      "placeholder": "Điền",
      "validation": {
          "required": "là bắt buộc",
          "maxLength1": "phải ít hơn",
          "maxLength2": "ký tự",
          "emptyOrWhitespace": "Không được để trống"
      }
  },
  "multiSelectFieldInput": {
      "validation": {
          "required": "Chọn ít nhất một",
      }
  },

  // REUSABLE COMPONENTS
  "createButtonGroup": {
      "create": "Tạo",
      "cancel": "Huỷ",
      "update": "Cập nhật"
  },
   // TOAST
   "toast": {
    "createSuccess": "Tạo thành công",
    "updateSuccess": "Cập nhật thành công",
    "switchStatusSuccess": "Thay đổi trạng thái thành công",
    "switchStatusFail": "Thay đổi trạng thái không thành công",
    "uploadSuccess": "Tải ảnh lên thành công",
    "error": "Có lỗi xảy ra. Xin thử lại sau",
    "enUS": "Vui lòng điền các trường cho ngôn ngữ tiếng Anh"
}

}