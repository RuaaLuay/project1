@extends('Layouts.Layout')
@section('custom-head')
    <!--begin::Vendor Stylesheets(used for this page only)-->
    <link href="{{ asset('assets/plugins/custom/datatables/datatables.bundle.css') }}" rel="stylesheet" type="text/css" />
    <!--end::Vendor Stylesheets-->
@endsection
@section('Main')
    <div class="app-main flex-column flex-row-fluid" id="kt_app_main">
        <!--begin::Content wrapper-->
        <div class="d-flex flex-column flex-column-fluid">
            <!--begin::Toolbar-->
            <div id="kt_app_toolbar" class="app-toolbar py-3 py-lg-6">
                <!--begin::Toolbar container-->
                <div id="kt_app_toolbar_container" class="app-container container-xxl d-flex flex-stack">
                    <!--begin::Page title-->
                    <div class="page-title d-flex flex-column justify-content-center flex-wrap me-3">
                        <!--begin::Title-->
                        <h1 class="page-heading d-flex text-dark fw-bold fs-3 flex-column justify-content-center my-0">View User Details</h1>
                        <!--end::Title-->
                        <!--begin::Breadcrumb-->

                        <!--end::Breadcrumb-->
                    </div>
                    <!--end::Page title-->
                    <!--begin::Actions-->

                    <!--end::Actions-->
                </div>
                <!--end::Toolbar container-->
            </div>
            <!--end::Toolbar-->
            <!--begin::Content-->
            <div id="kt_app_content" class="app-content flex-column-fluid">
                <!--begin::Content container-->
                <div id="kt_app_content_container" class="app-container container-xxl">
                    <!--begin::Layout-->
                    <div>
                        <!--begin::Sidebar-->

                        <div class="f">
                            <!--begin::Card-->
                            <div class="card mb-5 mb-xl-8">
                                <!--begin::Card body-->
                                <div class="card-body">
                                    <!--begin::Summary-->
                                    <!--begin::User Info-->
                                    <div class="d-flex flex-center flex-column py-5">
                                        <!--begin::Avatar-->
                                        <div class="symbol symbol-100px symbol-circle mb-7">
                                            @if($admin->image)
                                                <img src="{{ url('storage/' . $admin->image ) }}">
                                            @else
                                                <img src="{{ asset('assets/media/avatars/admin.png') }}" alt="user">
                                            @endif
                                        </div>
                                        <!--end::Avatar-->
                                        <!--begin::Name-->
                                        <a href="#" class="fs-3 text-gray-800 text-hover-primary fw-bold mb-3">
                                            @if($admin->name)
                                                {{$admin->name}}
                                            @else
                                            someone
                                            @endif
                                        </a>
                                        <!--end::Name-->
                                        <!--begin::Position-->
                                        <div class="mb-9">
                                            <!--begin::Badge-->
                                            <div class="badge badge-lg badge-light-primary d-inline">Administrator</div>
                                            <!--begin::Badge-->
                                        </div>
                                        <!--end::Position-->
                                        <!--begin::Info-->
                                        <!--begin::Info heading-->

                                        <!--end::Info heading-->

                                        <!--end::Info-->
                                    </div>
                                    <!--end::User Info-->
                                    <!--end::Summary-->
                                    <!--begin::Details toggle-->
                                    <div class="d-flex flex-stack fs-4 py-3">
                                        <div class="fw-bold rotate collapsible active" data-bs-toggle="collapse" href="#kt_user_view_details" role="button" aria-expanded="true" aria-controls="kt_user_view_details">Details
                                            <span class="ms-2 rotate-180">
															<i class="ki-duotone ki-down fs-3"></i>
														</span></div>
                                        <span data-bs-toggle="tooltip" data-bs-trigger="hover" data-bs-original-title="Edit customer details" data-kt-initialized="1">
															<a href="#" class="btn btn-sm btn-light-primary" data-bs-toggle="modal" data-bs-target="#kt_modal_update_details">Edit</a>
														</span>
                                    </div>
                                    <!--end::Details toggle-->
                                    <div class="separator"></div>
                                    <!--begin::Details content-->
                                    <div id="kt_user_view_details" class="collapse show" style="">
                                        <div class="pb-5 fs-6">
                                            <!--begin::Details item-->
{{--                                            <div class="fw-bold mt-5">Account ID</div>--}}
{{--                                            <div class="text-gray-600">ID-45453423</div>--}}
                                            <!--begin::Details item-->
                                            <!--begin::Details item-->
                                            <div class="fw-bold mt-5">Email</div>
                                            <div class="text-gray-600">
                                                <a href="#" class="text-gray-600 text-hover-primary">{{$admin->email}}</a>
                                            </div>
                                            <!--begin::Details item-->
                                            <!--begin::Details item-->
{{--                                            <div class="fw-bold mt-5">Address</div>--}}
{{--                                            <div class="text-gray-600">101 Collin Street,--}}
{{--                                                <br>Melbourne 3000 VIC--}}
{{--                                                <br>Australia</div>--}}
                                            <!--begin::Details item-->
                                            <!--begin::Details item-->
{{--                                            <div class="fw-bold mt-5">Language</div>--}}
{{--                                            <div class="text-gray-600">English</div>--}}
                                            <!--begin::Details item-->
                                            <!--begin::Details item-->
                                            <div class="fw-bold mt-5">Last Login</div>
                                            <div class="text-gray-600">{{ $admin->last_login  }}</div>
                                            <!--begin::Details item-->
                                        </div>
                                    </div>
                                    <!--end::Details content-->
                                </div>
                                <!--end::Card body-->
                            </div>
                            <!--end::Card-->
                            <!--begin::Connected Accounts-->

                            <!--end::Connected Accounts-->
                        </div><!--end::Sidebar-->
                        <!--begin::Content-->

                        <!--end::Content-->
                    </div>
                    <!--end::Layout-->
                    <!--begin::Modals-->
                    <!--begin::Modal - Update user details-->
                    <div class="modal fade" id="kt_modal_update_details" tabindex="-1" aria-hidden="true" style="display: none;">
                        <!--begin::Modal dialog-->
                        <div class="modal-dialog modal-dialog-centered mw-650px">
                            <!--begin::Modal content-->
                            <div class="modal-content">
                                <!--begin::Form-->
                                <form class="form" action="#" id="kt_modal_update_user_form">

                                    <!--begin::Modal header-->
                                    <div class="modal-header" id="kt_modal_update_user_header">
                                        <!--begin::Modal title-->
                                        <h2 class="fw-bold">Update User Details</h2>
                                        <!--end::Modal title-->
                                        <!--begin::Close-->
                                        <div class="btn btn-icon btn-sm btn-active-icon-primary" data-kt-users-modal-action="close">
                                            <i class="ki-duotone ki-cross fs-1">
                                                <span class="path1"></span>
                                                <span class="path2"></span>
                                            </i>
                                        </div>
                                        <!--end::Close-->
                                    </div>
                                    <!--end::Modal header-->
                                    <!--begin::Modal body-->
                                    <div class="modal-body py-10 px-lg-17">
                                        <!--begin::Scroll-->
                                        <div class="d-flex flex-column scroll-y me-n7 pe-7" id="kt_modal_update_user_scroll" data-kt-scroll="true" data-kt-scroll-activate="{default: false, lg: true}" data-kt-scroll-max-height="auto" data-kt-scroll-dependencies="#kt_modal_update_user_header" data-kt-scroll-wrappers="#kt_modal_update_user_scroll" data-kt-scroll-offset="300px" style="max-height: 69px;">
                                            <!--begin::User toggle-->
                                            <div class="fw-bolder fs-3 rotate collapsible mb-7" data-bs-toggle="collapse" href="#kt_modal_update_user_user_info" role="button" aria-expanded="false" aria-controls="kt_modal_update_user_user_info">User Information
                                                <span class="ms-2 rotate-180">
																<i class="ki-duotone ki-down fs-3"></i>
															</span></div>
                                            <!--end::User toggle-->
                                            <!--begin::User form-->
                                            <div id="kt_modal_update_user_user_info" class="collapse show">
                                                <!--begin::Input group-->
{{--                                                <div class="mb-7">--}}
{{--                                                    <!--begin::Label-->--}}
{{--                                                    <label class="fs-6 fw-semibold mb-2">--}}
{{--                                                        <span>Update Avatar</span>--}}
{{--                                                        <span class="ms-1" data-bs-toggle="tooltip" aria-label="Allowed file types: png, jpg, jpeg." data-bs-original-title="Allowed file types: png, jpg, jpeg." data-kt-initialized="1">--}}
{{--																			<i class="ki-duotone ki-information fs-7">--}}
{{--																				<span class="path1"></span>--}}
{{--																				<span class="path2"></span>--}}
{{--																				<span class="path3"></span>--}}
{{--																			</i>--}}
{{--																		</span>--}}
{{--                                                    </label>--}}
{{--                                                    <!--end::Label-->--}}
{{--                                                    <!--begin::Image input wrapper-->--}}
{{--                                                    <div class="mt-1">--}}
{{--                                                        <!--begin::Image placeholder-->--}}
{{--                                                        <style>.image-input-placeholder { background-image: url('{{ asset('assets/media/svg/avatars/blank.svg') }}'); } [data-bs-theme="dark"] .image-input-placeholder { background-image: url('{{asset('assets/media/svg/avatars/blank-dark.svg')}}'); }</style>--}}
{{--                                                        <!--end::Image placeholder-->--}}
{{--                                                        <!--begin::Image input-->--}}
{{--                                                        <div class="image-input image-input-outline image-input-placeholder" data-kt-image-input="true">--}}
{{--                                                            <!--begin::Preview existing avatar-->--}}
{{--                                                            @if($admin->image)--}}
{{--                                                                <div class="image-input-wrapper w-125px h-125px" style="background-image: url({{  url('storage/' . $admin->image )  }}"></div>--}}
{{--                                                            @else--}}
{{--                                                                <div class="image-input-wrapper w-125px h-125px" style="background-image: url({{ asset('assets/media/avatars/300-6.jpg') }}"></div>--}}
{{--                                                            @endif--}}
{{--                                                            <!--end::Preview existing avatar-->--}}
{{--                                                            <!--begin::Edit-->--}}
{{--                                                            <label class="btn btn-icon btn-circle btn-active-color-primary w-25px h-25px bg-body shadow" data-kt-image-input-action="change" data-bs-toggle="tooltip" aria-label="Change avatar" data-bs-original-title="Change avatar" data-kt-initialized="1">--}}
{{--                                                                <i class="ki-duotone ki-pencil fs-7">--}}
{{--                                                                    <span class="path1"></span>--}}
{{--                                                                    <span class="path2"></span>--}}
{{--                                                                </i>--}}
{{--                                                                <!--begin::Inputs-->--}}
{{--                                                                <input type="file" name="avatar" id="avatar" accept=".png, .jpg, .jpeg">--}}
{{--                                                                <input type="hidden" name="avatar_remove">--}}
{{--                                                                <!--end::Inputs-->--}}
{{--                                                            </label>--}}
{{--                                                            <!--end::Edit-->--}}
{{--                                                            <!--begin::Cancel-->--}}
{{--                                                            <span class="btn btn-icon btn-circle btn-active-color-primary w-25px h-25px bg-body shadow" data-kt-image-input-action="cancel" data-bs-toggle="tooltip" aria-label="Cancel avatar" data-bs-original-title="Cancel avatar" data-kt-initialized="1">--}}
{{--																				<i class="ki-duotone ki-cross fs-2">--}}
{{--																					<span class="path1"></span>--}}
{{--																					<span class="path2"></span>--}}
{{--																				</i>--}}
{{--																			</span>--}}
{{--                                                            <!--end::Cancel-->--}}
{{--                                                            <!--begin::Remove-->--}}
{{--                                                            <span class="btn btn-icon btn-circle btn-active-color-primary w-25px h-25px bg-body shadow" data-kt-image-input-action="remove" data-bs-toggle="tooltip" aria-label="Remove avatar" data-bs-original-title="Remove avatar" data-kt-initialized="1">--}}
{{--																				<i class="ki-duotone ki-cross fs-2">--}}
{{--																					<span class="path1"></span>--}}
{{--																					<span class="path2"></span>--}}
{{--																				</i>--}}
{{--																			</span>--}}
{{--                                                            <!--end::Remove-->--}}
{{--                                                        </div>--}}
{{--                                                        <!--end::Image input-->--}}
{{--                                                    </div>--}}
{{--                                                    <!--end::Image input wrapper-->--}}
{{--                                                </div>--}}
                                                <!--end::Input group-->
                                                <!--begin::Input group-->
                                                <div class="fv-row mb-7">
                                                    <!--begin::Label-->
                                                    <label class="fs-6 fw-semibold mb-2">Name</label>
                                                    <!--end::Label-->
                                                    <!--begin::Input-->
                                                    <input type="hidden" name="edit_mode" value="x">
                                                    <input type="hidden" name="id" value="{{ $admin->id }}">
                                                    <input type="text" class="form-control form-control-solid" placeholder="" name="name" value="{{$admin->name}}" fdprocessedid="k7s0uy">
                                                    <span class="text-danger" id="error_name"></span>
                                                    <!--end::Input-->
                                                </div>
                                                <!--end::Input group-->
                                                <!--begin::Input group-->
                                                <div class="fv-row mb-7">
                                                    <!--begin::Label-->
                                                    <label class="fs-6 fw-semibold mb-2">
                                                        <span>Email</span>
                                                        <span class="ms-1" data-bs-toggle="tooltip" aria-label="Email address must be active" data-bs-original-title="Email address must be active" data-kt-initialized="1">
																			<i class="ki-duotone ki-information fs-7">
																				<span class="path1"></span>
																				<span class="path2"></span>
																				<span class="path3"></span>
																			</i>
																		</span>
                                                    </label>
                                                    <!--end::Label-->
                                                    <!--begin::Input-->
                                                    <input type="email" class="form-control form-control-solid" placeholder="" name="email" value="{{$admin->email}}" fdprocessedid="xxh9w">
                                                    <span class="text-danger" id="error_email"></span>
                                                    <!--end::Input-->
                                                    <label class="required fw-semibold fs-6 mb-5">Role</label>
                                                    @foreach($roles as $role)
                                                        <div class="d-flex fv-row">
                                                            <!--begin::Radio-->
                                                            <div class="form-check form-check-custom form-check-solid">
                                                                <!--begin::Input-->
                                                                <input class="form-check-input me-3" name="user_role" type="radio" value="{{ $role->name }}" id="kt_modal_update_role_option_0" @if($admin->hasrole($role->name)) checked="checked" @endif />
                                                                <!--end::Input-->
                                                                <!--begin::Label-->
                                                                <label class="form-check-label" for="kt_modal_update_role_option_0">
                                                                    <div class="fw-bold text-gray-800">{{ $role->name }}</div>
                                                                    {{--                                                                                <div class="text-gray-600">Best for business owners and company administrators</div>--}}
                                                                </label>
                                                                <!--end::Label-->
                                                            </div>
                                                            <!--end::Radio-->
                                                        </div>
                                                        <div class='separator separator-dashed my-5'></div>
                                                    @endforeach
                                                </div>
                                                <!--end::Input group-->

                                            </div>
                                            <!--end::User form-->

                                        </div>
                                        <!--end::Scroll-->
                                    </div>
                                    <!--end::Modal body-->
                                    <!--begin::Modal footer-->
                                    <div class="modal-footer flex-center">
                                        <!--begin::Button-->
                                        <button type="reset" class="btn btn-light me-3" data-kt-users-modal-action="cancel" fdprocessedid="kshivb">Discard</button>
                                        <!--end::Button-->
                                        <!--begin::Button-->
                                        <button type="submit" class="btn btn-primary" data-kt-users-modal-action="submit" fdprocessedid="d1s9w">
                                            <span class="indicator-label">Submit</span>
                                            <span class="indicator-progress">Please wait...
															<span class="spinner-border spinner-border-sm align-middle ms-2"></span></span>
                                        </button>
                                        <!--end::Button-->
                                    </div>
                                    <!--end::Modal footer-->
                                </form>
                                <!--end::Form-->
                            </div>
                        </div>
                    </div>
                    <!--end::Modal - Update user details-->
                    <!--end::Modals-->
                </div>
                <!--end::Content container-->
            </div>
            <!--end::Content-->
        </div>
        <!--end::Content wrapper-->
        <!--begin::Footer-->
        <div id="kt_app_footer" class="app-footer">
            <!--begin::Footer container-->
            <div class="app-container container-fluid d-flex flex-column flex-md-row flex-center flex-md-stack py-3">
                <!--begin::Copyright-->
                <div class="text-dark order-2 order-md-1">
                    <span class="text-muted fw-semibold me-1">2023©</span>
                    <a href="https://keenthemes.com" target="_blank" class="text-gray-800 text-hover-primary">Keenthemes</a>
                </div>
                <!--end::Copyright-->
                <!--begin::Menu-->
                <ul class="menu menu-gray-600 menu-hover-primary fw-semibold order-1">
                    <li class="menu-item">
                        <a href="https://keenthemes.com" target="_blank" class="menu-link px-2">About</a>
                    </li>
                    <li class="menu-item">
                        <a href="https://devs.keenthemes.com" target="_blank" class="menu-link px-2">Support</a>
                    </li>
                    <li class="menu-item">
                        <a href="https://1.envato.market/EA4JP" target="_blank" class="menu-link px-2">Purchase</a>
                    </li>
                </ul>
                <!--end::Menu-->
            </div>
            <!--end::Footer container-->
        </div>
        <!--end::Footer-->
    </div>
