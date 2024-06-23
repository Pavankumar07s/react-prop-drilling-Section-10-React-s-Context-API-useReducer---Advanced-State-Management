import { createContext,useState,useReducer} from 'react'
import { DUMMY_PRODUCTS } from '../dummy-products';
export const CartContext=createContext({
    items:[],
    AddItemToCart:()=>{},
    UpdateCartItemQuantity:()=>{}
})
// function shopingCartReducer(state,action){
//   if()
//     return state;
// }
export default function CartContextProvider({children}){
    // const [shoppingCartState,shoppingCartDispatch]=useReducer(shopingCartReducer,{
    //     items: [],
    //   })

    const [shoppingCart, setShoppingCart] = useState({
        items: [],
      });
    
      function handleAddItemToCart(id) {
        // shoppingCartDispatch({
        //   type:'ADD_ITEM',
        //   payload:id,
        // })
        setShoppingCart((prevShoppingCart) => {
          const updatedItems = [...prevShoppingCart.items];
    
          const existingCartItemIndex = updatedItems.findIndex(
            (cartItem) => cartItem.id === id
          );
          const existingCartItem = updatedItems[existingCartItemIndex];
    
          if (existingCartItem) {
            const updatedItem = {
              ...existingCartItem,
              quantity: existingCartItem.quantity + 1,
            };
            updatedItems[existingCartItemIndex] = updatedItem;
          } else {
            const product = DUMMY_PRODUCTS.find((product) => product.id === id);
            updatedItems.push({
              id: id,
              name: product.title,
              price: product.price,
              quantity: 1,
            });
          }
    
          return {
            items: updatedItems,
          };
        });
      }
    
      function handleUpdateCartItemQuantity(productId, amount) {
        setShoppingCart((prevShoppingCart) => {
          const updatedItems = [...prevShoppingCart.items];
          const updatedItemIndex = updatedItems.findIndex(
            (item) => item.id === productId
          );
    
          const updatedItem = {
            ...updatedItems[updatedItemIndex],
          };
    
          updatedItem.quantity += amount;
    
          if (updatedItem.quantity <= 0) {
            updatedItems.splice(updatedItemIndex, 1);
          } else {
            updatedItems[updatedItemIndex] = updatedItem;
          }
    
          return {
            items: updatedItems,
          };
        });
      }
      const ctxValue={
        items:shoppingCart.items,
        AddItemToCart:handleAddItemToCart,
        UpdateCartItemQuantity:handleUpdateCartItemQuantity,
      }
      return<CartContext.Provider value={ctxValue}>{children}</CartContext.Provider>
      
}