"use strict";
function errorInputMessage(errors) {
    var finalMessage = '';
    $.each(errors, function (key, value) {
        $("#error_" + key).text(value[0]);
    });
}
var KTSigninGeneral = function () {
    var t, e, r;
    var target = document.querySelector("#kt_sign_in_form");
    var blockUI = new KTBlockUI(target);
    return {
        init: function () {
            t = document.querySelector("#kt_sign_in_form");
            e = document.querySelector("#kt_sign_in_submit");
            r = FormValidation.formValidation(t, {
                fields: {
                    email: {
                        validators: {
                            regexp: {
                                regexp: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                message: "The value is not a valid email address"
                            },
                            notEmpty: {
                                message: "Email address is required"
                            }
                        }
                    },
                    password: {
                        validators: {
                            notEmpty: {
                                message: "The password is required"
                            }
                        }
                    }
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

            e.addEventListener("click", function (i) {
                blockUI.block();
                i.preventDefault();
                r.validate().then(function (validation) {
                    if ("Valid" == validation) {
                        e.setAttribute("data-kt-indicator", "on");
                        e.disabled = true;
                        var action = e.closest("form").getAttribute("action");
                        var url = t.getAttribute("data-kt-redirect-url");
                        // Perform an AJAX request to the authentication endpoint
                        $.ajaxSetup({
                            headers: {
                                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                            }
                        });
                        $.ajax({
                            url: BASEUrl + action,
                            type: 'POST',
                            data: {
                                email: t.querySelector('[name="email"]').value,
                                password: t.querySelector('[name="password"]').value,
                                contentType: "application/json",
                                // Add any additional data you need to send
                            },
                            success: function (response) {
                                e.removeAttribute("data-kt-indicator");
                                e.disabled = false;
                                if (response.status === true) {
                                    window.location.href = url ;
                                } else {
                                    Swal.fire({
                                        text: "Sorry, the email or password is incorrect, please try again.",
                                        icon: "error",
                                        buttonsStyling: false,
                                        confirmButtonText: "Ok, got it!",
                                        customClass: {
                                            confirmButton: "btn btn-primary"
                                        }
                                    });
                                }
                            },
                            error: function (jqXHR, error, errorThrown) {
                                e.removeAttribute("data-kt-indicator");
                                e.disabled = false;
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
                            }
                        });
                    } else {
                        Swal.fire({
                            text: "Sorry, looks like there are some errors detected, please try again.",
                            icon: "error",
                            buttonsStyling: false,
                            confirmButtonText: "Ok, got it!",
                            customClass: {
                                confirmButton: "btn btn-primary"
                            }
                        });
                    }
                });
            });
        }
    }
}();

KTUtil.onDOMContentLoaded(function () {
    KTSigninGeneral.init();
});

