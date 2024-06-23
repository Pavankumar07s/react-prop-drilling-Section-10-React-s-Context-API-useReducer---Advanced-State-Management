import {createContext} from 'react'

export const CartContext=createContext({
    items:[],
    AddItemToCart:()=>{},
    UpdateCartItemQuantity:()=>{}
})