@endsection
@section('custom-js')
    <!--begin::Vendors Javascript(used for this page only)-->
    <script src="{{ asset('assets/plugins/custom/datatables/datatables.bundle.js') }}"></script>
    <!--end::Vendors Javascript-->
    <!--begin::Custom Javascript(used for this page only)-->
    <script src="{{asset('assets/js/custom/apps/admin-management/users/view/view.js')}}"></script>
    <script src="{{asset('assets/js/custom/apps/admin-management/users/view/update-details.js')}}"></script>
{{--    <script src="{{asset('assets/js/custom/apps/user-management/users/view/add-schedule.js')}}"></script>--}}
{{--    <script src="{{asset('assets/js/custom/apps/user-management/users/view/add-task.js')}}"></script>--}}
{{--    <script src="{{asset('assets/js/custom/apps/user-management/users/view/update-email.js')}}"></script>--}}
{{--    <script src="{{asset('assets/js/custom/apps/user-management/users/view/update-password.js')}}"></script>--}}
{{--    <script src="{{asset('assets/js/custom/apps/user-management/users/view/update-role.js')}}"></script>--}}
{{--    <script src="{{asset('assets/js/custom/apps/user-management/users/view/add-auth-app.js')}}"></script>--}}
{{--    <script src="{{asset('assets/js/custom/apps/user-management/users/view/add-one-time-password.js')}}"></script>--}}
    <script src="{{asset('assets/js/widgets.bundle.js')}}"></script>
    <script src="{{asset('assets/js/custom/widgets.js')}}"></script>
    <script src="{{asset('assets/js/custom/apps/chat/chat.js')}}"></script>
    <script src="{{asset('assets/js/custom/utilities/modals/upgrade-plan.js')}}"></script>
    <script src="{{asset('assets/js/custom/utilities/modals/create-app.js')}}"></script>
    <script src="{{asset('assets/js/custom/utilities/modals/users-search.js')}}"></script>
    <!--end::Custom Javascript-->
@endsection

