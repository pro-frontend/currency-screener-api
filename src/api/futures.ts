import { Response } from "express";
import request from "request";

export interface FuturesItem {
	ask: number;
	bid: number;
	change1h: number;
	change24h: number;
	changeBod: number;
	volumeUsd24h: number;
	volume: number;
	description: string;
	enabled: boolean;
	expired: boolean;
	expiry: string;
	index: number;
	imfFactor: number;
	last: number;
	lowerBound: number;
	mark: number;
	name: string;
	openInterest: number;
	openInterestUsd: number;
	perpetual: boolean;
	positionLimitWeight: number;
	postOnly: boolean;
	priceIncrement: number;
	sizeIncrement: number;
	underlying: string;
	upperBound: number;
	type: string;
}

export type FuturesList = FuturesItem[];

export interface FuturesResponse {
	success: boolean;
	result: FuturesList;
}

export const getFutures = (res: Response): void => {
	request("https://ftx.com/api/futures", (err, response, body) => {
		if (err) return res.status(500).send({ message: err });
		console.log("responsed!");
		const parsedData = futuresHandler(body);
		// return res.send(body);
		return res.send(parsedData);
	});
};

export const futuresHandler = (body: string): FuturesList => {
	const data: FuturesList = JSON.parse(body).result;
	return data;
};
