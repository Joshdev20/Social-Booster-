// Your API Key
const apiKey = "c8245735c0229338246a2ba130666236";
const apiUrl = "https://corsproxy.io/?https://reallysimplesocial.com/api/v2";

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
        return response.text().then((text) => {
          throw new Error(`HTTP error! Status: ${response.status}. Response: ${text}`);
        });
      }
      return response.json();
    })
    .catch((error) => {
      console.error("Fetch Error:", error);
      throw error;
    });
};

// Fetch available services
const getServices = () => {
  const postData = { key: apiKey, action: "services" };
  return makeApiRequest(postData);
};

// Dynamically populate the services dropdown
const populateServices = (services) => {
  const serviceSelect = document.getElementById("service");
  services.forEach((service) => {
    const option = document.createElement("option");
    option.value = service.id;
    option.textContent = service.name;
    serviceSelect.appendChild(option);
  });
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

  // Add order (existing code)
  addOrder(orderData)
    .then((response) => {
      document.getElementById("result").textContent = `Order Success: ${JSON.stringify(response, null, 2)}`;
    })
    .catch((error) => {
      document.getElementById("result").textContent = `An error occurred: ${error.message}`;
    });
});

// Initializing the page with services
getServices()
  .then((response) => {
    const services = response.services;
    populateServices(services);
  })
  .catch((error) => console.error("Error fetching services:", error));
