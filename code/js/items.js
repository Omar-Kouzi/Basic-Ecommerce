let itemsData = [];

fetch("./code/assets/data.json")
  .then((response) => response.json())
  .then((data) => {
    itemsData = data;
    displayItems(data);
  })
  .catch((error) => console.error("Error fetching data:", error));

function GotoItem(itemid){
  sessionStorage.itemID = itemid
  console.log(itemid);
}

function displayItems(items) {
  const itemsContainer = document.getElementById("itemsContainer");
  itemsContainer.innerHTML = "";
  items.forEach((item) => {
    const itemCard = document.createElement("div");
    itemCard.id = "item";

    // Add class based on the obtained field
    if (item.obtained === "true") {
      itemCard.classList.add("obtained");
    } else {
      itemCard.classList.add("not-obtained");
    }

    itemCard.innerHTML = `
    <div class="itemimg-container">
      <img src="${item.image}" alt="img" class="itemimg" />
    </div>
    <h5>${item.title}</h5>
    <p class="itemDescription">${item.description}</p>
    <p class="price">$${item.price}</p>
    <button>    
    <a href="../pages/item.html" class="nava" data-page="item" onClick="GotoItem('${item.id}')">Buy Now</a>
    </button>
  `;
  
    itemsContainer.appendChild(itemCard);
  });
}

function filterAndSortItems() {
  const searchTerm = document.getElementById("filterInput").value.toLowerCase();
  const sortMethod = document.getElementById("sortSelect").value;
  const obtainedFilter = document.getElementById("obtainedFilter").checked;

  let filteredItems = itemsData.filter((item) => {
    const matchesSearchTerm =
      item.title.toLowerCase().includes(searchTerm) ||
      item.description.toLowerCase().includes(searchTerm) ||
      item.price.toString().includes(searchTerm) ||
      item.type.toLowerCase().includes(searchTerm);

    const matchesObtainedFilter = obtainedFilter
      ? item.obtained === "true"
      : true;

    return matchesSearchTerm && matchesObtainedFilter;
  });

  switch (sortMethod) {
    case "az":
      filteredItems.sort((a, b) => a.title.localeCompare(b.title));
      break;
    case "za":
      filteredItems.sort((a, b) => b.title.localeCompare(a.title));
      break;
    case "priceHighLow":
      filteredItems.sort((a, b) => b.price - a.price);
      break;
    case "priceLowHigh":
      filteredItems.sort((a, b) => a.price - b.price);
      break;
    case "obtained":
      filteredItems.sort((a, b) => {
        return (a.obtained === "false") - (b.obtained === "false");
      });
      break;
  }

  displayItems(filteredItems);
}

document.getElementById("searchForm").addEventListener("submit", function (event) {
  event.preventDefault();
  filterAndSortItems();
});

document.getElementById("sortSelect").addEventListener("change", filterAndSortItems);
document.getElementById("obtainedFilter").addEventListener("change", filterAndSortItems);
