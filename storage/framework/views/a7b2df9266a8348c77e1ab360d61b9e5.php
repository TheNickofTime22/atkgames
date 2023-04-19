<!DOCTYPE html>
<html lang="<?php echo e(str_replace('_', '-', app()->getLocale())); ?>">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title>Laravel</title>

    <!-- Fonts -->
    <link rel="preconnect" href="https://fonts.bunny.net">

    

    <!-- Boostrap cdn -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css" rel="stylesheet"
        integrity="sha384-GLhlTQ8iRABdZLl6O3oVMWSktQOp6b7In1Zl3/Jr59b6EGGoI1aFkw7cmDA6j6gD" crossorigin="anonymous">

        <!-- Custom Css -->
    <link rel="stylesheet" href="<?php echo e(asset('css/app.css')); ?>">


    <meta name="csrf-token" content="<?php echo e(csrf_token()); ?>">
</head>

<body class="antialiased" style="background-color:black">
    <nav class="navbar navbar-expand-md shadow-sm mainNav">
        <div class="container-fluid">
            <a class="navbar-brand" href="<?php echo e(url('/')); ?>">
                <img src="<?php echo e(asset('img/site-name.png')); ?>" width="40%">
            </a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
                data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
                aria-label="<?php echo e(__('Toggle navigation')); ?>">
                <span class="navbar-toggler-icon"></span>
            </button>

            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <!-- Left Side Of Navbar -->
                <ul class="navbar-nav me-auto">

                </ul>

                <!-- Right Side Of Navbar -->
                <ul class="navbar-nav ms-auto">
                    <!-- Authentication Links -->
                    <?php if(auth()->guard()->guest()): ?>
                        <?php if(Route::has('login')): ?>
                            <li class="nav-item">
                                <a class="nav-link" href="<?php echo e(route('login')); ?>"><?php echo e(__('Login')); ?></a>
                            </li>
                        <?php endif; ?>

                        <?php if(Route::has('register')): ?>
                            <li class="nav-item">
                                <a class="nav-link" href="<?php echo e(route('register')); ?>"><?php echo e(__('Register')); ?></a>
                            </li>
                        <?php endif; ?>
                    <?php else: ?>
                        <li class="nav-item dropdown">

                            <a style="color:white" id="navbarDropdown" class="nav-link dropdown-toggle" href="#" role="button"
                                data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false" v-pre>
                                <?php echo e(Auth::user()->name); ?>

                            </a>

                            <div class="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
                                <a class="dropdown-item" href="<?php echo e(route('logout')); ?>"
                                    onclick="event.preventDefault();
                                                    document.getElementById('logout-form').submit();">
                                    <?php echo e(__('Logout')); ?>

                                </a>

                                <a class="dropdown-item" href="<?php echo e(route('profile')); ?>">
                                    <?php echo e(__('Profile')); ?>

                                </a>

                                <a class="dropdown-item" href="<?php echo e(route('home')); ?>">
                                    <?php echo e(__('Home')); ?>

                                </a>

                                <form id="logout-form" action="<?php echo e(route('logout')); ?>" method="POST" class="d-none">
                                    <?php echo csrf_field(); ?>
                                    <?php echo method_field('POST'); ?>
                                </form>
                            </div>


                        </li>
                        <div class="col-2 mx-4">
                            <img src="<?php echo e(asset("img/profile/".Auth::user()->pfp)); ?>" alt="icon"
                                style=" width: 50px;height: 50px;border-radius: 50%;box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px, rgb(51, 51, 51) 0px 0px 0px 3px;">
                        </div>
                    <?php endif; ?>
                </ul>
            </div>
        </div>
    </nav>




    <div class="container-fluid">
        <div class="row mt-3">
            <?php echo e($slot); ?>


        </div>

    </div>

    <script src="https://cdn.jsdelivr.net/gh/SilverTree7622/Phaser3_GUI_Inspector@latest/dist/PGInspector.js"></script>
    <script src="//cdnjs.cloudflare.com/ajax/libs/seedrandom/3.0.5/seedrandom.min.js">
    </script>
    <script src="//cdn.jsdelivr.net/npm/phaser@3.55.2/dist/phaser.js"></script>
    <script src="//cdn.ably.io/lib/ably.min-1.js"></script>

    <script src="https://code.jquery.com/jquery-3.6.3.min.js"
        integrity="sha256-pvPw+upLPUjgMXY0G+8O0xUf+/Im1MZjXxxgOcBQBXU=" crossorigin="anonymous"></script>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/js/bootstrap.bundle.min.js"
        integrity="sha384-w76AqPfDkMBDXo30jS1Sgez6pr3x5MlQ1ZAGC+nuZB+EYdgRZgiwxhTBTkF7CXvN" crossorigin="anonymous">
    </script>



    <link rel="icon" type="image/x-icon" href="img/block.ico" />

    <?php echo $__env->yieldPushContent('scripts'); ?>

</body>

</html>
<?php /**PATH C:\laragon\www\atkgameLaragon\resources\views/components/layout.blade.php ENDPATH**/ ?>