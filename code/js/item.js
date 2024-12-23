let itemData = [];
let id = sessionStorage.itemID; // Retrieve the ID from sessionStorage

fetch("./code/assets/data.json")
  .then((response) => response.json())
  .then((data) => {
    itemData = data;
    const selectedItem = itemData.find((item) => (item.id == id )); // Match the item by ID
    if (selectedItem) {
      displayItem(selectedItem);
    } else {
      console.error("Item not found:", id);
    }
  })
  .catch((error) => console.error("Error fetching data:", error));

function displayItem(item) {
  const itemContainer = document.getElementById("itemContainer"); // Target the container element
  itemContainer.innerHTML = ""; // Clear any existing content
console.log(item);
  const itemElement = document.createElement("div");
  itemElement.innerHTML = `
  <div class="itempage-container">
    <img class="itemimg-page"src="${item.image}" alt="${item.title}"  />
    <div class="itemprice-page">
    <h5>${item.title}</h5>
    
    <p class="itemPagePrice">$${item.price}</p>
    </div>
  <p class="itemPageDescription">${item.description}</p>
  <button>Buy Now</button>
  </div>
  `;

  itemContainer.appendChild(itemElement); // Add the item to the page
}
