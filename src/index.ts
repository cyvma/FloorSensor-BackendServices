import express, { NextFunction, Request, Response } from "express";
import cors from "cors";

const app = express();

app.use((request: Request, response: Response, next: NextFunction) => {
  response.header("Access-Control-Allow-Origin", "*");
  response.header("Access-Control-Allow-Methods", "GET, POST");
  next();
});
app.use(cors());
app.use(express.urlencoded({ extended: true }));

let alertData = {
  isAlert: false,
};

let data = {
  waterLevel: "",
};

app.get("/getAlertStatus", (request: Request, response: Response) => {
  response.status(200).send(alertData);
});

app.post("/postAlertState", (request: Request, response: Response) => {
  alertData = {
    isAlert: !alertData.isAlert,
  };

  response.status(200).send("ok");
});

app.get("/getDeviceState", (request: Request, response: Response) => {
  response.status(200).send(data);
});

app.post("/postDeviceState", (request: Request, response: Response) => {
  const { waterLevel } = request.body;

  data = {
    waterLevel,
  };
  response.status(200).send("ok");
});

app.listen(5174, () => {
  console.log("Server is running on port 5174");
});

export default app;
