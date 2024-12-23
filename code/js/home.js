let itemsData = [];
let perfumeTitle = [];

fetch("./code/assets/data.json")
  .then((response) => response.json())
  .then((data) => {
    itemsData = data;
    perfumeTitle = data.map((item) => item.title);
    displayRandomItems(itemsData);
    togglePerfumeTitle(perfumeTitle);
  })
  .catch((error) => console.error("Error fetching data:", error));

function togglePerfumeTitle(names) {
  const perfumeNameElement = document.getElementById("perfumeName");
  let currentIndex = 0;

  setInterval(() => {
    perfumeNameElement.classList.add("fade-out");

    setTimeout(() => {
      currentIndex = (currentIndex + 1) % names.length;
      perfumeNameElement.textContent = names[currentIndex];
      perfumeNameElement.classList.remove("fade-out");
      perfumeNameElement.classList.add("fade-in");
    }, 500);

    setTimeout(() => {
      perfumeNameElement.classList.remove("fade-in");
    }, 1000);
  }, 3000);
}
function GotoItem(itemid){
  sessionStorage.itemID = itemid
  console.log(itemid);
}
function displayRandomItems(items) {
  const itemsContainer = document.querySelector(".homeitems");
  itemsContainer.innerHTML = "";

  const randomItems = items.sort(() => 0.5 - Math.random()).slice(0, 4);

  randomItems.forEach((item) => {
    const itemCard = document.createElement("div");
    itemCard.id = "item";
    itemCard.innerHTML = `
      <div class="itemimg-container">
        <img src="${item.image}" alt="${item.title}" class="itemimg" />
      </div>
      <h5>${item.title}</h5>
      <p class="itemDescription">${item.description}</p>
      <p class="price">$${parseFloat(item.price).toFixed(2)}</p>
  <button>    
    <a href="../code/pages/item.html" class="nava" data-page="item" onClick="GotoItem('${item.id}')">Buy Now</a>
    </button>    `;
    itemsContainer.appendChild(itemCard);
  });

  const showMoreButton = document.createElement("button");
  showMoreButton.innerHTML = `
    <a href="../code/pages/items.html" class="nava" data-page="items">SHOW MORE</a>
  `;
  itemsContainer.appendChild(showMoreButton);
}
