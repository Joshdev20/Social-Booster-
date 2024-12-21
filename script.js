// Your API Key
const apiKey = "c8245735c0229338246a2ba130666236";
const apiUrl = "https://reallysimplesocial.com/api/v2";

// Helper function to make API requests
const makeApiRequest = (data) => {
  return fetch(apiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${apiKey}`,
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .catch((error) => {
      console.error("Fetch Error:", error);
      throw error;
    });
};

// Function to add an order
const addOrder = (data) => {
  const postData = { ...data, key: apiKey, action: "add" };
  return makeApiRequest(postData);
};

// Function to check the status of an order
const getOrderStatus = (orderId) => {
  const postData = { key: apiKey, action: "status", order: orderId };
  return makeApiRequest(postData);
};

// Function to check the status of multiple orders
const getMultipleOrderStatus = (orderIds) => {
  const postData = {
    key: apiKey,
    action: "status",
    orders: orderIds.join(","),
  };
  return makeApiRequest(postData);
};

// Function to get available services
const getServices = () => {
  const postData = { key: apiKey, action: "services" };
  return makeApiRequest(postData);
};

// Function to refill an order
const refillOrder = (orderId) => {
  const postData = { key: apiKey, action: "refill", order: orderId };
  return makeApiRequest(postData);
};

// Function to refill multiple orders
const refillMultipleOrders = (orderIds) => {
  const postData = {
    key: apiKey,
    action: "refill",
    orders: orderIds.join(","),
  };
  return makeApiRequest(postData);
};

// Function to get the status of a refill order
const getRefillStatus = (refillId) => {
  const postData = { key: apiKey, action: "refill_status", refill: refillId };
  return makeApiRequest(postData);
};

// Function to get the statuses of multiple refill orders
const getMultipleRefillStatus = (refillIds) => {
  const postData = {
    key: apiKey,
    action: "refill_status",
    refills: refillIds.join(","),
  };
  return makeApiRequest(postData);
};

// Function to cancel orders
const cancelOrders = (orderIds) => {
  const postData = {
    key: apiKey,
    action: "cancel",
    orders: orderIds.join(","),
  };
  return makeApiRequest(postData);
};

// Function to check the balance
const getBalance = () => {
  const postData = { key: apiKey, action: "balance" };
  return makeApiRequest(postData);
};

// Event listener for the form submission
document.getElementById("boostForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const platform = document.getElementById("platform").value;
  const service = document.getElementById("service").value;
  const url = document.getElementById("url").value;
  const quantity = document.getElementById("quantity").value;

  // Prepare order data
  const orderData = {
    service: service,
    link: url,
    quantity: quantity,
  };

  // Add order
  addOrder(orderData)
    .then((response) => {
      document.getElementById("result").textContent = `Order Success: ${JSON.stringify(response, null, 2)}`;
    })
    .catch((error) => {
      document.getElementById("result").textContent = `An error occurred: ${error.message}`;
    });
});

// Example usage for other API functions

// Get services
getServices()
  .then((services) => {
    console.log("Available Services:", services);
  })
  .catch((error) => console.error("Error fetching services:", error));

// Get balance
getBalance()
  .then((balance) => {
    console.log("Current Balance:", balance);
  })
  .catch((error) => console.error("Error fetching balance:", error));
