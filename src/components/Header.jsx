import { useRef } from 'react';
import { useContext } from 'react';
import CartModal from './CartModal.jsx';
import { CartContext } from '../store/Shoping-cart-context.jsx';
export default function Header() {
  const {items}=useContext(CartContext);
  const {UpdateCartItemQuantity}=useContext(CartContext);

  const modal = useRef();

  const cartQuantity = items.length;

  function handleOpenCartClick() {
    modal.current.open();
  }

  let modalActions = <button>Close</button>;

  if (cartQuantity > 0) {
    modalActions = (
      <>
        <button>Close</button>
        <button>Checkout</button>
      </>
    );
  }

 
  return (
    <>
      <CartModal
        ref={modal}
        cartItems={items}
        onUpdateCartItemQuantity={UpdateCartItemQuantity}
        title="Your Cart"
        actions={modalActions}
      />
      <header id="main-header">
        <div id="main-title">
          <img src="logo.png" alt="Elegant model" />
          <h1>Elegant Context</h1>
        </div>
        <p>
          <button onClick={handleOpenCartClick}>Cart ({cartQuantity})</button>
        </p>
      </header>
    </>
  );
}
