const subscriptions = [
  { name: "Netflix", price: 499, renewal: "2025-11-05", category: "Entertainment" },
  { name: "Spotify", price: 199, renewal: "2025-11-10", category: "Music" },
  { name: "Adobe Creative Cloud", price: 1675, renewal: "2025-11-15", category: "Productivity" },
  { name: "Canva Pro", price: 899, renewal: "2025-11-01", category: "Design" },
];

const subsList = document.getElementById("subscriptionsList");
const totalSubs = document.getElementById("totalSubs");
const monthlySpend = document.getElementById("monthlySpend");
const logoutBtn = document.getElementById("logoutBtn");

function loadSubscriptions() {
  subsList.innerHTML = "";
  let total = 0;
  subscriptions.forEach((sub) => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.innerHTML = `
          <h3>${sub.name}</h3>
          <p>Category: ${sub.category}</p>
          <p>Next Renewal: ${sub.renewal}</p>
          <p class="price">₹${sub.price}/month</p>
          <button class="btn-edit" data-name="${sub.name}">Edit</button>
          <button class="btn-cancel" data-name="${sub.name}">Cancel</button>
        `;
    subsList.appendChild(card);
    total += sub.price;
  });

  totalSubs.textContent = subscriptions.length;
  monthlySpend.textContent = "₹" + total;
}

function logout() {
  alert("You have been logged out!");
  window.location.href = "index.html";
}

function editSub(name) {
  alert("Edit feature coming soon for " + name);
}

function cancelSub(name) {
  const index = subscriptions.findIndex((s) => s.name === name);
  if (index !== -1) {
    if (confirm(`Are you sure you want to cancel ${name}?`)) {
      subscriptions.splice(index, 1);
      loadSubscriptions();
    }
  }
}

logoutBtn.addEventListener("click", logout);

subsList.addEventListener("click", (event) => {
  const target = event.target;
  if (target.tagName === 'BUTTON') {
    const name = target.dataset.name;
    if (target.classList.contains('btn-edit')) {
      editSub(name);
    } else if (target.classList.contains('btn-cancel')) {
      cancelSub(name);
    }
  }
});

loadSubscriptions();