const API = "/items";

async function loadItems(){

const res = await fetch(API);
const items = await res.json();

const movies=document.getElementById("movies");
const books=document.getElementById("books");
const dramas=document.getElementById("dramas");

movies.innerHTML="";
books.innerHTML="";
dramas.innerHTML="";

let movieCount=0;
let bookCount=0;
let dramaCount=0;

items.forEach(item=>{

const li=document.createElement("li");

li.className="list-group-item d-flex justify-content-between align-items-center";

li.innerHTML=`
<span>${item.title}</span>

<div>

<button class="btn btn-sm btn-warning me-2"
onclick="editItem('${item._id}','${item.title}')">
<i class="fa-solid fa-pen"></i>
</button>

<button class="btn btn-sm btn-danger"
onclick="deleteItem('${item._id}')">
<i class="fa-solid fa-trash"></i>
</button>

</div>
`;

if(item.type==="Movie"){
movies.appendChild(li);
movieCount++;
}

else if(item.type==="Book"){
books.appendChild(li);
bookCount++;
}

else{
dramas.appendChild(li);
dramaCount++;
}

});

document.getElementById("movieCount").innerText=`(${movieCount})`;
document.getElementById("bookCount").innerText=`(${bookCount})`;
document.getElementById("dramaCount").innerText=`(${dramaCount})`;

}

async function addItem(){

const title=document.getElementById("title").value;
const type=document.getElementById("type").value;

if(!title) return;

await fetch(API,{
method:"POST",
headers:{ "Content-Type":"application/json"},
body:JSON.stringify({title,type})
});

document.getElementById("title").value="";
loadItems();

}

async function deleteItem(id){

await fetch(API+"/"+id,{
method:"DELETE"
});

loadItems();

}

function editItem(id,title){

const newTitle=prompt("Edit title",title);

if(!newTitle) return;

fetch(API+"/"+id,{
method:"PUT",
headers:{ "Content-Type":"application/json"},
body:JSON.stringify({title:newTitle})
}).then(loadItems);

}

loadItems();
