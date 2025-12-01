// import { createContext, useEffect, useState } from "react";
// import axios from "axios";

// export const StoreContext = createContext(null)

// const StoreContextProvider = (props) => {
//     const [cartItems, setCartItems] = useState({});
//     const url = "http://localhost:4000"
//     const [token,setToken] = useState("");
//     const [food_list,setFoodList] = useState([])
//     const [userId, setUserId] = useState("");






//     const addToCart = async(itemId) => {
//         if (!cartItems[itemId]  ) {
//             setCartItems((prev) => ({ ...prev, [itemId]: 1 }))
//         }
//         else {
//             setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }))
//         }
//         if(token){
//             await axios.post(url+"/api/cart/add",{itemId},{ headers: { Authorization: `Bearer ${token}` } })
//         }
//     }
   

//     const removeFromCart = async (itemId) => {
//     setCartItems((prev) => {
//         const updatedCart = { ...prev };

//         if (!updatedCart[itemId]) {
//             // If item doesn't exist or is 0, do nothing
//             return prev;
//         }

//         if (updatedCart[itemId] === 1) {
//             // If only 1 left, remove it from the cart
//             delete updatedCart[itemId];
//         } else {
//             updatedCart[itemId] -= 1;
//         }

//         return updatedCart;
//     });

//     if (token) {
//         try {
//              await axios.post(
//             url + "/api/cart/remove",
//             { itemId },
//             { headers: { Authorization: `Bearer ${token}` } } // 🔑 change here
//         );
//         } catch (error) {
//             console.error("❌ Error removing item from cart:", error.message || error);
//         }
//     }
// };


//     const getTotalCartAmount = () => {
//     let totalAmount = 0;

//     for (const item in cartItems) {
//         if (cartItems[item] > 0) {
//             const itemInfo = food_list.find((product) => product._id === item);

//             // Defensive check to prevent runtime errors
//             if (itemInfo && itemInfo.price) {
//                 totalAmount += itemInfo.price * cartItems[item];
//             } else {
//                 console.warn(`⚠️ Item with _id=${item} not found in food_list.`);
//             }
//         }
//     }

//     return totalAmount;
// };


//     const fetchFoodList = async () => {
//     try {
//         const response = await axios.get(url + "/api/food/list");

//         // Check if response is successful
//         if (response.data.success) {
//             setFoodList(response.data.data);
//             console.log("✅ Food list fetched:", response.data.data);
//         } else {
//             console.error("❌ Failed to fetch food list:", response.data.message);
//         }
//     } catch (error) {
//         console.error("❌ Error while fetching food list:", error.message || error);
//     }
// };
// const loadCartData = async (token) => {
//     const response = await axios.post(url+"/api/cart/get",{},{ headers: { Authorization: `Bearer ${token}` } })
//     setCartItems(response.data.cartData);
// }


//     useEffect(() => {
//     async function loadData() {
//         await fetchFoodList();

//         const storedToken = localStorage.getItem("token");
//         const storedUserId = localStorage.getItem("userId");

//         if (storedToken) {
//             setToken(storedToken);
//             setUserId(storedUserId);       // ✅ Add this line
//             await loadCartData(storedToken);
//         }
//     }

//     loadData();
// }, []);


//     const contextValue = {
//         food_list,
//         cartItems,
//         setCartItems,
//         addToCart,
//         removeFromCart,
//         getTotalCartAmount,
//         url,
//         token,  
//         setToken,
//         userId, 
          

//     }
//     return (
//         <StoreContext.Provider value={contextValue}>
//             {props.children}
//         </StoreContext.Provider>
//     )
// }
// export default StoreContextProvider



import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const StoreContext = createContext(null)

const StoreContextProvider = (props) => {
    const [cartItems, setCartItems] = useState({});
    const url = "http://localhost:4000"
    const [token,setToken] = useState("");
    const [food_list,setFoodList] = useState([])


    const addToCart = async(itemId) => {
        if (!cartItems[itemId]  ) {
            setCartItems((prev) => ({ ...prev, [itemId]: 1 }))
        }
        else {
            setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }))
        }
        if(token){
            await axios.post(url+"/api/cart/add",{itemId},{headers:{token}})
        }
    }
   

    const removeFromCart = async (itemId) => {
    setCartItems((prev) => {
        const updatedCart = { ...prev };

        if (!updatedCart[itemId]) {
            // If item doesn't exist or is 0, do nothing
            return prev;
        }

        if (updatedCart[itemId] === 1) {
            // If only 1 left, remove it from the cart
            delete updatedCart[itemId];
        } else {
            updatedCart[itemId] -= 1;
        }

        return updatedCart;
    });

    if (token) {
        try {
            await axios.post(url + "/api/cart/remove", { itemId }, { headers: { token } });
        } catch (error) {
            console.error("❌ Error removing item from cart:", error.message || error);
        }
    }
};


    const getTotalCartAmount = () => {
    let totalAmount = 0;

    for (const item in cartItems) {
        if (cartItems[item] > 0) {
            const itemInfo = food_list.find((product) => product._id === item);

            // Defensive check to prevent runtime errors
            if (itemInfo && itemInfo.price) {
                totalAmount += itemInfo.price * cartItems[item];
            } else {
                console.warn(`⚠️ Item with _id=${item} not found in food_list.`);
            }
        }
    }

    return totalAmount;
};


    const fetchFoodList = async () => {
    try {
        const response = await axios.get(url + "/api/food/list");

        // Check if response is successful
        if (response.data.success) {
            setFoodList(response.data.data);
            console.log("✅ Food list fetched:", response.data.data);
        } else {
            console.error("❌ Failed to fetch food list:", response.data.message);
        }
    } catch (error) {
        console.error("❌ Error while fetching food list:", error.message || error);
    }
};
const loadCartData = async (token) => {
    const response = await axios.post(url+"/api/cart/get",{},{headers:{token}})
    setCartItems(response.data.cartData);
}


    useEffect(() => {
    async function loadData() {
        await fetchFoodList();

        const storedToken = localStorage.getItem("token");
        const storedUserId = localStorage.getItem("userId");

        if (storedToken) {
            setToken(storedToken);
            setUserId(storedUserId);       // ✅ Add this line
            await loadCartData(storedToken);
        }
    }

    loadData();
}, []);


    const contextValue = {
        food_list,
        cartItems,
        setCartItems,
        addToCart,
        removeFromCart,
        getTotalCartAmount,
        url,
        token,  
        setToken

    }
    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )
}
export default StoreContextProvider