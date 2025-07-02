module.exports = function (req, res, next) {
  const allowedOrigins = [
    "https://www.agriweb.com",
    "https://agriweb.com",
    "https://your-frontend-domain.vercel.app", // Thay bằng domain Vercel thực tế
    "http://localhost:8080",
    "http://localhost:3001"
  ];
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    res.setHeader("Access-Control-Allow-Credentials", "true"); // Nếu dùng credentials
  }
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }
  next();
};