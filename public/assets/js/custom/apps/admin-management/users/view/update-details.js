"use strict";

function errorInputMessage(errors) {
    var finalMessage = '';
    $.each(errors, function (key, value) {
        $("#error_" + key).text(value[0]);
    });
}

var KTUsersUpdateDetails = function () {
    const t = document.getElementById("kt_modal_update_details"),
        e = t.querySelector("#kt_modal_update_user_form"),
        n = new bootstrap.Modal(t);
    var target = document.querySelector("#kt_modal_update_user_form");
    var blockUI = new KTBlockUI(target);
    return {
        init: function () {
            (() => {
                t.querySelector('[data-kt-users-modal-action="close"]').addEventListener("click", (t => {
                    t.preventDefault(), Swal.fire({
                        text: "Are you sure you would like to cancel?",
                        icon: "warning",
                        showCancelButton: !0,
                        buttonsStyling: !1,
                        confirmButtonText: "Yes, cancel it!",
                        cancelButtonText: "No, return",
                        customClass: {confirmButton: "btn btn-primary", cancelButton: "btn btn-active-light"}
                    }).
                    then((function (t) {
                        t.value ? (e.reset(), n.hide()) : "cancel" === t.dismiss && Swal.fire({
                            text: "Your form has not been cancelled!.",
                            icon: "error",
                            buttonsStyling: !1,
                            confirmButtonText: "Ok, got it!",
                            customClass: {confirmButton: "btn btn-primary"}
                        })
                    }))
                })), t.querySelector('[data-kt-users-modal-action="cancel"]').addEventListener("click", (t => {
                    t.preventDefault(), Swal.fire({
                        text: "Are you sure you would like to cancel?",
                        icon: "warning",
                        showCancelButton: !0,
                        buttonsStyling: !1,
                        confirmButtonText: "Yes, cancel it!",
                        cancelButtonText: "No, return",
                        customClass: {confirmButton: "btn btn-primary", cancelButton: "btn btn-active-light"}
                    }).then((function (t) {
                        t.value ? (e.reset(), n.hide()) : "cancel" === t.dismiss && Swal.fire({
                            text: "Your form has not been cancelled!.",
                            icon: "error",
                            buttonsStyling: !1,
                            confirmButtonText: "Ok, got it!",
                            customClass: {confirmButton: "btn btn-primary"}
                        })
                    }))
                }));

                const o = t.querySelector('[data-kt-users-modal-action="submit"]');
                o.addEventListener("click", (function (t) {
                    t.preventDefault(), o.setAttribute("data-kt-indicator", "on"), o.disabled = !0;
                    var formData = {
                        'name': $("input[name='name']").val(),
                        'email': $("input[name='email']").val(),
                        'edit_mode': $("input[name='edit_mode']").val(),
                        'id': $("input[name='id']").val(),
                        'role':  $("input[name='user_role']:checked").val()
                    };

                    // Add form data
                    // formDataWithImage.append('name', formData.name);
                    // formDataWithImage.append('email', formData.email);
                    // formDataWithImage.append('edit_mode', formData.edit_mode);
                    // formDataWithImage.append('id', formData.id);

                    $.ajax({
                        url: "/admin/admins/edit/",
                        type: "POST",
                        data: formData,
                        // processData: false,
                        // contentType: fromJSON, // Set contentType to false when sending FormData
                        headers: {
                            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                        },
                        success: function (response) {
                            // console.log(imageInput.files[0].name)
                            if (response.status === true) {
                                Swal.fire({
                                    text: response.message,
                                    icon: "success",
                                    buttonsStyling: false,
                                    confirmButtonText: "Ok, got it!",
                                    customClass: {confirmButton: "btn btn-primary"},
                                }).then(function (result) {
                                    if (result.isConfirmed) {
                                        n.hide();
                                        blockUI.release();
                                        window.location.reload();
                                    }
                                });
                            } else {
                                console.log(response);
                            }
                        },
                        error: function (jqXHR, error, errorThrown) {
                            console.log(jqXHR);
                            if (typeof jqXHR.responseJSON == 'undefined') {
                                errorServe();
                                blockUI.release();
                            } else {
                                let errors = jqXHR.responseJSON.errors;
                                if (errors) {
                                    errorInputMessage(errors);
                                    $.each(errors, function (key, value) {
                                        toastr.error(value);
                                    })
                                    blockUI.release();
                                }
                            }
                        },
                        complete: function () {
                            console.log(formData);
                            // Restore the button state after AJAX completes
                            o.removeAttribute("data-kt-indicator");
                            o.disabled = false;
                        },
                    });
                }))
            })()
        }
    }
}();
KTUtil.onDOMContentLoaded((function () {
    KTUsersUpdateDetails.init()
}));

