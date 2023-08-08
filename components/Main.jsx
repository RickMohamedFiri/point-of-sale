import { useState, useEffect } from "react";
import Cart from './Cart';
import Link from 'next/link';

const Main = () => {
    const [itemList, setItemList] = useState([]);
    const [cartList, setCartList] = useState([]);
    const [preTax, setPreTax] = useState(0.00);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        fetchTodos();
        const savedCartList = JSON.parse(localStorage.getItem("cartList")) || [];
        setCartList(savedCartList);
    }, []);

    useEffect(() => {
        localStorage.setItem("cartList", JSON.stringify(cartList));
        calculate(cartList);
    }, [cartList]);

    const fetchTodos = () => {
        fetch('http://localhost:3500/items')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => setItemList(data))
            .catch(error => {
                console.error('Error fetching items:', error);
            });
    }

    const addItem = (id, itemName, price) => {
        const itemData = {
            id: id,
            name: itemName,
            price: price,
        };
        setCartList(prevCartList => [...prevCartList, itemData]);
    }

    const calculate = (tempCart) => {
        let tempPreTax = 0;
        for (let i = 0; i < tempCart.length; i++) {
            tempPreTax = tempPreTax + tempCart[i].price;
        }
        setPreTax(tempPreTax);
    }

    const removeItem = (whichItem) => {
        let tempCart = cartList.filter((item, index) => index !== whichItem);
        setCartList(tempCart);
    }

    const handleSearch = (event) => {
        setSearchQuery(event.target.value);
    }

    // Filter items based on the search query
    const filteredItemList = itemList.filter(item =>
        item.itemName.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <>
            <div className="min-h-screen w-screen flex justify-end color-text-a3a2a2 overflow-hidden bg-gradient-to-b from-[#00020a]">
                <div className="w-[30rem] h-full bg-white text-white">
                    <h1 className="py-8 pl-16 text-orangered text-3xl">POS</h1>
                    <ul className="flex flex-col gap-4 px-4 py-8">
                        <Link href="/itemsList" className="px-3 py-2 text-lg bg-[#333] rounded cursor-pointer hover:text-orangered">Items List</Link>
                        <li className="px-3 py-2 text-lg bg-[#333] rounded cursor-pointer hover:text-orangered">Add Item</li>
                    </ul>
                </div>
                <div className="flex flex-col ml-auto px-4 py-4 space-y-4">
                    {/* Search input */}
                    <input
                        placeholder="Search"
                        type="search"
                        className="w-56 h-12 outline-[1.5px solid orangered] rounded-lg text-white bg-transparent text-lg pl-4"
                        value={searchQuery}
                        onChange={handleSearch}
                    />
                    <div className="flex flex-wrap space-x-2">
                        {/* Render filtered item list */}
                        {filteredItemList.length > 0 ? filteredItemList.map((item, i) => (
                            <button
                                className="text-left flex items-center gap-2 rounded-lg w-32 h-32 bg-[#222] text-white text-lg py-4 px-8 hover:bg-[#313131]"
                                key={i}
                                onClick={() => addItem(item.id, item.itemName, item.price)}
                            >
                                {item.itemName + " - $" + item.price}
                            </button>
                        )) : (
                            <p className="text-white">No items found.</p>
                        )}
                    </div>
                </div>
                <Cart preTax={preTax} cartList={cartList} removeitem={removeItem} />
            </div>
        </>
    );
}

export default Main;





