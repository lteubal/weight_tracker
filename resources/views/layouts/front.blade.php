<!DOCTYPE html>
<html>
<head>
    <title>@yield('title')</title>
    @include('partials.head')
</head>
<body>  
@include('partials.header')
<section class="about" id="about">
    <div class="content">
        @section('section1')
        @show
    </div> 
</section>
<section class="how" id="how">
    @section('section2')
    @show
</section>

<section id="services" class="services">
    @section('section3')
    @show
</section>
 
<section class="photo vignette" id="photo">
    @section('section5')
    @show
</section>
 
@include('partials.footer') 
<script
  src="https://code.jquery.com/jquery-3.4.1.min.js"
  integrity="sha256-CSXorXvZcTkaix6Yvo6HppcZGetbYMGWSFlBw8HfCJo="
  crossorigin="anonymous"></script>
</body>
</html>	
