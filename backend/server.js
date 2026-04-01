<!DOCTYPE html>
<html>
<head>
<title>Login</title>
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
</head>

<body class="bg-light">

<div class="container d-flex justify-content-center align-items-center vh-100">

<div class="card p-4 shadow" style="width:350px;">

<h3 class="text-center mb-3">Login</h3>

<input id="username" class="form-control mb-3" placeholder="Username">

<input id="password" type="password" class="form-control mb-3" placeholder="Password">

<button class="btn btn-primary w-100" onclick="login()">Login</button>

<p class="text-center mt-3">
Don't have an account?
<a href="register.html">Register</a>
</p>

</div>

</div>

<script>
async function login(){

const res=await fetch("/login",{
method:"POST",
headers:{"Content-Type":"application/json"},
body:JSON.stringify({
username:username.value,
password:password.value
})
});

const data=await res.json();

localStorage.setItem("token",data.token);

window.location="/";

}
</script>

</body>
</html>