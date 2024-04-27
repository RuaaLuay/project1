@extends('Layouts.Layout')
@section('custom-head')
    <!--begin::Vendor Stylesheets(used for this page only)-->
    <link href="{{ asset('assets/plugins/custom/datatables/datatables.bundle.css') }}" rel="stylesheet" type="text/css" />
    <!--end::Vendor Stylesheets-->
@endsection
@section('Main')
    <!-- Standalone Page Content -->
    <div class="container mt-5">
        <h2 class="fw-bold">Update Role</h2>
        <br>

        <!-- Begin Form -->
        <form id="kt_modal_update_role_form" class="form fv-plugins-bootstrap5 fv-plugins-framework" action="#">
            @method('PUT')
            <!-- Input Group -->
            <div class="fv-row mb-4 fv-plugins-icon-container">
                <label class="fs-5 fw-bold form-label mb-2">
                    <span class="required">Role name</span>
                </label>
                <input type="hidden" name="role_id" value="{{$role->id}}">
                <input class="form-control form-control-solid" placeholder="Enter a role name" name="role_name" value="{{$role->name}}">
                <div class="fv-plugins-message-container fv-plugins-message-container--enabled invalid-feedback"></div>
            </div>
            <!-- End Input Group -->

            <!-- Permissions -->
            <div class="fv-row">
                <label class="fs-5 fw-bold form-label mb-2">Role Permissions</label>
                <!-- Table Wrapper -->
                <div class="table-responsive">
                    <!-- Table -->
                    <table class="table align-middle table-row-dashed fs-6 gy-5">
                        <!-- Table Body -->
                        <tbody class="text-gray-600 fw-semibold">
                        <!-- Loop through permissions here -->
                        @foreach($permissions as $permission)
                            <tr>
                                <td class="text-gray-800">{{$permission->name}}</td>
                                <td>
                                    <div class="d-flex">
                                        <label class="form-check form-check-sm form-check-custom form-check-solid me-5 me-lg-20">
                                            <input class="form-check-input" type="checkbox" value="{{$permission->name}}" name="permission"
                                                   @if($role->hasPermissionTo($permission, 'admin')) checked @endif>
                                        </label>
                                    </div>
                                </td>
                            </tr>
                        @endforeach

                        <!-- End Loop -->
                        </tbody>
                        <!-- End Table Body -->
                    </table>
                    <!-- End Table -->
                </div>
                <!-- End Table Wrapper -->
            </div>
            <!-- End Permissions -->

            <!-- Actions -->
            <div class="text-center pt-15">
                <button type="reset" class="btn btn-light me-3" data-kt-roles-modal-action="cancel" id="cancel_edit" data-route="{{ url('/admin/roles') }}">Cancel</button>
                <button type="submit" class="btn btn-primary" data-kt-roles-modal-action="submit" id="submit_edit">
                    <span class="indicator-label">Submit</span>
                    <span class="indicator-progress">Please wait...
                    <span class="spinner-border spinner-border-sm align-middle ms-2"></span>
                </span>
                </button>
            </div>
            <!-- End Actions -->
        </form>
        <!-- End Form -->
    </div>
    <!-- End Standalone Page Content -->

@stop
@section('custom-js')
    <!--begin::Vendors Javascript(used for this page only)-->
    <script src="{{ asset('assets/plugins/custom/datatables/datatables.bundle.js') }}"></script>
    <!--end::Vendors Javascript-->
    <!--begin::Custom Javascript(used for this page only)-->
{{--    <script src="{{ asset('assets/js/custom/apps/user-management/roles/list/add.js') }}"></script>--}}
    <script src="{{ asset('assets/js/custom/apps/user-management/roles/list/update-role.js') }}"></script>
    <script src="{{ asset('assets/js/widgets.bundle.js') }}"></script>
    <script src="{{ asset('assets/js/custom/widgets.js') }}"></script>
    <script src="{{ asset('assets/js/custom/apps/chat/chat.js') }}"></script>
    <script src="{{ asset('assets/js/custom/utilities/modals/upgrade-plan.js') }}"></script>
    <script src="{{ asset('assets/js/custom/utilities/modals/create-app.js') }}"></script>
    <script src="{{ asset('assets/js/custom/utilities/modals/users-search.js') }}"></script>
    <!--end::Custom Javascript-->
@endsection
