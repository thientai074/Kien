import dotenv from "dotenv";
dotenv.config({path: `.env.${process.env.NODE_ENV}`})
//Setup môi trường
export const env = {
    dbName: process.env.DB_NAME as string,
    dbHostName: process.env.DB_HOST_NAME as string,
    dbPort: process.env.DB_PORT as string,
    dbUserName: process.env.DB_USER_NAME as string,
    dbPassword: process.env.DB_PASSWORD as string,
    webClient: process.env.WEB_CLIENT as string,
    domainCallback: process.env.DOMAIN_CALLBACK as string,
    nameCookieAff: process.env.NAME_COOKIE_AFF as string,
    affCallback: process.env.AFF_CALLBACK as string,
    encryptObject: process.env.ENCRYPT_OBJECT as string,
    //Thông tin author khi login
    privateKeyAuthorazition: process.env.PRIVATE_KEY_AUTHORAZITION as string,
    nameCookie: process.env.NAME_COOKIE as string,
    //Danh sách tài khoản admin
    listEmailAdmin: process.env.LIST_EMAIL_ADMIN as string,
};
//Msg
export const jwtNotVerify = {error: "Yêu cầu không hợp lệ hoặc không có quyền truy cập"};
export const errorMsg = {error: "Yêu cầu không hợp lệ"};
export const errorNoLife = {error: "Bạn đã hết lượt chơi rồi"};
export const errorGreaterThan = {error: "Dữ liệu đã vượt quá 100"};
export const existedMsg = {error: "Dữ liệu đã tồn tại"};
export const errorUnknown = "Lỗi không xác định";
export const requestGetCoupon = "https://inet.vn/api/campaign/gencoupongiutcohon";
//Thông tin kết quả hiển thị khi find
export const limit = 100;
