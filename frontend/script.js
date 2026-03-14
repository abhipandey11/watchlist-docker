const API = "http://localhost:5000/items";

async function loadItems() {

    const res = await fetch(API);
    const items = await res.json();

    const list = document.getElementById("list");
    list.innerHTML = "";

    items.forEach(item => {

        const li = document.createElement("li");

        li.innerText = item.title + " (" + item.type + ")";

        list.appendChild(li);
    });
}

async function addItem() {

    const title = document.getElementById("title").value;
    const type = document.getElementById("type").value;

    await fetch(API, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ title, type })
    });

    loadItems();
}

loadItems();