import { getMetals, getOrders } from "./database.js";

const buildOrderListItem = (order) => {
  const metals = getMetals();

  const foundMetal = metals.find((metal) => {
    return metal.id === order.metalId;
  });

  const totalcost = foundMetal.price;
  const costString = totalcost.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });

  const formattedTimeStamp = new Date(order.timestamp).toLocaleDateString(
    "en-US",
    { weekday: "long", year: "numeric", month: "long", day: "numeric" }
  );
  return `<li>
        Order #${order.id} was placed on ${formattedTimeStamp} Total Cost: ${costString}
    </li>`;
};

export const Orders = () => {
  /*
        Can you explain why the state variable has to be inside
        the component function for Orders, but not the others?
    */
  const orders = getOrders();

  let html = "<ul>";

  const listItems = orders.map(buildOrderListItem);

  html += listItems.join("");
  html += "</ul>";

  return html;
};
