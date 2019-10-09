@extends('layouts.front')
@section('title')
	Weight Tracker
@stop
@section('headertext')
	<div class="headertext">
        <h1 class="animated  bounce"><strong>Weight Tracker</strong><br>Keep up with your weight loss! </h1>
        <button class="animated  bounce"><a href="/login">Get Started Today</a></button> 
	</div>
@stop
@section('section1')
	<h3>How it works</h3>
	<div class="row justify-content-md-center">
		<div class="col-md-3">
			<h2><i class="fa fa-bullseye title-icon" aria-hidden="true"></i> GOAL</h2>
			<p>Plug in your profile details and goal weight, and the app will calculate your daily calorie budget.</p>
		</div>
		<div class="col-md-3">
			<h2><i class="fas fa-chart-line title-icon"></i> TRACK</h2>
			<p>Enter your weight on a regular basis and monitor your progress accordingly through means of statistics and graphs. </p>
		</div>
		 
	</div>
	<br>
	<div class="row justify-content-md-center">
		<div class="col-md-3 col-md-offset-3">
			<h2><i class="fas fa-balance-scale title-icon" aria-hidden="true"></i> Ideal Weight</h2>
			<p>This app will also suggest your ideal weight based on your current weight, height, gender and age.</p>
		</div>
		<div class="col-md-3">
			<h2><i class="fas fa-exchange-alt title-icon" aria-hidden="true"></i> BMI</h2>
			<p>Calculate your current BMI (Body Mass Index) and the ideal range of BMI to be in a healthy weight.</p>
		</div>
	 
	</div>
@stop
@section('section2')
	<div  id="bordercurve" ><img src=""></div>
    <h3>Set goals and track your progress.</h3>
    <br><br>
    <button><a href="/login">Start losing weight today!</a></button>
@stop
@section('section3')
	<img src="images/writting.jpg" alt="Hand Writing">
    <div class="textservices">
		<br>
		<br>
		<br>
        <h3>Plan your week</h3>
    	<h4>Calculate your daily calorie needs to lose weight based on your age, gender, height and level of physical activity!.</h4>
     </div>
@stop
 
@section('section5')

    <h3>Great App for Calorie Management</h3>
    <p><img src="images/user.png" alt="John Doe"> <span>John Doe</span></p>
@stop
 