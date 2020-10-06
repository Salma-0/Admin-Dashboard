import ordersJSON from '../orders.json';

const orders = ordersJSON.orders;

export default function (){
    let revenueMap = new Map();
    let result = [];

    orders.forEach(order => {
        if(revenueMap.has(order.date)){
            let total = revenueMap.get(order.date);
            revenueMap.set(order.date, total+order.total);
        }else{
            revenueMap.set(order.date, order.total);
        }
    });

    for(let [key, value] of revenueMap){
        result.push({date: key, value: value});
    }

    return result;
}

