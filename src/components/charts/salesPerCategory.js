import ordersJSON from '../orders.json';
import axios from 'axios';


let orders = ordersJSON.orders;


const getCategory = (id, products)=> {
    for(let i=0; i<products.length; i++){
        if(products[i].id === id){
            return products[i].category;
        }
    }
    return "";
}


export default async function() {
    const map = new Map();
    const result = [];
    try {
        let response = await axios.get("https://fakestoreapi.com/products");
        let products = response.data;
    

        orders.forEach(order => {
            order.items.forEach(item => {
                let category = getCategory(item.productId, products);
                if(map.has(category)){
                    let count = map.get(category);
                    map.set(category, count+item.quantity);
                }else{
                    map.set(category, item.quantity);
                }
            })
        });

        for(let [key, value] of map){
           result.push({category: key, count: value});
        }

        return result;

    } catch (e) {
       console.log(e.message);
   }
}