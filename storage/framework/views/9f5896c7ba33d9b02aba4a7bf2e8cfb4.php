<?php if (isset($component)) { $__componentOriginal71c6471fa76ce19017edc287b6f4508c = $component; } ?>
<?php $component = Illuminate\View\AnonymousComponent::resolve(['view' => 'components.layout','data' => []] + (isset($attributes) && $attributes instanceof Illuminate\View\ComponentAttributeBag ? (array) $attributes->getIterator() : [])); ?>
<?php $component->withName('layout'); ?>
<?php if ($component->shouldRender()): ?>
<?php $__env->startComponent($component->resolveView(), $component->data()); ?>
<?php if (isset($attributes) && $attributes instanceof Illuminate\View\ComponentAttributeBag && $constructor = (new ReflectionClass(Illuminate\View\AnonymousComponent::class))->getConstructor()): ?>
<?php $attributes = $attributes->except(collect($constructor->getParameters())->map->getName()->all()); ?>
<?php endif; ?>
<?php $component->withAttributes([]); ?>
     <?php $__env->slot('title', null, []); ?> 
        Homepage
     <?php $__env->endSlot(); ?>

    <body class="antialiased" background="<?php echo e(asset('img/green-page-background.jpg')); ?>">

        <div class="container">
            <div class="row justify-content-center">
                <div class="col-lg-9">
                    <div class="text-center" id="gameDiv" >
                        <?php if(Auth::user() != true): ?>
                        <script type="module" src="<?php echo e(asset('js/launch/launchGuestGame.js')); ?>"></script>
                            <?php else: ?>

                            <script type="module" src="<?php echo e(asset('js/launch/launchAuthGame.js')); ?>"></script>
                        <?php endif; ?>
                    </div>

                </div>
            </div>
        </div>

    </body>
 <?php echo $__env->renderComponent(); ?>
<?php endif; ?>
<?php if (isset($__componentOriginal71c6471fa76ce19017edc287b6f4508c)): ?>
<?php $component = $__componentOriginal71c6471fa76ce19017edc287b6f4508c; ?>
<?php unset($__componentOriginal71c6471fa76ce19017edc287b6f4508c); ?>
<?php endif; ?>
<?php /**PATH C:\laragon\www\atkgameLaragon\resources\views/welcome.blade.php ENDPATH**/ ?>