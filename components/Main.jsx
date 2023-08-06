import { useState, useEffect } from "react";
import styles from '../styles/Home.module.css';
import Cart from './Cart';

const Main = () => {
    let [itemList, setItemList] = useState([]);
    let [cartList, setCartList] = useState([]);
    let [preTax, setPreTax] = useState(0.00);

    useEffect(() => {
        fetchTodos();
        const savedCartList = JSON.parse(localStorage.getItem("cartList")) || [];
        setCartList(savedCartList);
        console.log(savedCartList);
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

    const removeitem = (whichItem) => {
        let tempCart = cartList.filter((item, index) => index !== whichItem);
        setCartList(tempCart);
    }

    return (
        <>
            <div className={styles.main}>
            <div className={styles.menu}>
                <h1 className={styles.menuh1}>POS</h1>
                
                    <ul className={styles.menulist}>
                        <li className={styles.menuitem}>Items List</li>
                        <li className={styles.menuitem}>Add Item</li>
                    </ul>
                </div>
                <div className={styles.items}>
                    <input placeholder="Search" type="search" className={styles.input} id="" />
                    <div className={styles.list}>
                        {itemList.length > 0 ? itemList.map((item, i) => (
                            <button className={styles.li} key={i}
                                onClick={() => addItem(item.id, item.itemName, item.price)}>
                                {item.itemName + " - $" + item.price}
                            </button>
                        )) : null}
                    </div>
                </div>
                <Cart preTax={preTax} cartList={cartList} removeitem={removeitem} />
            </div>
        </>
    );
}

export default Main;
