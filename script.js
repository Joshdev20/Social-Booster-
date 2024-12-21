// Add your API key here
const apiKey = "c8245735c0229338246a2ba130666236";
const apiEndpoint = "https://reallysimplesocial.com/api/v2";

document.getElementById("boostForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const platform = document.getElementById("platform").value;
    const service = document.getElementById("service").value;
    const url = document.getElementById("url").value;
    const quantity = document.getElementById("quantity").value;

    // Prepare request data
    const requestData = {
        platform: platform,
        service: service,
        url: url,
        quantity: quantity
    };

    // Make the fetch request to the API
    fetch(apiEndpoint, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${apiKey}`,
        },
        body: JSON.stringify(requestData),
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        document.getElementById("result").textContent = `Success: ${JSON.stringify(data, null, 2)}`;
    })
    .catch(error => {
        console.error("Fetch Error:", error);
        document.getElementById("result").textContent = `An error occurred.`;
    });
});
