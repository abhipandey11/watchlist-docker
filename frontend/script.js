const API="/items";

const token=localStorage.getItem("token");

if(!token){
window.location="/login.html";
}

async function loadItems(){

const res=await fetch(API,{
headers:{Authorization:token}
});

const items=await res.json();

const list=document.getElementById("list");

list.innerHTML="";

items.forEach(item=>{

const li=document.createElement("li");

li.innerHTML=`
<img src="${item.poster}" width="50">
${item.title}
<button onclick="deleteItem('${item._id}')">Delete</button>
`;

list.appendChild(li);

});

}

async function addItem(){

const title=document.getElementById("title").value;
const type=document.getElementById("type").value;

await fetch(API,{
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

await fetch(API+"/"+id,{
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