import "dotenv/config";  
import app from "./src/app.js";  

const PORT = process.env.PORT || 4000;

// Start server và listen trên port đã định
app.listen(PORT, () => {
  console.log(`✅ Server is running at http://localhost:${PORT}`);
  console.log(`📚 Study English API is ready!`);
});
