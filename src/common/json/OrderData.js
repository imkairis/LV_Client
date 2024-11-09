import { CartData } from "./CartData";

export const OrderData = [
    {
        id: "DH001",
        orderDate: "17-11-2002",
        products: [...CartData],
        total: 400000,
        status: 1
    },
    {
        id: "DH002",
        orderDate: "17-11-2002",
        products: [...CartData],
        total: 200000,
        status: 2
    },
    {
        id: "DH003",
        orderDate: "17-11-2002",
        products: [...CartData],
        total: 120000,
        status: 3
    },
    {
        id: "DH004",
        orderDate: "17-11-2002",
        products: [...CartData],
        total: 600000,
        status: 4
    },

]