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
    
    const transporter = createTransporter();
    
    // Nội dung email
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: recipientEmail,
      subject: `[BVTV Nam Mekong] Liên hệ mới: ${subject}`,
      html: `
        <h2>Thông tin liên hệ mới từ website</h2>
        <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <p><strong>Họ và tên:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Chủ đề:</strong> ${subject}</p>
          <p><strong>Nội dung:</strong></p>
          <div style="background: white; padding: 15px; border-radius: 5px; margin-top: 10px;">
            ${message.replace(/\n/g, '<br>')}
          </div>
        </div>
        <hr>
        <p style="color: #666; font-size: 12px;">
          Email này được gửi từ form liên hệ trên website BVTV Nam Mekong<br>
          Thời gian: ${new Date().toLocaleString('vi-VN')}
        </p>
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
