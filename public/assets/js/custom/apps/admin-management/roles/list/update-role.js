// "use strict";
// var KTUsersUpdatePermissions = function () {
//     const t = document.getElementById("kt_modal_update_role"), e = t.querySelector("#kt_modal_update_role_form"),
//         n = new bootstrap.Modal(t);
//     return {
//         init: function () {
//             (() => {
//                 var o = FormValidation.formValidation(e, {
//                     fields: {role_name: {validators: {notEmpty: {message: "Role name is required"}}}},
//                     plugins: {
//                         trigger: new FormValidation.plugins.Trigger,
//                         bootstrap: new FormValidation.plugins.Bootstrap5({
//                             rowSelector: ".fv-row",
//                             eleInvalidClass: "",
//                             eleValidClass: ""
//                         })
//                     }
//                 });
//                 t.querySelector('[data-kt-roles-modal-action="close"]').addEventListener("click", (t => {
//                     t.preventDefault(), Swal.fire({
//                         text: "Are you sure you would like to close?",
//                         icon: "warning",
//                         showCancelButton: !0,
//                         buttonsStyling: !1,
//                         confirmButtonText: "Yes, close it!",
//                         cancelButtonText: "No, return",
//                         customClass: {confirmButton: "btn btn-primary", cancelButton: "btn btn-active-light"}
//                     }).then((function (t) {
//                         t.value && n.hide()
//                     }))
//                 })), t.querySelector('[data-kt-roles-modal-action="cancel"]').addEventListener("click", (t => {
//                     t.preventDefault(), Swal.fire({
//                         text: "Are you sure you would like to cancel?",
//                         icon: "warning",
//                         showCancelButton: !0,
//                         buttonsStyling: !1,
//                         confirmButtonText: "Yes, cancel it!",
//                         cancelButtonText: "No, return",
//                         customClass: {confirmButton: "btn btn-primary", cancelButton: "btn btn-active-light"}
//                     }).then((function (t) {
//                         t.value ? (e.reset(), n.hide()) : "cancel" === t.dismiss && Swal.fire({
//                             text: "Your form has not been cancelled!.",
//                             icon: "error",
//                             buttonsStyling: !1,
//                             confirmButtonText: "Ok, got it!",
//                             customClass: {confirmButton: "btn btn-primary"}
//                         })
//                     }))
//                 }));
//                 const i = t.querySelector('[data-kt-roles-modal-action="submit"]');
//                 i.addEventListener("click", (function (t) {
//                     t.preventDefault(), o && o.validate().then((function (t) {
//                         console.log("validated!"), "Valid" == t ? (i.setAttribute("data-kt-indicator", "on"), i.disabled = !0, setTimeout((function () {
//                             i.removeAttribute("data-kt-indicator"), i.disabled = !1, Swal.fire({
//                                 text: "Form has been successfully submitted!",
//                                 icon: "success",
//                                 buttonsStyling: !1,
//                                 confirmButtonText: "Ok, got it!",
//                                 customClass: {confirmButton: "btn btn-primary"}
//                             }).then((function (t) {
//                                 t.isConfirmed && n.hide()
//                             }))
//                         }), 2e3)) : Swal.fire({
//                             text: "Sorry, looks like there are some errors detected, please try again.",
//                             icon: "error",
//                             buttonsStyling: !1,
//                             confirmButtonText: "Ok, got it!",
//                             customClass: {confirmButton: "btn btn-primary"}
//                         })
//                     }))
//                 }))
//             })(), (() => {
//                 const t = e.querySelector("#kt_roles_select_all"), n = e.querySelectorAll('[type="checkbox"]');
//                 t.addEventListener("change", (t => {
//                     n.forEach((e => {
//                         e.checked = t.target.checked
//                     }))
//                 }))
//             })()
//         }
//     }
// }();
// KTUtil.onDOMContentLoaded((function () {
//     KTUsersUpdatePermissions.init()
// }));
"use strict";
// function errorInputMessage(errors) {
//     var finalMessage = '';
//     $.each(errors, function (key, value) {
//         $("#error_" + key).text(value[0]);
//     });
// }
//
//
// var KTUsersAddRole = function () {
//     const e = document.querySelector("#kt_modal_update_role_form");
//     const checkboxes = document.querySelectorAll('input[name="permission"]');
//     const formData = new FormData(e); // Serialize the form data
//     const checkedValues = [];
//
//     return {
//         init: function () {
//             (() => {
//                 var o = FormValidation.formValidation(e, {
//                     fields: {role_name: {validators: {notEmpty: {message: "Role name is required"}}}},
//                     plugins: {
//                         trigger: new FormValidation.plugins.Trigger,
//                         bootstrap: new FormValidation.plugins.Bootstrap5({
//                             rowSelector: ".fv-row",
//                             eleInvalidClass: "",
//                             eleValidClass: ""
//                         })
//                     }
//                 });
//                 const t = e.querySelector('[data-kt-roles-modal-action="cancel"]');
//                 t.addEventListener("click", (t => {
//                     t.preventDefault(), Swal.fire({
//                         text: "Are you sure you would like to cancel?",
//                         icon: "warning",
//                         showCancelButton: !0,
//                         buttonsStyling: !1,
//                         confirmButtonText: "Yes, cancel it!",
//                         cancelButtonText: "No, return",
//                         customClass: {confirmButton: "btn btn-primary", cancelButton: "btn btn-active-light"}
//                     }).then((function (t) {
//                         t.value && n.hide()
//                     }))
//                 })), t.querySelector('[data-kt-roles-modal-action="cancel"]')
//                     .addEventListener("click", (t => {
//                     t.preventDefault(), Swal.fire({
//                         text: "Are you sure you would like to cancel?",
//                         icon: "warning",
//                         showCancelButton: !0,
//                         buttonsStyling: !1,
//                         confirmButtonText: "Yes, cancel it!",
//                         cancelButtonText: "No, return",
//                         customClass: {confirmButton: "btn btn-primary", cancelButton: "btn btn-active-light"}
//                     }).then((function (t) {
//                         t.value ? (e.reset()) : "cancel" === t.dismiss && Swal.fire({
//                             text: "Your form has not been cancelled!.",
//                             icon: "error",
//                             buttonsStyling: !1,
//                             confirmButtonText: "Ok, got it!",
//                             customClass: {confirmButton: "btn btn-primary"}
//                         })
//                     }))
//                 }));
//                 const r = document.querySelector('[data-kt-roles-modal-action="submit"]');
//                 r.addEventListener("click", (function (t) {
//                     t.preventDefault(),
//                     o && o.validate()
//                         .then((function (t) {
//                             checkboxes.forEach(checkbox => {
//                                 // Check if the checkbox is checked
//                                 if (checkbox.checked) {
//                                     // If checked, add its value to the array
//                                     checkedValues.push(checkbox.value);
//                                 }
//                             });
//                             console.log(checkedValues);
//                             console.log("validated!");
//                             if ("Valid" == t) {
//                                 e.setAttribute("data-kt-indicator", "on");
//                                 e.disabled = true;
//                                 // var formData = {
//                                 //     'name': $("input[name='role_name']").val(),
//                                 //     'checkedValues':checkedValues
//                                 // };
//                                 formData.append('checkedValues', checkedValues); // Append the checkedValues array
//                                 formData.append('name',$("input[name='role_name']").val())
//                                 // $.ajax({
//                                 //     url: "/admin/roles/",
//                                 //     type: "POST",
//                                 //     data: formData,
//                                 //     processData: false,
//                                 //     contentType: false, // Set contentType to false when sending FormData
//                                 //     headers: {
//                                 //         'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
//                                 //     },
//                                 //     success: function (response) {
//                                 //         // console.log(imageInput.files[0].name)
//                                 //         if (response.status === true) {
//                                 //             Swal.fire({
//                                 //                 text: response.message,
//                                 //                 icon: "success",
//                                 //                 buttonsStyling: false,
//                                 //                 confirmButtonText: "Ok, got it!",
//                                 //                 customClass: { confirmButton: "btn btn-primary" },
//                                 //             }).then(function (result) {
//                                 //                 if (result.isConfirmed) {
//                                 //                     n.hide();
//                                 //                     blockUI.release();
//                                 //                 }
//                                 //             });
//                                 //         } else {
//                                 //             // Check if there are validation errors in the response
//                                 //             console.log(response);
//                                 //         }
//                                 //     },
//                                 //     error: function (jqXHR, error, errorThrown) {
//                                 //         console.log(jqXHR);
//                                 //         if (typeof jqXHR.responseJSON == 'undefined') {
//                                 //             console.log(formData);
//                                 //             // errorServe();
//                                 //             // blockUI.release();
//                                 //         } else {
//                                 //             let errors = jqXHR.responseJSON.errors;
//                                 //             if (errors) {
//                                 //                 console.log(errors);
//                                 //                 errorInputMessage(errors);
//                                 //                 $.each(errors, function(key, value) {
//                                 //                     toastr.error(value);
//                                 //                 })
//                                 //                 blockUI.release();
//                                 //             }
//                                 //         }
//                                 //     },
//                                 //     complete: function () {
//                                 //         // Restore the button state after AJAX completes
//                                 //         e.removeAttribute("data-kt-indicator");
//                                 //         e.disabled = false;
//                                 //     },
//                                 // });
//
//                             }
//                         }))
//                 }))
//             })()
//         }
//     }
// }();
// KTUtil.onDOMContentLoaded((function () {
//     KTUsersAddRole.init()
// }));
function errorInputMessage(errors) {
    var finalMessage = '';
    $.each(errors, function (key, value) {
        $("#error_" + key).text(value[0]);
    });
}
$(document).ready(function() {
    $('body').on('click', '#submit_edit', function (e) {
        e.preventDefault();
        // Select parent row
        const parent = e.target.closest('form');
        // var target = e.target.closest('tr');
        var blockUI = new KTBlockUI(parent);
        // Get customer name
        var name =  $('input[name="role_name"]').val();
        var id =  $('input[name="role_id"]').val();
        const checkboxes = document.querySelectorAll('input[name="permission"]');
        const form = document.querySelectorAll('#kt_modal_update_role_form');
        const formData = new FormData(); // Serialize the form data
        const checkedValues = [];
        Swal.fire({
            text: "Are you sure you want to update the  " + name + "role?",
            icon: "warning",
            showCancelButton: true,
            buttonsStyling: false,
            confirmButtonText: "Yes!",
            cancelButtonText: "No, cancel",
            customClass: {
                confirmButton: "btn fw-bold btn-danger",
                cancelButton: "btn fw-bold btn-active-light-primary"
            }
        }).then(function (result) {
            if (result.value) {
                checkboxes.forEach(checkbox => {
                    if (checkbox.checked) {
                        checkedValues.push(checkbox.value);
                    }
                });
                formData.append('checkedValues', "checkedValues"); // Append the checkedValues array
                formData.append('name',"name")
                console.log(checkedValues.length);
                $.ajax({
                    url: "/admin/roles/"+id,
                    type: "PUT",
                    data:{
                        'id':id,
                        'name':name,
                        'checkedValues':checkedValues,
                        'edit_mode':'true'
                    },
                    // processData: false,
                    // contentType: false, // Set contentType to false when sending FormData
                    headers: {
                        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content'),
                    },
                    success: function (response) {
                        if (response.status === true) {
                            Swal.fire({
                                text: response.message,
                                icon: "success",
                                buttonsStyling: false,
                                confirmButtonText: "Ok, got it!",
                                customClass: { confirmButton: "btn btn-primary" },
                            }).then(function (result) {
                                if (result.isConfirmed) {
                                    blockUI.release();
                                }
                                window.location.href = response.data;
                            });
                        } else {
                            // Check if there are validation errors in the response
                            console.log(response);
                        }
                    },
                    error: function (jqXHR, error, errorThrown) {
                        console.log(formData);
                        console.log(jqXHR);
                        if (typeof jqXHR.responseJSON == 'undefined') {
                            console.log(formData);
                            // errorServe();
                            // blockUI.release();
                        } else {
                            let errors = jqXHR.responseJSON.errors;
                            if (errors) {
                                console.log(errors);
                                errorInputMessage(errors);
                                $.each(errors, function(key, value) {
                                    toastr.error(value);
                                })
                                blockUI.release();
                            }
                        }
                    },
                    complete: function () {
                        // Restore the button state after AJAX completes
                        e.disabled = false;
                    },
                });

            } else if (result.dismiss === 'cancel') {
                Swal.fire({
                    text: name + " was not updated.",
                    icon: "error",
                    buttonsStyling: false,
                    confirmButtonText: "Ok, got it!",
                    customClass: {
                        confirmButton: "btn fw-bold btn-primary",
                    }
                });
            }
        });
    })
    $('body').on('click', '#cancel_edit', function (e) {
        window.location.href = "http://127.0.0.1:8000/admin/roles";
    })

});
