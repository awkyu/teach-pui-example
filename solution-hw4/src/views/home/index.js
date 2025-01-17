import React, { useState } from 'react';
import NavBar from "../../components/Navbar";
import Item from "../../components/Item"

import "./index.css"

import { rolls, rollsPerRow } from "../../data/rollsData"


/**
 * View for the home page
 * 
 * @returns Component for the Home View
 */
function Home({ rollsList=rolls, numRollsPerRow=rollsPerRow }) {
  const [totalPrice, setTotalPrice] = useState(0.0); // variable for the total price
  const [newlyAddedItem, setNewlyAddedItem] = useState(); // variable for storing the most recently added item
  const [newlyAddedItemNotificationVisible, setNewlyAddedItemNotificationVisible] = useState(false); // variable for logic of visible/invisible notifications
  const [newlyAddedItemNotificationTimeout, setNewlyAddedItemNotificationTimeout] = useState(); // variable for logic of visible/invisible notifications
  const [totalItems, setTotalItems] = useState(0); // variables for storing total number of items in cart
  const [itemList, setItemList] = useState([]); // variable for storing what items are in the cart
  
  // function to handle newly added items to the cart
  let addItemHandler = (newItem) => {
    setTotalPrice(totalPrice + parseFloat(newItem.finalPrice));
    setNewlyAddedItem(newItem);
    setTotalItems(totalItems + 1);
    setItemList(itemList.concat(newItem));

    setNewlyAddedItemNotificationVisible(true);

    clearTimeout(newlyAddedItemNotificationTimeout); // clear previous timer, does nothing on intialization/first item added
    setNewlyAddedItemNotificationTimeout(setTimeout(() => { // set notification to only show for 3 seconds
      setNewlyAddedItemNotificationVisible(false);
    }, 3000));
  }

  let productList = () => {
    let rowList = []
    for (let i = 0; i < rollsList.length; i+=numRollsPerRow) {
      let rollsRow = rollsList.slice(i, i+numRollsPerRow);
      rowList.push(
        <div key={i} className="itemized-row">
          {rollsRow.map((roll) => {
            return (<Item key={roll.productName} productName={roll.productName} imageSource={process.env.PUBLIC_URL + roll.imageURL} price={roll.price} addItemHandler={addItemHandler} />)
          })}
        </div>
      )
    }
    return rowList
  };

  return (  
      <div>
          <NavBar totalItems={totalItems} totalPrice={totalPrice} newlyAddedItem={newlyAddedItem} newlyAddedItemNotificationVisible={newlyAddedItemNotificationVisible} />
          {productList()}
      </div>
      
  );
}
export default Home;