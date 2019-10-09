<header> 
    @include('partials.menu_hamburger')
    <div id="nav" class="nav"> 
        @include('partials.logo') 
        @include('partials.menu')
    </div>
    @yield('headertext')
    <div id="menuline"></div>
</header>
