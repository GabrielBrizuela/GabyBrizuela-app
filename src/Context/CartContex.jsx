import React, { useState, useContext } from "react";

const CartContext = React.createContext([]);

export const useCartContext = () => useContext (CartContext);

const CartProvider = ({children}) => {
    const [cart, setCart ] = useState ([]);

    const addProducto = (items , cantidad) => {
        if (isInCart (items.id)) {
            setCart (cart.map (productos => {
                return productos.id === items.id ? { ...productos, cantidad: productos.quantity + cantidad }: productos 
            }));
        } else {
            setCart ([...cart, {...items, cantidad}]);
        }
    }

    console.log ('carrito' , cart)

    const clearCart = ()=> setCart ([]);

    const isInCart = (id) => cart.find(productos => productos.id ===id) ? true : false;

    const removeProducto = (id) => setCart (cart.filter(productos => productos.id !== id));


    return (
        <CartContext.Provider value= {(
            clearCart,
            isInCart,
            removeProducto,
            addProducto
        )}>
        {children}
        </CartContext.Provider>
    )
}

export default CartProvider