// "use strict";
// var KTUsersAddUser = function () {
//     const t = document.getElementById("kt_modal_add_user"), e = t.querySelector("#kt_modal_add_user_form"),
//         n = new bootstrap.Modal(t);
//     var target = document.querySelector("#kt_modal_add_user_form");
//     var blockUI = new KTBlockUI(target);
//     return {
//         init: function () {
//             (() => {
//                 var o = FormValidation.formValidation(e, {
//                     fields: {
//                         user_name: {validators: {notEmpty: {message: "Full name is required"}}},
//                         user_email: {validators: {notEmpty: {message: "Valid email address is required"}}}
//                     }, plugins: {
//                         trigger: new FormValidation.plugins.Trigger, bootstrap: new FormValidation.plugins.Bootstrap5({
//                             rowSelector: ".fv-row", eleInvalidClass: "", eleValidClass: ""
//                         })
//                     }
//                 });
//                 const i = t.querySelector('[data-kt-users-modal-action="submit"]');
//                 i.addEventListener("click", (t => {
//                     blockUI.block();
//                     t.preventDefault();
//                     var imageInput = document.getElementById('avatar');
//                     o.validate()
//                         .then((function (t) {
//                             console.log("validated!");
//                             if ("Valid" == t) {
//                                 i.setAttribute("data-kt-indicator", "on");
//                                 i.disabled = true;
//                                 var formData = {
//                                     'name': $("input[name='user_name']").val(),
//                                     'email': $("input[name='user_email']").val(),
//                                 };
//                                 var imageInput = document.getElementById('avatar');
//                                 var imageFile = imageInput.files[0];
//                                 var formDataWithImage = new FormData();
//                                 // Add form data
//                                 formDataWithImage.append('name', formData.name);
//                                 formDataWithImage.append('email', formData.email);
//
//                                 // Add image file (if selected)
//                                 if (imageFile) {
//                                     formDataWithImage.append('avatar', imageFile);
//                                 }
//                                 $.ajax({
//                                     url: "/admin/users/add",
//                                     type: "POST",
//                                     data: formDataWithImage,
//                                     processData: false,
//                                     contentType: false, // Set contentType to false when sending FormData
//                                     headers: {
//                                         'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
//                                     },
//                                     success: function (response) {
//                                         // console.log(imageInput.files[0].name)
//                                         if (response.status === true) {
//                                             Swal.fire({
//                                                 text: response.message,
//                                                 icon: "success",
//                                                 buttonsStyling: false,
//                                                 confirmButtonText: "Ok, got it!",
//                                                 customClass: {confirmButton: "btn btn-primary"},
//                                             }).then(function (result) {
//                                                 if (result.isConfirmed) {
//                                                     n.hide();
//                                                     blockUI.release();
//                                                 }
//                                             });
//                                         } else {
//                                             // Check if there are validation errors in the response
//                                             console.log(response);
//                                             /*if (response.errors) {
//                                                 var errorMessages = Object.values(response.errors).join("<br>");
//                                                 Swal.fire({
//                                                     title: "Validation Error",
//                                                     html: errorMessages,
//                                                     icon: "error",
//                                                     buttonsStyling: false,
//                                                     confirmButtonText: "Ok, got it!",
//                                                     customClass: { confirmButton: "btn btn-primary" },
//                                                 });
//                                             } else {
//                                                 Swal.fire({
//                                                     text: "Sorry, looks like there are some errors detected, please try again.",
//                                                     icon: "error",
//                                                     buttonsStyling: false,
//                                                     confirmButtonText: "Ok, got it!",
//                                                     customClass: { confirmButton: "btn btn-primary" },
//                                                 });
//                                             }*/
//                                         }
//                                     },
//                                     error: function (jqXHR, error, errorThrown) {
//                                         console.log(jqXHR);
//                                         if (typeof jqXHR.responseJSON == 'undefined') {
//                                             errorServe();
//                                             blockUI.release();
//                                         } else {
//                                             let errors = jqXHR.responseJSON.errors;
//                                             if (errors) {
//                                                 console.log(errors);
//                                                 errorInputMessage(errors);
//                                                 $.each(errors, function (key, value) {
//                                                     toastr.error(value);
//                                                 })
//                                                 blockUI.release();
//                                             }
//                                         }
//                                         /*Swal.fire({
//                                             text: "Sorry, there was an error processing your request. Please try again later.",
//                                             icon: "error",
//                                             buttonsStyling: false,
//                                             confirmButtonText: "Ok, got it!",
//                                             customClass: { confirmButton: "btn btn-primary" },
//                                         });*/
//                                     },
//                                     complete: function () {
//                                         // Restore the button state after AJAX completes
//                                         i.removeAttribute("data-kt-indicator");
//                                         i.disabled = false;
//                                     },
//                                 });
//
//                             }
//                         }))
//                 }));
//                 t.querySelector('[data-kt-users-modal-action="cancel"]').addEventListener("click", (t => {
//                     t.preventDefault();
//                     Swal.fire({
//                         text: "Are you sure you would like to cancel?",
//                         icon: "warning",
//                         showCancelButton: true,
//                         buttonsStyling: false,
//                         confirmButtonText: "Yes, cancel it!",
//                         cancelButtonText: "No, return",
//                         customClass: {confirmButton: "btn btn-primary", cancelButton: "btn btn-active-light"}
//                     }).then((function (t) {
//                         t.value ? (e.reset(), n.hide()) : "cancel" === t.dismiss && Swal.fire({
//                             text: "Your form has not been cancelled!.",
//                             icon: "error",
//                             buttonsStyling: false,
//                             confirmButtonText: "Ok, got it!",
//                             customClass: {confirmButton: "btn btn-primary"}
//                         })
//                     }))
//                 }));
//                 t.querySelector('[data-kt-users-modal-action="close"]').addEventListener("click", (t => {
//                     t.preventDefault();
//                     Swal.fire({
//                         text: "Are you sure you would like to cancel?",
//                         icon: "warning",
//                         showCancelButton: true,
//                         buttonsStyling: false,
//                         confirmButtonText: "Yes, cancel it!",
//                         cancelButtonText: "No, return",
//                         customClass: {confirmButton: "btn btn-primary", cancelButton: "btn btn-active-light"}
//                     }).then((function (t) {
//                         t.value ? (e.reset(), n.hide()) : "cancel" === t.dismiss && Swal.fire({
//                             text: "Your form has not been cancelled!.",
//                             icon: "error",
//                             buttonsStyling: false,
//                             confirmButtonText: "Ok, got it!",
//                             customClass: {confirmButton: "btn btn-primary"}
//                         })
//                     }))
//                 }))
//             })()
//         }
//     }
// }();
// KTUtil.onDOMContentLoaded((function () {
//     KTUsersAddUser.init()
// }));
