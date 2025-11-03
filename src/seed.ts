import { connectDB, seedDummyData } from "./models";

const run = async () => {
  await connectDB();
  await seedDummyData();
  process.exit(0);
};

run();
