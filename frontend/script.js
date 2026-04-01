const token=localStorage.getItem("token");

if(!token){
window.location="/login.html";
}

async function loadItems(){

const res=await fetch("/items",{
headers:{Authorization:token}
});

const items=await res.json();

const movies=document.getElementById("movies");
const books=document.getElementById("books");
const dramas=document.getElementById("dramas");

movies.innerHTML="";
books.innerHTML="";
dramas.innerHTML="";

items.forEach(item=>{

const card=document.createElement("div");

card.className="card shadow mb-3";

card.innerHTML=`
<div class="row g-0">

<div class="col-4">
<img src="${item.poster || 'https://via.placeholder.com/100'}"
style="width:100%;height:120px;object-fit:cover;">
</div>

<div class="col-8 d-flex justify-content-between align-items-center p-2">

<span>${item.title}</span>

<button class="btn btn-sm btn-danger"
onclick="deleteItem('${item._id}')">
Delete
</button>

</div>

</div>
`;

if(item.type==="Movie") movies.appendChild(card);
else if(item.type==="Book") books.appendChild(card);
else dramas.appendChild(card);

});

}

async function addItem(){

const title=document.getElementById("title").value;
const type=document.getElementById("type").value;

await fetch("/items",{
method:"POST",
headers:{
"Content-Type":"application/json",
Authorization:token
},
body:JSON.stringify({title,type})
});

loadItems();

}

async function deleteItem(id){

await fetch("/items/"+id,{
method:"DELETE",
headers:{Authorization:token}
});

loadItems();

}

function logout(){
localStorage.removeItem("token");
window.location="/login.html";
}

loadItems();