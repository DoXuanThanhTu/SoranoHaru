import cron from "node-cron";
import Movie from "../models/movie.model";

// 🔁 Reset lượt xem hôm nay mỗi 00:00
cron.schedule("0 0 * * *", async () => {
  try {
    console.log("🔄 Reset viewsToday...");
    await Movie.updateMany({}, { $set: { viewsToday: 0 } });
    console.log("✅ Đã reset viewsToday");
  } catch (err) {
    console.error("❌ Lỗi reset viewsToday:", err);
  }
});

// 🔁 Reset lượt xem tháng vào ngày 1 mỗi tháng
cron.schedule("0 0 1 * *", async () => {
  try {
    console.log("🔄 Reset viewsMonth...");
    await Movie.updateMany({}, { $set: { viewsMonth: 0 } });
    console.log("✅ Đã reset viewsMonth");
  } catch (err) {
    console.error("❌ Lỗi reset viewsMonth:", err);
  }
});
