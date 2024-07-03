import { app } from "./app";

const start = async () => {
  const port: number = parseInt(process.env.PORT || "3000");

  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
};

start();
