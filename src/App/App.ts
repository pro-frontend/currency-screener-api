import cors from "cors";
import express, { Request, Response } from "express";
import request from "request";
import { getFutures } from "../api/futures";

const App = () => {
	const app = express();
	console.log("started!");
	app.use(cors());

	app.get("/", (req, res) => {
		res.send("Hello World");
	});

	app.get("/futures", (req: Request, res: Response) => {
		getFutures(res);
	});

	app.get("/markets", (req: Request, res: Response) => {
		request("https://ftx.com/api/markets", (err, response, body) => {
			if (err) return res.status(500).send({ message: err });
			console.log("responsed!");
			return res.send(JSON.parse(body));
		});
	});

	app.listen(5000);
};

export { App };
