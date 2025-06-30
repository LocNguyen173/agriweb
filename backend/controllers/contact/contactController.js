const nodemailer = require('nodemailer');

// Cấu hình transporter cho nodemailer
const createTransporter = () => {
  return nodemailer.createTransport({
    service: 'gmail', // hoặc service email khác
    auth: {
      user: process.env.EMAIL_USER, // email gửi
      pass: process.env.EMAIL_PASS  // password hoặc app password
    }
  });
};

// Gửi email liên hệ
exports.sendContactEmail = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;
    
    // Validate dữ liệu
    if (!name || !email || !subject || !message) {
      return res.status(400).json({
        success: false,
        message: 'Vui lòng điền đầy đủ thông tin'
      });
    }

    // Email nhận sẽ là chính EMAIL_USER
    const recipientEmail = process.env.EMAIL_USER;
    
    // Sử dụng logo public từ Firebase Storage
    const logoUrl = process.env.LOGO_URL;

    // Log để xác nhận logo url
    console.log('Logo URL:', logoUrl);
    
    const transporter = createTransporter();
    
    // Nội dung email
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: recipientEmail,
      subject: `[BVTV Nam Mekong] Liên hệ mới: ${subject}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Liên hệ mới từ website</title>
        </head>
        <body style="margin: 0; padding: 0; background-color: #f4f4f4; font-family: Arial, sans-serif;">
          <div style="max-width: 600px; margin: 0 auto; background-color: white; border-radius: 10px; overflow: hidden; box-shadow: 0 4px 10px rgba(0,0,0,0.1);">
            
            <!-- Header với logo -->
            <div style="background: linear-gradient(135deg, #2F5435 0%, #4a7c59 100%); padding: 30px; text-align: center;">
              <div style="margin: 0 auto 15px; display: inline-block; background: white; border-radius: 50%; padding: 15px; box-shadow: 0 4px 10px rgba(0,0,0,0.1);">
                <img src="${logoUrl}" alt="BVTV Nam Mekong Logo" style="width: 80px; height: 80px; object-fit: contain; display: block;" />
              </div>
              <h1 style="color: white; margin: 0; font-size: 24px; font-weight: 600;">
                BVTV Nam Mekong
              </h1>
            </div>

            <!-- Nội dung chính -->
            <div style="padding: 30px;">
              <div style="background: #f8fffe; border-left: 4px solid #8CC63F; padding: 20px; border-radius: 5px; margin-bottom: 25px;">
                <div style="margin-bottom: 15px;">
                  <div style="display: inline-block; background: #8CC63F; color: white; padding: 4px 8px; border-radius: 12px; font-size: 12px; font-weight: 600; margin-bottom: 5px;">
                    👤 HỌ VÀ TÊN
                  </div>
                  <p style="margin: 5px 0; font-size: 16px; color: #333; font-weight: 600;">
                    ${name}
                  </p>
                </div>

                <div style="margin-bottom: 15px;">
                  <div style="display: inline-block; background: #3498db; color: white; padding: 4px 8px; border-radius: 12px; font-size: 12px; font-weight: 600; margin-bottom: 5px;">
                    📧 EMAIL
                  </div>
                  <p style="margin: 5px 0; font-size: 16px; color: #333;">
                    <a href="mailto:${email}" style="color: #3498db; text-decoration: none;">${email}</a>
                  </p>
                </div>

                <div style="margin-bottom: 20px;">
                  <div style="display: inline-block; background: #e74c3c; color: white; padding: 4px 8px; border-radius: 12px; font-size: 12px; font-weight: 600; margin-bottom: 5px;">
                    📝 CHỦ ĐỀ
                  </div>
                  <p style="margin: 5px 0; font-size: 16px; color: #333; font-weight: 600;">
                    ${subject}
                  </p>
                </div>

                <div>
                  <div style="display: inline-block; background: #9b59b6; color: white; padding: 4px 8px; border-radius: 12px; font-size: 12px; font-weight: 600; margin-bottom: 10px;">
                    💬 NỘI DUNG TIN NHẮN
                  </div>
                  <div style="background: white; padding: 20px; border-radius: 8px; border: 1px solid #e0e0e0; line-height: 1.6; color: #444;">
                    ${message.replace(/\n/g, '<br>')}
                  </div>
                </div>
              </div>

              <!-- Nút hành động -->
              <div style="text-align: center; margin: 25px 0;">
                <a href="mailto:${email}" style="background: #8CC63F; color: white; padding: 12px 25px; border-radius: 25px; text-decoration: none; font-weight: 600; display: inline-block; box-shadow: 0 3px 10px rgba(140, 198, 63, 0.3);">
                  📩 Phản hồi ngay
                </a>
              </div>
            </div>

            <!-- Footer -->
            <div style="background: #f8f9fa; padding: 20px; text-align: center; border-top: 1px solid #e0e0e0;">
              <p style="margin: 0; color: #666; font-size: 14px; line-height: 1.5;">
                🌱 <strong>BVTV Nam Mekong</strong> - Nhà cung cấp giải pháp bảo vệ thực vật hàng đầu<br>
                📍 E96 đường 56, KDC 586, Phường Phú Thứ, Quận Cái Răng, TP. Cần Thơ<br>
                📞 (922) 3354 2252 | 📧 info@bvtvnammekong.com
              </p>
              <hr style="border: none; border-top: 1px solid #e0e0e0; margin: 15px 0;">
              <p style="margin: 0; color: #999; font-size: 12px;">
                📅 Thời gian nhận: ${new Date().toLocaleString('vi-VN', { 
                  weekday: 'long',
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </p>
            </div>
          </div>
        </body>
        </html>
      `,
      replyTo: email // Cho phép reply trực tiếp đến email người gửi
    };

    // Gửi email
    await transporter.sendMail(mailOptions);
    
    res.status(200).json({
      success: true,
      message: 'Email đã được gửi thành công'
    });
    
  } catch (error) {
    console.error('Lỗi gửi email:', error);
    res.status(500).json({
      success: false,
      message: 'Có lỗi xảy ra khi gửi email'
    });
  }
};
