<x-layout>
    <x-slot:title>
        Homepage
    </x-slot:title>

    <body class="antialiased" background="{{ asset('img/green-page-background.jpg') }}">

        <div class="container">
            <div class="row justify-content-center">
                <div class="col-lg-9">
                    <div class="text-center" id="gameDiv" style="border: 3px solid red;">
                        <script type="module" src="{{ asset('js/game.js')}}"></script>
                    </div>
                    <h1>Test</h1>
                </div>
            </div>
        </div>

    </body>
</x-layout>
