export interface Cart {

    countOfItems: number,
    totalPrice: number,
    deliveryFee: number,
    totalPayable: number,
    totalSavings: number,
    userName?: {
        firstName: string,
        lastName: string
    },
    deliveryAddress?: any
    email?: string,
    mobile?: number
}
