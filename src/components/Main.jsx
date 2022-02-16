import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Navbar from './Nav';
import Home from './pages/Home';
import Products from './pages/Products';
import Contacts from './pages/Contacts';
import Carts from './pages/Carts';
import Checkout from './pages/Checkout';

const Main = ({ products, carts, setCarts }) => {
    const [showOffcanvas, setShow] = useState(false);
    const [checkoutItem, setcheckoutItem] = useState(null);

    const handleShow = (id) => {
        const product = products.filter((products) => products.id === id)[0];
        setcheckoutItem(product);
        setShow(true);
        console.log(product);
    };

    const addToCarts = (id) => {
        let item = products.filter((product) => product.id === id)[0];

        const checkItem = (item) =>
            carts
                .map((cart) => (cart.id === item.id ? true : false))
                .includes(true);

        if (checkItem(item)) {
            return setCarts(
                carts.map((cart) =>
                    cart.id === id
                        ? { ...cart, quantity: cart.quantity + 1 }
                        : cart
                )
            );
        } else {
            item = { ...item, quantity: 1 };
            const newCarts = carts.concat(item);
            return setCarts(newCarts);
        }
    };
    return (
        <BrowserRouter>
            <Navbar
                CartsQuantity={carts.reduce(
                    (total, cart) => total + cart.quantity,
                    0
                )}
            />
            {showOffcanvas && (
                <Checkout
                    show={showOffcanvas}
                    setShow={setShow}
                    Item={checkoutItem}
                    addToCarts={addToCarts}
                />
            )}
            <Routes>
                <Route path='/' element={<Home products={products} />} />
                <Route
                    path='/watch-store'
                    element={<Home products={products} />}
                />
                <Route
                    path='/products'
                    element={
                        <Products
                            products={products}
                            addToCarts={addToCarts}
                            handleShow={handleShow}
                        />
                    }
                />

                <Route path='/contacts' element={<Contacts />} />
                <Route
                    path='/carts'
                    element={<Carts carts={carts} setCarts={setCarts} />}
                />

                {/* Not Found page */}

                <Route
                    path='*'
                    element={
                        <div style={{ margin: 100 }}>
                            <p style={{ fontSize: 30, maginTop: 30 }}>
                                this path doesn't exist
                            </p>
                            <Link to='/'>
                                <button style={{ border: 1, padding: 10 }}>
                                    Go to Home page
                                </button>
                            </Link>
                        </div>
                    }
                />
            </Routes>
        </BrowserRouter>
    );
};

export default Main;
