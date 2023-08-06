import styles from '../styles/Home.module.css';
import { BsTrashFill } from 'react-icons/bs';

const Cart = ({cartList, removeitem, preTax}) => {

    const tax = .08


    return ( 
        <>
        <div className={styles.cart}>
                
                <div className={styles.cartList}>
                    {cartList.length >  0 ?  cartList.map((cartItem, i)=>{
                        return (

                            <li key={i} className={styles.cartLi}><BsTrashFill className={styles.delete} onClick={()=>{removeitem(i)}}/> <p>{cartItem.name}</p> <p>{'$'+ cartItem.price}</p> </li>
                        )
                    })
                    :<h2>No items in the cart</h2>

                    }
                </div>
                <div className={styles.totals}>
                <h3 ><span>Pre-tax</span> ${preTax.toFixed(2)}</h3>
                <h3><span>Tax</span> ${tax.toFixed(2)} </h3>
                <h1 className={styles.total}><span>Total</span> ${((preTax * tax) + preTax).toFixed(2)}</h1>
                </div>
            </div>
        </>
     );
}
 
export default Cart;