export interface Cart {

    countOfItems: number,
    totalPrice: number,
    deliveryFee: number,
    totalPayable: number,
    totalSavings: number,
    userName?: string,
    email?: string,
    mobile?: number,
    deliveryAddress?: {
        name: string,
        mobile: number,
        areaAndStreet: string,
        locality: string,
        cityOrDistrictOrTown: string,
        state: string,
        pincode: string,
        addressType: string
    }
}
