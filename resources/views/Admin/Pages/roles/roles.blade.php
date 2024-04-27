@extends('Layouts.Layout')
@section('custom-head')
    <!--begin::Vendor Stylesheets(used for this page only)-->
    <link href="{{ asset('assets/plugins/custom/datatables/datatables.bundle.css') }}" rel="stylesheet" type="text/css" />
    <!--end::Vendor Stylesheets-->
@endsection
@section('Main')
    <!--begin::Main-->
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
                        <h1 class="page-heading d-flex text-dark fw-bold fs-3 flex-column justify-content-center my-0">Roles List</h1>
                        <!--end::Title-->
                        <!--begin::Breadcrumb-->
                        <ul class="breadcrumb breadcrumb-separatorless fw-semibold fs-7 my-0 pt-1">
                            <!--begin::Item-->
                            <li class="breadcrumb-item text-muted">
                                <a href="../../demo1/dist/index.html" class="text-muted text-hover-primary">Home</a>
                            </li>
                            <!--end::Item-->
                            <!--begin::Item-->
                            <li class="breadcrumb-item">
                                <span class="bullet bg-gray-400 w-5px h-2px"></span>
                            </li>
                            <!--end::Item-->
                            <!--begin::Item-->
                            <li class="breadcrumb-item text-muted">User Management</li>
                            <!--end::Item-->
                            <!--begin::Item-->
                            <li class="breadcrumb-item">
                                <span class="bullet bg-gray-400 w-5px h-2px"></span>
                            </li>
                            <!--end::Item-->
                            <!--begin::Item-->
                            <li class="breadcrumb-item text-muted">Roles</li>
                            <!--end::Item-->
                        </ul>
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
                    <!--begin::Row-->
                    <div class="row row-cols-1 row-cols-md-2 row-cols-xl-3 g-5 g-xl-9">
                        @foreach($roles as $role)
                            <!--begin::Col-->
                            <div class="col-md-4">
                                <!--begin::Card-->
                                <div class="card card-flush h-md-100">
                                    <!--begin::Card header-->
                                    <div class="card-header">
                                        <!--begin::Card title-->
                                        <div class="card-title">
                                            <h2>{{$role->name}}</h2>
                                        </div>
                                        <!--end::Card title-->
                                    </div>
                                    <!--end::Card header-->
                                    <!--begin::Card body-->
                                    <div class="card-body pt-1">
                                        <!--begin::Users-->
                                        <div class="fw-bold text-gray-600 mb-5">Total users with this role: {{ $role->userCount }}</div>
                                        <!--end::Users-->
                                        <!--begin::Permissions-->
                                        <div class="d-flex flex-column text-gray-600">
                                        @foreach ($role->permissions as $permission)
                                            <div class="d-flex align-items-center py-2">
                                                <span class="bullet bg-primary me-3"></span>
                                                {{ $permission->name }}</div>
                                        @endforeach
                                        </div>
                                        <!--end::Permissions-->
                                    </div>
                                    <!--end::Card body-->
                                    <!--begin::Card footer-->
                                    <div class="card-footer flex-wrap pt-0">
{{--                                        <a href="../../demo1/dist/apps/user-management/roles/view.html" class="btn btn-light btn-active-primary my-1 me-2">View Role</a>--}}
                                        <a href="{{ url('/admin/roles/'.$role->id) }}" class="btn btn-light btn-active-light-primary my-1">Edit Role</a>
{{--                                        <button type="button" class="btn btn-light btn-active-light-primary my-1" data-bs-toggle="modal" data-bs-target="#kt_modal_update_role" fdprocessedid="19ff8m">Edit Role</button>--}}
                                    </div>
                                    <!--end::Card footer-->
                                </div>
                                <!--end::Card-->
                            </div>
                            <!--end::Col-->
                        @endforeach

                        <!--begin::Add new card-->
                        <div class="ol-md-4">
                            <!--begin::Card-->
                            <div class="card h-md-100">
                                <!--begin::Card body-->
                                <div class="card-body d-flex flex-center">
                                    <!--begin::Button-->
                                    <button type="button" class="btn btn-clear d-flex flex-column flex-center edit-role-button" data-bs-toggle="modal" data-bs-target="#kt_modal_add_role" fdprocessedid="jw5op6">
                                        <!--begin::Illustration-->
                                        <img src="{{asset('assets/media/illustrations/sketchy-1/4.png')}}" alt="" class="mw-100 mh-150px mb-7">
                                        <!--end::Illustration-->
                                        <!--begin::Label-->
                                        <div class="fw-bold fs-3 text-gray-600 text-hover-primary">Add New Role</div>
                                        <!--end::Label-->
                                    </button>
                                    <!--begin::Button-->
                                </div>
                                <!--begin::Card body-->
                            </div>
                            <!--begin::Card-->
                        </div>
                        <!--begin::Add new card-->
                    </div>
                    <!--end::Row-->
                    <!--begin::Modals-->
                    <!--begin::Modal - Add role-->
                    <div class="modal fade" id="kt_modal_add_role" tabindex="-1" aria-hidden="true">
                        <!--begin::Modal dialog-->
                        <div class="modal-dialog modal-dialog-centered mw-750px">
                            <!--begin::Modal content-->
                            <div class="modal-content">
                                <!--begin::Modal header-->
                                <div class="modal-header">
                                    <!--begin::Modal title-->
                                    <h2 class="fw-bold">Add a Role</h2>
                                    <!--end::Modal title-->
                                    <!--begin::Close-->
                                    <div class="btn btn-icon btn-sm btn-active-icon-primary" data-kt-roles-modal-action="close">
                                        <i class="ki-duotone ki-cross fs-1">
                                            <span class="path1"></span>
                                            <span class="path2"></span>
                                        </i>
                                    </div>
                                    <!--end::Close-->
                                </div>
                                <!--end::Modal header-->
                                <!--begin::Modal body-->
                                <div class="modal-body scroll-y mx-lg-5 my-7">
                                    <!--begin::Form-->
                                    <form id="kt_modal_add_role_form" class="form fv-plugins-bootstrap5 fv-plugins-framework" action="#">
                                        <!--begin::Scroll-->
                                        <div class="d-flex flex-column scroll-y me-n7 pe-7" id="kt_modal_add_role_scroll" data-kt-scroll="true" data-kt-scroll-activate="{default: false, lg: true}" data-kt-scroll-max-height="auto" data-kt-scroll-dependencies="#kt_modal_add_role_header" data-kt-scroll-wrappers="#kt_modal_add_role_scroll" data-kt-scroll-offset="300px" style="max-height: 22px;">
                                            <!--begin::Input group-->
                                            <div class="fv-row mb-10 fv-plugins-icon-container">
                                                <!--begin::Label-->
                                                <label class="fs-5 fw-bold form-label mb-2">
                                                    <span class="required">Role name</span>
                                                </label>
                                                <!--end::Label-->
                                                <!--begin::Input-->
                                                <input class="form-control form-control-solid" placeholder="Enter a role name" name="role_name">
                                                <!--end::Input-->
                                                <div class="fv-plugins-message-container fv-plugins-message-container--enabled invalid-feedback"></div></div>
                                            <!--end::Input group-->
                                            <!--begin::Permissions-->
                                            <div class="fv-row">
                                                <!--begin::Label-->
                                                <label class="fs-5 fw-bold form-label mb-2">Role Permissions</label>
                                                <!--end::Label-->
                                                <!--begin::Table wrapper-->
                                                <div class="table-responsive">
                                                    <!--begin::Table-->
                                                    <table class="table align-middle table-row-dashed fs-6 gy-5">
                                                        <!--begin::Table body-->
                                                        <tbody class="text-gray-600 fw-semibold">
                                                        <!-- Loop through permissions here -->
                                                        @foreach($permissions as $permission)
                                                            <tr>
                                                                <td class="text-gray-800">{{$permission->name}}</td>
                                                                <td>
                                                                    <div class="d-flex">
                                                                        <label class="form-check form-check-sm form-check-custom form-check-solid me-5 me-lg-20">
                                                                            <input class="form-check-input" type="checkbox" value="{{$permission->name}}" name="permission">
                                                                        </label>
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                        @endforeach
                                                        <!-- End Loop -->
                                                        </tbody>
                                                        <!--end::Table body-->
                                                    </table>
                                                    <!--end::Table-->
                                                </div>
                                                <!--end::Table wrapper-->
                                            </div>
                                            <!--end::Permissions-->
                                        </div>
                                        <!--end::Scroll-->
                                        <!--begin::Actions-->
                                        <div class="text-center pt-15">
                                            <button type="reset" class="btn btn-light me-3" data-kt-roles-modal-action="cancel">Discard</button>
                                            <button type="submit" class="btn btn-primary" data-kt-roles-modal-action="submit">
                                                <span class="indicator-label">Submit</span>
                                                <span class="indicator-progress">Please wait...
																<span class="spinner-border spinner-border-sm align-middle ms-2"></span></span>
                                            </button>
                                        </div>
                                        <!--end::Actions-->
                                    </form>
                                    <!--end::Form-->
                                </div>
                                <!--end::Modal body-->
                            </div>
                            <!--end::Modal content-->
                        </div>
                        <!--end::Modal dialog-->
                    </div>
                    <!--end::Modal - Add role-->
{{--                    <!--begin::Modal - Update role-->--}}
{{--                    <div class="modal fade" id="kt_modal_update_role" tabindex="-1" aria-hidden="true">--}}
{{--                        <!--begin::Modal dialog-->--}}
{{--                        <div class="modal-dialog modal-dialog-centered mw-750px">--}}
{{--                            <!--begin::Modal content-->--}}
{{--                            <div class="modal-content">--}}
{{--                                <!--begin::Modal header-->--}}
{{--                                <div class="modal-header">--}}
{{--                                    <!--begin::Modal title-->--}}
{{--                                    <h2 class="fw-bold">Update Role</h2>--}}
{{--                                    <!--end::Modal title-->--}}
{{--                                    <!--begin::Close-->--}}
{{--                                    <div class="btn btn-icon btn-sm btn-active-icon-primary" data-kt-roles-modal-action="close">--}}
{{--                                        <i class="ki-duotone ki-cross fs-1">--}}
{{--                                            <span class="path1"></span>--}}
{{--                                            <span class="path2"></span>--}}
{{--                                        </i>--}}
{{--                                    </div>--}}
{{--                                    <!--end::Close-->--}}
{{--                                </div>--}}
{{--                                <!--end::Modal header-->--}}
{{--                                <!--begin::Modal body-->--}}
{{--                                <div class="modal-body scroll-y mx-5 my-7">--}}
{{--                                    <!--begin::Form-->--}}
{{--                                    <form id="kt_modal_update_role_form" class="form fv-plugins-bootstrap5 fv-plugins-framework" action="#">--}}
{{--                                        <!--begin::Scroll-->--}}
{{--                                        <div class="d-flex flex-column scroll-y me-n7 pe-7" id="kt_modal_update_role_scroll" data-kt-scroll="true" data-kt-scroll-activate="{default: false, lg: true}" data-kt-scroll-max-height="auto" data-kt-scroll-dependencies="#kt_modal_update_role_header" data-kt-scroll-wrappers="#kt_modal_update_role_scroll" data-kt-scroll-offset="300px" style="max-height: 22px;">--}}
{{--                                            <!--begin::Input group-->--}}
{{--                                            <div class="fv-row mb-10 fv-plugins-icon-container">--}}
{{--                                                <!--begin::Label-->--}}
{{--                                                <label class="fs-5 fw-bold form-label mb-2">--}}
{{--                                                    <span class="required">Role name</span>--}}
{{--                                                </label>--}}
{{--                                                <!--end::Label-->--}}
{{--                                                <!--begin::Input-->--}}
{{--                                                <input class="form-control form-control-solid" placeholder="Enter a role name" name="role_name" value="{{$role->name}}">--}}
{{--                                                <!--end::Input-->--}}
{{--                                                <div class="fv-plugins-message-container fv-plugins-message-container--enabled invalid-feedback"></div></div>--}}
{{--                                            <!--end::Input group-->--}}
{{--                                            <!--begin::Permissions-->--}}
{{--                                            <div class="fv-row">--}}
{{--                                                <!--begin::Label-->--}}
{{--                                                <label class="fs-5 fw-bold form-label mb-2">Role Permissions</label>--}}
{{--                                                <!--end::Label-->--}}
{{--                                                <!--begin::Table wrapper-->--}}
{{--                                                <div class="table-responsive">--}}
{{--                                                    <!--begin::Table-->--}}
{{--                                                    <table class="table align-middle table-row-dashed fs-6 gy-5">--}}
{{--                                                        <!--begin::Table body-->--}}
{{--                                                        <tbody class="text-gray-600 fw-semibold">--}}
{{--                                                        <!--begin::Table row-->--}}
{{--                                                        <tr>--}}
{{--                                                            <td class="text-gray-800">Administrator Access--}}
{{--                                                                <span class="ms-1" data-bs-toggle="tooltip" aria-label="Allows a full access to the system" data-bs-original-title="Allows a full access to the system" data-kt-initialized="1">--}}
{{--																					<i class="ki-duotone ki-information-5 text-gray-500 fs-6">--}}
{{--																						<span class="path1"></span>--}}
{{--																						<span class="path2"></span>--}}
{{--																						<span class="path3"></span>--}}
{{--																					</i>--}}
{{--																				</span></td>--}}
{{--                                                            <td>--}}
{{--                                                                <!--begin::Checkbox-->--}}
{{--                                                                <label class="form-check form-check-sm form-check-custom form-check-solid me-9">--}}
{{--                                                                    <input class="form-check-input" type="checkbox" value="" id="kt_roles_select_all">--}}
{{--                                                                    <span class="form-check-label" for="kt_roles_select_all">Select all</span>--}}
{{--                                                                </label>--}}
{{--                                                                <!--end::Checkbox-->--}}
{{--                                                            </td>--}}
{{--                                                        </tr>--}}
{{--                                                        <!--end::Table row-->--}}
{{--                                                        <!--begin::Table row-->--}}

