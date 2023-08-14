<!doctype html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>@yield('title')</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-KK94CHFLLe+nY2dmCWGMq91rCGa5gtU4mk92HdvYe+M/SXH301p5ILy+dN9+nJOZ" crossorigin="anonymous">
    <style>
        .navbar-toggler-icon {
            background-color: white;
        }
    </style>
</head>
<body>
<nav class="navbar navbar-expand-lg navbar-light shadow-sm ">
<div class="container">
    <a class="navbar-brand py-3" href="#">One-Health</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mx-auto mb-2 mb-lg-0">
            <li class="nav-item">
                <a class="nav-link" href="{{ route('admin.home') }}">Home</a>
            </li>
            <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                One-Health-store
                </a>
                <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                </li>
                <li class="nav-item">
                    <a class="nav-link @if(\Request::route()->getName() == 'category.index') active @endif" href="{{ route('category.index') }}">Category</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link @if(\Request::route()->getName() == 'products.index') active @endif" href="{{ route('products.index') }}">Vitamins and supplements</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link @if(\Request::route()->getName() == 'product1s.index') active @endif" href="{{ route('product1s.index') }}">Pain relief</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link @if(\Request::route()->getName() == 'product2s.index') active @endif" href="{{ route('product2s.index') }}">Cold and flu</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link @if(\Request::route()->getName() == 'product3s.index') active @endif" href="{{ route('product3s.index') }}">Skincare</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link @if(\Request::route()->getName() == 'product4s.index') active @endif" href="{{ route('product4s.index') }}">Oral care</a>
                </li>
                </ul>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="#">Orders</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="{{url('showcontact')}}">Contacts</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="{{url('showappointment')}}">Appointments</a>
            </li>
            <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                StafMenagment
            </a>
            <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                <li class="nav-item">
                    <a class= "nav-link @if(\Request::route()->getName() == 'speciality.index') active @endif" href="{{ route('speciality.index') }}">Speciality</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link @if(\Request::route()->getName() == 'doctors.index') active @endif" href="{{ route('doctors.index') }}">Doctors</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link @if(\Request::route()->getName() == 'nurses.index') active @endif" href="{{ route('nurses.index') }}">Nurses</a>
                </li>
            </ul>
</li>

        </ul>
        
        @if(Route::has('login'))

            @auth

            <x-app-layout>
            </x-app-layout>

            @else

            
                <a class="btn btn-primary ml-lg-3" href="{{ route('login') }}"> Login </a>
                
                    
                
                <a class="btn btn-primary ml-lg-3" href="{{ route('register') }}"> Register </a>
            

            @endauth
            <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.11.7/dist/umd/popper.min.js" integrity="sha384-zYPOMqeu1DAVkHiLqWBUTcbYfZ8osu1Nd6Z89ify25QV9guujx43ITvfi12/QExE" crossorigin="anonymous"></script>
            <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/js/bootstrap.min.js" integrity="sha384-Y4oOpwW3duJdCWv5ly8SCFYWqFDsfob/3GkgExXKV4idmbt98QcxXYs9UoXAB7BZ" crossorigin="anonymous"></script>
            @endif


        <form class="d-flex" role="search">
            <input class="form-control ml-5" type="search" placeholder="Search" aria-label="Search">
            <button class="btn btn-outline-success" type="submit">Search</button>
        </form>
    </div>
</div>
</nav>

<div class="container my-5">
    @yield('content')
</div>

<footer class="my-4 bg-light">
    <p class="text-center">&copy;2023</p>
</footer>
<script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.11.7/dist/umd/popper.min.js" integrity="sha384-zYPOMqeu1DAVkHiLqWBUTcbYfZ8osu1Nd6Z89ify25QV9guujx43ITvfi12/QExE" crossorigin="anonymous"></script>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/js/bootstrap.min.js" integrity="sha384-Y4oOpwW3duJdCWv5ly8SCFYWqFDsfob/3GkgExXKV4idmbt98QcxXYs9UoXAB7BZ" crossorigin="anonymous"></script>

</body>
</html>

