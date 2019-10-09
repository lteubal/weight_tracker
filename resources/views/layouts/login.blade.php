<!DOCTYPE html>
<html>
<head>
    <title>@yield('title')</title>
    @include('partials.head')
</head>
<body>  
@include('partials.header')
 
<section id="services" class="services">
    @section('section3')
    @show
</section>
  
 
@include('partials.footer') 
<script
  src="https://code.jquery.com/jquery-3.4.1.min.js"
  integrity="sha256-CSXorXvZcTkaix6Yvo6HppcZGetbYMGWSFlBw8HfCJo="
  crossorigin="anonymous"></script>
</body>
</html>	

<style>
    header {
        height:100px;
    }
    .services {
        height: 700px;
    }
</style>