import app from "./server";
import * as dotenv from "dotenv";

dotenv.config();

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