{{--                                                            @foreach($permissions as $permission)--}}
{{--                                                                <tr>--}}
{{--                                                                <!--begin::Label-->--}}
{{--                                                                <td class="text-gray-800">{{$permission->name}}</td>--}}
{{--                                                                <!--end::Label-->--}}
{{--                                                                <!--begin::Input group-->--}}
{{--                                                                <td>--}}
{{--                                                                    <!--begin::Wrapper-->--}}
{{--                                                                    <div class="d-flex">--}}
{{--                                                                        <!--begin::Checkbox-->--}}
{{--                                                                        <label class="form-check form-check-sm form-check-custom form-check-solid me-5 me-lg-20">--}}
{{--                                                                            <input class="form-check-input" type="checkbox" value="" name="{{$permission->name}}">--}}
{{--                                                                        </label>--}}
{{--                                                                        <!--end::Checkbox-->--}}
{{--                                                                    </div>--}}
{{--                                                                    <!--end::Wrapper-->--}}
{{--                                                                </td>--}}
{{--                                                                <!--end::Input group-->--}}
{{--                                                                </tr>--}}
{{--                                                            @endforeach--}}

{{--                                                        <!--end::Table row-->--}}
{{--                                                        <!--begin::Table row-->--}}

{{--                                                        <!--end::Table row-->--}}
{{--                                                        </tbody>--}}
{{--                                                        <!--end::Table body-->--}}
{{--                                                    </table>--}}
{{--                                                    <!--end::Table-->--}}
{{--                                                </div>--}}
{{--                                                <!--end::Table wrapper-->--}}
{{--                                            </div>--}}
{{--                                            <!--end::Permissions-->--}}
{{--                                        </div>--}}
{{--                                        <!--end::Scroll-->--}}
{{--                                        <!--begin::Actions-->--}}
{{--                                        <div class="text-center pt-15">--}}
{{--                                            <button type="reset" class="btn btn-light me-3" data-kt-roles-modal-action="cancel">Discard</button>--}}
{{--                                            <button type="submit" class="btn btn-primary" data-kt-roles-modal-action="submit">--}}
{{--                                                <span class="indicator-label">Submit</span>--}}
{{--                                                <span class="indicator-progress">Please wait...--}}
{{--																<span class="spinner-border spinner-border-sm align-middle ms-2"></span></span>--}}
{{--                                            </button>--}}
{{--                                        </div>--}}
{{--                                        <!--end::Actions-->--}}
{{--                                    </form>--}}
{{--                                    <!--end::Form-->--}}
{{--                                </div>--}}
{{--                                <!--end::Modal body-->--}}
{{--                            </div>--}}
{{--                            <!--end::Modal content-->--}}
{{--                        </div>--}}
{{--                        <!--end::Modal dialog-->--}}
{{--                    </div>--}}
{{--                    <!--end::Modal - Update role-->--}}
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
    </div>    <!--end:::Main-->
@stop
@section('custom-js')
    <!--begin::Vendors Javascript(used for this page only)-->
    <script src="{{ asset('assets/plugins/custom/datatables/datatables.bundle.js') }}"></script>
    <!--end::Vendors Javascript-->
    <!--begin::Custom Javascript(used for this page only)-->
    <script src="{{ asset('assets/js/custom/apps/user-management/roles/list/add.js') }}"></script>
    <script src="{{ asset('assets/js/custom/apps/user-management/roles/list/update-role.js') }}"></script>
    <script src="{{ asset('assets/js/widgets.bundle.js') }}"></script>
    <script src="{{ asset('assets/js/custom/widgets.js') }}"></script>
    <script src="{{ asset('assets/js/custom/apps/chat/chat.js') }}"></script>
    <script src="{{ asset('assets/js/custom/utilities/modals/upgrade-plan.js') }}"></script>
    <script src="{{ asset('assets/js/custom/utilities/modals/create-app.js') }}"></script>
    <script src="{{ asset('assets/js/custom/utilities/modals/users-search.js') }}"></script>
    <!--end::Custom Javascript-->
@endsection
