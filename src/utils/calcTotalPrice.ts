import {CartItemType} from "../redux/Slices/cartSlice";

export const calcTotalPrice = (items: CartItemType[]) => {
    return items.reduce((sum: number, obj: any) => obj.price * obj.count + sum, 0)
}