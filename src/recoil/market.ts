import {
    atom,
    selector,
} from 'recoil';
import axios from "axios";

export type SellBayState = {
    max_price: number
    min_price: number
    sum_bay_amount: number
    sum_sell_amount: number
    start: string
    end: string
}

//const url = `https://api.flasherup.com/market/sell-bay?start=2022-08-19&end=2022-08-20&breakdown=hour`;
const endpoint = "https://api.flasherup.com";

export const daylyStartDate = atom({
    key: "daylyStartDate",
    default: new Date("2022-08-01")
})

export const daylyEndDate = atom({
    key: "daylyEndDate",
    default: new Date()
})

export const marketSellBayDayly = atom({
    key: "marketSellBayDayly",
    default: [] as SellBayState[]
})

export const fetchSellBay = selector({
    key: "sellBaySelector",
    get: async ({get}) => {
        const start = get(daylyStartDate)
        const end = get(daylyEndDate)
        const url = getSellBayUrl(start, end, "day")
        try {
            const response = await axios.get(url);
            return response.data;
        } catch (error) {
            throw error;
        }
    },
});

const getSellBayUrl = function(start: Date, end: Date, breakdown: string): string {
    const s = dateToString(start);
    const e = dateToString(end);
   return `${endpoint}/market/sell-bay?start=${s}&end=${e}&breakdown=${breakdown}`
}

const dateToString = function(date:Date): string {
    return date.toISOString().substring(0, 10);
}