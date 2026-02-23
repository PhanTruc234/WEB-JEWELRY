import { google } from "googleapis"
import nodemailer from "nodemailer"
const oAuth2Client = new google.auth.OAuth2(process.env.CLIENT_IDD, process.env.CLIENT_SECRET, process.env.REDIRECT_URI);
oAuth2Client.setCredentials({ refresh_token: process.env.REFRESH_TOKEN });/**
 * Gửi email khi đơn hàng thanh toán thành công
 * @param {string} recipientEmail - Email khách hàng
 * @param {object} order - Thông tin đơn hàng
 */
export const sendEmail = async (recipientEmail, order) => {
    try {
        const accessToken = await oAuth2Client.getAccessToken();
        console.log(accessToken, "accessTokenaccessToken")
        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 465,
            secure: true,
            auth: {
                type: 'OAuth2',
                user: process.env.USER_EMAIL,
                clientId: process.env.CLIENT_IDD,
                clientSecret: process.env.CLIENT_SECRET,
                refreshToken: process.env.REFRESH_TOKEN,
                accessToken: accessToken.token,
            },
        });
        console.log(process.env.USER_EMAIL, process.env.CLIENT_IDD, process.env.CLIENT_SECRET, process.env.REFRESH_TOKEN, accessToken.token,)
        const itemsHtml = order?.items ? order.items.map(item => `
            <tr>
                <td style="padding: 8px 0;">${item.name}</td>
                <td style="padding: 8px 0; text-align:center;">${item.quantity}</td>
                <td style="padding: 8px 0; text-align:right;">
                    ${Math.ceil(order.tax).toLocaleString()}₫
                </td>
                <td style="padding: 8px 0; text-align:right;">
                    ${Math.ceil(item.totalPrice).toLocaleString()}₫
                </td>
            </tr>
        `).join('') : `<tr>
            <td style="padding: 8px 0;">${order.jewelryType}</td>
            <td style="padding: 8px 0; text-align:center;">${order.quantity}</td>
            <td style="padding: 8px 0; text-align:right;">
                    ${Math.ceil(order.tax).toLocaleString()}₫
                </td>
            <td style="padding: 8px 0; text-align:right;">
                ${Math.ceil(order.subTotal).toLocaleString()}₫
            </td>
        </tr>`;

        const mailOptions = {
            from: `"Liora Jewelry" <${process.env.USER_EMAIL}>`,
            to: recipientEmail,
            subject: `Đơn hàng #${order.orderCode} ${order.paymentStatus === "PAID" ? "đã thanh toán thành công" : "đã mua thành công"}`,
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #ddd; border-radius: 8px; overflow: hidden;">
                    
                    <div style="background: #27ae60; color: white; padding: 20px; text-align: center;">
                        <h2 style="margin: 0;">${order.paymentStatus === "PAID" ? "Thanh toán thành công" : "Mua thành công"}</h2>
                        <p style="margin: 5px 0 0;">Cảm ơn bạn đã mua hàng</p>
                    </div>

                    <div style="padding: 20px;">
                        <p>Xin chào <strong>${recipientEmail}</strong>,</p>
                        <p>${order.paymentStatus === "PAID" ? "Đơn hàng của bạn đã được thanh toán thành công." : "Đơn hàng của bạn đã được mua thành công."} </p>

                        <h3>Thông tin đơn hàng</h3>
                        <p><strong>Mã đơn:</strong> ${order.orderCode}</p>
                        <p><strong>Ngày đặt:</strong> ${new Date(order.createdAt).toLocaleString()}</p>
                        <p><strong>Phương thức thanh toán:</strong> ${order.paymentMethod === "TRANSFER" ? "Chuyển Khoản" : "Tiền Mặt"}</p>
                        <table width="100%" style="border-collapse: collapse; margin-top: 15px;">
                            <thead>
                                <tr style="border-bottom: 1px solid #ddd;">
                                    <th align="left">Sản phẩm</th>
                                    <th align="center">Số lượng</th>
                                    <th align="center">Thuế</th>
                                    <th align="right">Giá</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${itemsHtml}
                            </tbody>
                        </table>

                        <hr style="margin: 20px 0;" />

                        <div style="text-align: right;">
                            <p><strong>Tổng tiền:</strong> 
                                <span style="font-size: 18px; color: #e74c3c;">
                                    ${Math.ceil(order.total).toLocaleString()}₫
                                </span>
                            </p>
                        </div>

                        <p>Chúng tôi sẽ sớm xử lý và giao hàng cho bạn.</p>
                        <p>Nếu bạn có bất kỳ câu hỏi nào, vui lòng liên hệ:
                            <a href="mailto:${process.env.USER_EMAIL}">${process.env.USER_EMAIL}</a>
                        </p>
                    </div>

                    <div style="background: #f4f4f4; text-align: center; padding: 15px; font-size: 13px; color: #777;">
                        © ${new Date().getFullYear()} Liora Jewelry. All rights reserved.
                    </div>
                </div>
            `,
        };

        await transporter.sendMail(mailOptions);
        console.log(`Email xác nhận đơn hàng đã gửi đến ${recipientEmail}`);
    } catch (error) {
        console.error('Lỗi khi gửi email xác nhận đơn hàng:', error.message);
    }
};
