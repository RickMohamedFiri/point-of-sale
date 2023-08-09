import { useState, useEffect } from "react";
import Cart from './Cart';
import Link from 'next/link';
import styles from '../styles/Home.module.css';

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

    const filteredItemList = itemList.filter(item =>
        item.itemName.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <>
            <div className={styles.main}>
                <div className={styles.menu}>
                    <h1 className={styles.menuh1}>POS</h1>
                    <ul className={styles.menulist}>
                        <Link href="/itemsList" className={styles.menuitem}>Items List</Link>
                        <li className={styles.menuitem}>Add Item</li>
                    </ul>
                </div>
                <div className={styles.items}>
                    <input
                        placeholder="Search"
                        type="search"
                        className={styles.input}
                        value={searchQuery}
                        onChange={handleSearch}
                    />
                    <div className={styles.list}>
                        {filteredItemList.length > 0 ? filteredItemList.map((item, i) => (
                            <button
                                className={styles.li}
                                key={i}
                                onClick={() => addItem(item.id, item.itemName, item.price)}
                            >
                                {item.itemName + " - $" + item.price}
                            </button>
                        )) : (
                            <p>No items found.</p>
                        )}
                    </div>
                </div>
                <Cart preTax={preTax} cartList={cartList} removeitem={removeItem} />
            </div>
        </>
    );
}

export default Main;






