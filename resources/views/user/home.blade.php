@extends('user.app')
    
    @section('title','Home')

    @section('content')
    
    @if(Route::has('login'))

@auth

@if(session()->has('message'))
    <div class="alert alert-success">
        <button type="button" class="close" data-dismiss="alert">
            x
        </button>
    
    {{session()->get('message')}}
    </div>
    @endif


<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">

<meta http-equiv="X-UA-Compatible" content="ie=edge">

<meta name="copyright" content="MACode ID, https://macodeid.com/">

<title>One Health - Medical Center HTML5 Template</title>

<link rel="stylesheet" href="../assets/css/maicons.css">

<link rel="stylesheet" href="../assets/css/bootstrap.css">

<link rel="stylesheet" href="../assets/vendor/owl-carousel/css/owl.carousel.css">

<link rel="stylesheet" href="../assets/vendor/animate/animate.css">

<link rel="stylesheet" href="../assets/css/theme.css">

</head>
<body>

<!-- Back to top button -->
<div class="back-to-top"></div>



<div class="page-hero bg-image overlay-dark" style="background-image: url(../assets/img/bg_image_1.jpg);">
    <div class="hero-section">
    <div class="container text-center wow zoomIn">
        <span class="subhead">Let's make your life happier</span>
        <h1 class="display-4">Healthy Living</h1>
        <a href="#" class="btn btn-primary">Let's Consult</a>
    </div>
    </div>
</div>


<div class="bg-light">
    <div class="page-section py-3 mt-md-n5 custom-index">
    <div class="container">
        <div class="row justify-content-center">
        <div class="col-md-4 py-3 py-md-0">
            <div class="card-service wow fadeInUp">
            <div class="circle-shape bg-secondary text-white">
                <span class="mai-chatbubbles-outline"></span>
            </div>
                <p><span>Chat</span> with a doctors</p>
            </div>
        </div>
        <div class="col-md-4 py-3 py-md-0">
            <div class="card-service wow fadeInUp">
            <div class="circle-shape bg-primary text-white">
                <span class="mai-shield-checkmark"></span>
            </div>
                <p><span>One</span>-Health Protection</p>
            </div>
        </div>
        <div class="col-md-4 py-3 py-md-0">
            <div class="card-service wow fadeInUp">
            <div class="circle-shape bg-accent text-white">
                <span class="mai-basket"></span>
                </div>
                <p><span>One</span>-Health Pharmacy</p>
            </div>
        </div>
        </div>
    </div>
    </div> <!-- .page-section -->

    <div class="page-section pb-0">
    <div class="container">
        <div class="row align-items-center">
        <div class="col-lg-6 py-3 wow fadeInUp">
            <h1>Welcome to Your Health <br> Center</h1>
            <p class="text-grey mb-4">Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Accusantium aperiam earum ipsa eius, inventore nemo labore eaque porro consequatur ex aspernatur. Explicabo, excepturi accusantium! Placeat voluptates esse ut optio facilis!</p>
            <a href="about.html" class="btn btn-primary">Learn More</a>
        </div>
        <div class="col-lg-6 wow fadeInRight" data-wow-delay="400ms">
            <div class="img-place custom-img-1">
                <img src="../assets/img/bg-doctor.png" alt="">
            </div>
        </div>
        </div>
    </div>
    </div> <!-- .bg-light -->
</div> <!-- .bg-light -->

    @include('user.doctor')

    @include('user.latest')

    @include('user.appointment')

    <div class="about-us py-5">
    <div class="container">
        <h2>Na kontaktoni</h2>
        <p>Përmes ueb formularit në vijim mund të na kontaktoni për çdo pyetje, këshillë, apo kritikë.</p>
        <form action="{{url('contact')}}" method="post">
            @csrf
            <div class="form-group">
                <label for="emri">Emri:</label>
                <input type="text" class="form-control" id="emri" placeholder="Shkruani emrin tuaj" name="name" required>
            </div>
            <div class="form-group">
                <label for="mbiemri">Mbiemri:</label>
                <input type="text" class="form-control" id="mbiemri" placeholder="Shkruani mbiemrin tuaj" name="surname" required>
            </div>
            <div class="form-group">
                <label for="email">Email-i:</label>
                <input type="email" class="form-control" id="email" placeholder="Shkruani email-in tuaj" name="email" required>
            </div>
            <div class="form-group">
                <label for="tema">Tema:</label>
                <input type="text" class="form-control" id="tema" placeholder="Shkruani temën e mesazhit tuaj" name="subject" required>
            </div>
            <div class="form-group">
                <label for="mesazhi">Mesazhi:</label>
                <textarea class="form-control" rows="5" id="mesazhi" placeholder="Shkruani mesazhin tuaj" name="message" required></textarea>
            </div>
            <button type="submit" class="btn btn-primary" name="submit">Dërgo</button>
        </form>        
    </div>
</div>
<script src="../assets/js/jquery-3.5.1.min.js"></script>

<script src="../assets/js/bootstrap.bundle.min.js"></script>

<script src="../assets/vendor/owl-carousel/js/owl.carousel.min.js"></script>

<script src="../assets/vendor/wow/wow.min.js"></script>

<script src="../assets/js/theme.js"></script>
    
</body>
</html>

    
    @else

    @include('user.home1')

@endauth


    @endif

    
@endsection