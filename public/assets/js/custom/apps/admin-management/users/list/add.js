"use strict";
function errorInputMessage(errors) {
    var finalMessage = '';
    $.each(errors, function (key, value) {
        $("#error_" + key).text(value[0]);
    });
}
var KTUsersAddUser = function () {
    const t = document.getElementById("kt_modal_add_user"), e = t.querySelector("#kt_modal_add_user_form"),
        n = new bootstrap.Modal(t);
    var target = document.querySelector("#kt_modal_add_user_form");
    var blockUI = new KTBlockUI(target);
    return {
        init: function () {
            (() => {
                var o = FormValidation.formValidation(e, {
                    fields: {
                        user_name: {validators: {notEmpty: {message: "Full name is required"}}},
                        user_email: {validators: {notEmpty: {message: "Valid email address is required"}}}
                    },
                    plugins: {
                        trigger: new FormValidation.plugins.Trigger,
                        bootstrap: new FormValidation.plugins.Bootstrap5({
                            rowSelector: ".fv-row",
                            eleInvalidClass: "",
                            eleValidClass: ""
                        })
                    }
                });
                const i = t.querySelector('[data-kt-users-modal-action="submit"]');
                i.addEventListener("click", (t => {
                    blockUI.block();
                    t.preventDefault();
                    var imageInput = document.getElementById('avatar');
                    o.validate()
                        .then((function (t) {
                            console.log("validated!");
                            if ("Valid" == t) {
                                i.setAttribute("data-kt-indicator", "on");
                                i.disabled = true;
                                var formData = {
                                    'name': $("input[name='user_name']").val(),
                                    'email': $("input[name='user_email']").val(),
                                    'role':  $("input[name='user_role']:checked").val()
                                };
                                // var imageInput = document.getElementById('avatar');
                                // var imageFile = imageInput.files[0];
                                // var formDataWithImage = new FormData();
                                // Add form data
                                // formDataWithImage.append('name', formData.name);
                                // formDataWithImage.append('email', formData.email);

                                // // Add image file (if selected)
                                // if (imageFile) {
                                //     formDataWithImage.append('avatar', imageFile);
                                // }
                                $.ajax({
                                    url: "/admin/admins/add",
                                    type: "POST",
                                    data: formData,
                                    // processData: false,
                                    // contentType: false, // Set contentType to false when sending FormData
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
                                                customClass: { confirmButton: "btn btn-primary" },
                                            }).then(function (result) {
                                                if (result.isConfirmed) {
                                                    n.hide();
                                                    blockUI.release();
                                                }
                                            });
                                        } else {
                                            // Check if there are validation errors in the response
                                            console.log(response);
                                            /*if (response.errors) {
                                                var errorMessages = Object.values(response.errors).join("<br>");
                                                Swal.fire({
                                                    title: "Validation Error",
                                                    html: errorMessages,
                                                    icon: "error",
                                                    buttonsStyling: false,
                                                    confirmButtonText: "Ok, got it!",
                                                    customClass: { confirmButton: "btn btn-primary" },
                                                });
                                            } else {
                                                Swal.fire({
                                                    text: "Sorry, looks like there are some errors detected, please try again.",
                                                    icon: "error",
                                                    buttonsStyling: false,
                                                    confirmButtonText: "Ok, got it!",
                                                    customClass: { confirmButton: "btn btn-primary" },
                                                });
                                            }*/
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
                                                console.log(errors);
                                                errorInputMessage(errors);
                                                $.each(errors, function(key, value) {
                                                    toastr.error(value);
                                                })
                                                blockUI.release();
                                            }
                                        }
                                        /*Swal.fire({
                                            text: "Sorry, there was an error processing your request. Please try again later.",
                                            icon: "error",
                                            buttonsStyling: false,
                                            confirmButtonText: "Ok, got it!",
                                            customClass: { confirmButton: "btn btn-primary" },
                                        });*/
                                    },
                                    complete: function () {
                                        // Restore the button state after AJAX completes
                                        i.removeAttribute("data-kt-indicator");
                                        i.disabled = false;
                                    },
                                });

                            }
                        }))
                }));
                t.querySelector('[data-kt-users-modal-action="cancel"]').addEventListener("click", (t => {
                    t.preventDefault();
                    Swal.fire({
                        text: "Are you sure you would like to cancel?",
                        icon: "warning",
                        showCancelButton: true,
                        buttonsStyling: false,
                        confirmButtonText: "Yes, cancel it!",
                        cancelButtonText: "No, return",
                        customClass: {confirmButton: "btn btn-primary", cancelButton: "btn btn-active-light"}
                    }).then((function (t) {
                        t.value ? (e.reset(), n.hide()) : "cancel" === t.dismiss && Swal.fire({
                            text: "Your form has not been cancelled!.",
                            icon: "error",
                            buttonsStyling: false,
                            confirmButtonText: "Ok, got it!",
                            customClass: {confirmButton: "btn btn-primary"}
                        })
                    }))
                }));
                t.querySelector('[data-kt-users-modal-action="close"]').addEventListener("click", (t => {
                    t.preventDefault();
                    Swal.fire({
                        text: "Are you sure you would like to cancel?",
                        icon: "warning",
                        showCancelButton: true,
                        buttonsStyling: false,
                        confirmButtonText: "Yes, cancel it!",
                        cancelButtonText: "No, return",
                        customClass: {confirmButton: "btn btn-primary", cancelButton: "btn btn-active-light"}
                    }).then((function (t) {
                        t.value ? (e.reset(), n.hide()) : "cancel" === t.dismiss && Swal.fire({
                            text: "Your form has not been cancelled!.",
                            icon: "error",
                            buttonsStyling: false,
                            confirmButtonText: "Ok, got it!",
                            customClass: {confirmButton: "btn btn-primary"}
                        })
                    }))
                }))
            })()
        }
    }
}();
// document.getElementById("avatar").addEventListener("change", function () {
//     // Get the selected file
//     const selectedFile = this.files[0];
//
//     if (selectedFile) {
//         // A file has been selected, proceed with the update
//
//         // Create a FormData object to send the file
//         const formData = new FormData();
//         formData.append("avatar", selectedFile);
//
//         // You can add other data to formData as needed
//
//         // Send an Ajax request to update the avatar
//         $.ajax({
//             url: "/update-avatar", // Replace with your actual update URL
//             method: "POST",
//             data: formData,
//             processData: false,
//             contentType: false,
//             success: function (response) {
//                 // Handle the success response
//             },
//             error: function (error) {
//                 // Handle the error response
//             },
//         });
//     } else {
//         // No file has been selected, you can optionally display a message to the user
//         alert("No file selected. Avatar not updated.");
//     }
// });
KTUtil.onDOMContentLoaded((function () {
    KTUsersAddUser.init()
}));
