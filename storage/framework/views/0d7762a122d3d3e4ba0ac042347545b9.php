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
        profile
     <?php $__env->endSlot(); ?>





    <div class="container-fluid">
        <div class="row mt-4 bannerHolder">
            <div class="col-2">
                
                <img src="<?php echo e(asset('img/edit-circle.png')); ?>" alt="edit" class="imgEditBtn" onclick="editImage();">
                <img src="<?php echo e(asset(Auth::user()->pfp."/img/profile/default-img.jpg")); ?>" alt="Profile Image" class="profile-image">

            </div>
            <div class="col-4">
                <h1 style="margin-left: 30px"> <?php echo e(Auth::user()->pfp); ?> Testing</h1>
            </div>

        </div>
        <div class="modal fade" id="editImageModal" tabindex="-1" aria-labelledby="editImageLabel" aria-hidden="true">
            <div class="modal-dialog modal-lg">
                <div class="modal-content" style="background-color:gray;">
                    <div class="modal-header">
                        <h5 class="modal-title" id="editImageTitle">Edit your profile picture</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <div class="row">
                            <div class="col-6"><img src="<?php echo e(asset(Auth::user()->pfp)); ?>" class="Profile Image"
                                    alt="">
                                </div>
                            <div class="col-6">
                                <div>
                                    <form action="<?php echo e(route('store')); ?>" method="POST" enctype="multipart/form-data">
                                        <?php echo csrf_field(); ?>
                                        <?php echo method_field('POST'); ?>
                                    <label class="form-label" for="input_file">Choose file</label>
                                    <input type="file" class="form-control" id="input_file" name="pfp" placeholder="Image">
                                </div>
                            </div>
                        </div>

                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="submit" class="btn btn-primary">Save changes</button>
                    </form>
                    </div>
                </div>
            </div>
        </div>

        <div class="row mt-4">
            <div class="col-3 offset-4">
                <h1 class="borderTesting"><?php echo e(Auth::user()->screenname); ?></h1>
            </div>
            <div class="col-2">
                
                <button class="btn btn-primary">
                    edit
                </button>
                <button class="btn btn-primary">
                    settings
                </button>
            </div>


        </div>
        <div class="row m-4">
            <div class="col-4 offset-1 text-center " style="background-color: gray">
                <div class="container ">
                    <div class="row">

                        <h3 class="borderTesting"><u>Scores</u></h3>
                    </div>
                    <div class="row mt-4">
                        <table class="table table-hover table-nowrap">

                            <tbody>
                                <?php $__currentLoopData = <?php echo e(User::where(['id' => Auth::id()]).scores()); ?>; $__env->addLoop($__currentLoopData); foreach($__currentLoopData as $score): $__env->incrementLoopIndices(); $loop = $__env->getLastLoop(); ?>
                                <tr>
                                    <td>
                                        <h4 class="text-heading font-semibold" href="#">
                                            <?php echo e($score->gamemode); ?>

                                        </h4>

                                    </td>
                                    <td>
                                        <h4 class="text-heading font-semibold" href="#">
                                            <?php echo e($score->score); ?>

                                        </h4>
                                    </td>
                                    <td>
                                        <h4 class="text-heading font-semibold" href="#">
                                            <?php echo e($score->dayssince); ?>

                                        </h4>

                                    </td>

                                </tr>
                                <?php endforeach; $__env->popLoop(); $loop = $__env->getLastLoop(); ?>

                                <tr>
                                    <td>
                                        <h4 class="text-heading font-semibold" href="#">
                                            Time Trial
                                        </h4>

                                    </td>
                                    <td>
                                        <h4 class="text-heading font-semibold" href="#">
                                            2038pts.
                                        </h4>
                                    </td>
                                    <td>
                                        <h4 class="text-heading font-semibold" href="#">
                                            4 days ago
                                        </h4>

                                    </td>

                                </tr>
                                <tr>
                                    <td>
                                        <h4 class="text-heading font-semibold" href="#">
                                            Endless Mode
                                        </h4>

                                    </td>
                                    <td>
                                        <h4 class="text-heading font-semibold" href="#">
                                            1882pts.
                                        </h4>
                                    </td>
                                    <td>
                                        <h4 class="text-heading font-semibold" href="#">
                                            9 days ago
                                        </h4>

                                    </td>

                                </tr>


                            </tbody>
                        </table>
                    </div>
                </div>

            </div>
            <div class="col-4 offset-1 text-center " style="background-color: gray">
                <div class="container ">
                    <div class="row">
                        <h3 class="borderTesting"><u>Friends</u></h3>

                    </div>
                    <div class="row mt-4">
                        <table class="table table-hover table-nowrap">

                            <tbody>
                                <tr>
                                    <td>
                                        <img alt="..." src="<?php echo e(asset('img/default-img.jpg')); ?>"
                                            class="rounded-circle"
                                            style=" width: 50px;height: 50px;border-radius: 50%;box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px, rgb(51, 51, 51) 0px 0px 0px 3px;">

                                    </td>
                                    <td>
                                        <h4 class="text-heading font-semibold" href="#">
                                            Robert Fox
                                        </h4>
                                    </td>

                                    <td>
                                        <button class="btn btn-warning">view</button>
                                        <button class="btn btn-warning mx-1">fight</button>
                                        <button class="btn btn-warning mx-1">del</button>
                                    </td>

                                </tr>
                                <tr>
                                    <td>
                                        <img alt="..." src="<?php echo e(asset('img/default-img.jpg')); ?>"
                                            class="rounded-circle"
                                            style=" width: 50px;height: 50px;border-radius: 50%;box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px, rgb(51, 51, 51) 0px 0px 0px 3px;">

                                    </td>
                                    <td>
                                        <h4 class="text-heading font-semibold" href="#">
                                            Toby James
                                        </h4>
                                    </td>

                                    <td>
                                        <button class="btn btn-warning">view</button>
                                        <button class="btn btn-warning mx-1">fight</button>
                                        <button class="btn btn-warning mx-1">del</button>
                                    </td>

                                </tr>
                                <tr>
                                    <td>
                                        <img alt="..." src="<?php echo e(asset('img/default-img.jpg')); ?>"
                                            class="rounded-circle"
                                            style=" width: 50px;height: 50px;border-radius: 50%;box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px, rgb(51, 51, 51) 0px 0px 0px 3px;">

                                    </td>
                                    <td>
                                        <h4 class="text-heading font-semibold" href="#">
                                            Rhonda Shwit
                                        </h4>
                                    </td>

                                    <td>
                                        <button class="btn btn-warning">view</button>
                                        <button class="btn btn-warning mx-1">fight</button>
                                        <button class="btn btn-warning mx-1">del</button>
                                    </td>

                                </tr>

                            </tbody>
                        </table>
                    </div>
                </div>

            </div>
        </div>
    </div>

    <!-- Bootstrap JS -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.16.0/umd/popper.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js"
        integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossorigin="anonymous">
    </script>


    <script>
        function editImage() {
            // Get the modal element
            var modal = document.getElementById("editImageModal");

            // Show the modal
            var editImageModal = new bootstrap.Modal(modal, {
                keyboard: false
            })
            editImageModal.show();
        }
    </script>

    </div>
    </div>
 <?php echo $__env->renderComponent(); ?>
<?php endif; ?>
<?php if (isset($__componentOriginal71c6471fa76ce19017edc287b6f4508c)): ?>
<?php $component = $__componentOriginal71c6471fa76ce19017edc287b6f4508c; ?>
<?php unset($__componentOriginal71c6471fa76ce19017edc287b6f4508c); ?>
<?php endif; ?>
<?php /**PATH C:\laragon\www\project2\resources\views//profile.blade.php ENDPATH**/ ?>