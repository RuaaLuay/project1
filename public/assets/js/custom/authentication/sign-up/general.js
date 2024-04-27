"use strict";
function errorInputMessage(errors) {
    var finalMessage = '';
    $.each(errors, function (key, value) {
        $("#error_" + key).text(value[0]);
    });
}
var KTSignupGeneral = (function () {
    var form, submitButton, passwordMeter;
    var target = document.querySelector("#kt_sign_up_form");
    var blockUI = new KTBlockUI(target);
    function isPasswordStrong() {
        return passwordMeter.getScore() > 50;
    }

    return {
        init: function () {
            form = document.querySelector("#kt_sign_up_form");
            submitButton = document.querySelector("#kt_sign_up_submit");
            passwordMeter = KTPasswordMeter.getInstance(form.querySelector('[data-kt-password-meter="true"]'));

            var validation = FormValidation.formValidation(form, {
                fields: {
                    email: {
                        validators: {
                            regexp: {
                                regexp: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                message: "The value is not a valid email address"
                            },
                            notEmpty: { message: "Email address is required" }
                        }
                    },
                    password: {
                        validators: {
                            notEmpty: { message: "The password is required" },
                            callback: {
                                message: "Please enter a valid password",
                                callback: function (value) {
                                    if (value.length > 0) return isPasswordStrong();
                                }
                            }
                        }
                    },
                    "confirm-password": {
                        validators: {
                            notEmpty: { message: "Password confirmation is required" },
                            identical: {
                                compare: function () {
                                    return form.querySelector('[name="password"]').value;
                                },
                                message: "The password and its confirmation do not match"
                            }
                        }
                    },
                    toc: {
                        validators: {
                            notEmpty: { message: "You must accept the terms and conditions" }
                        }
                    }
                },
                plugins: {
                    trigger: new FormValidation.plugins.Trigger({ event: { password: false } }),
                    bootstrap: new FormValidation.plugins.Bootstrap5({
                        rowSelector: ".fv-row",
                        eleInvalidClass: "",
                        eleValidClass: ""
                    })
                }
            });


            submitButton.addEventListener("click", function (event) {
                event.preventDefault();
                blockUI.block();
                validation.revalidateField("password");
                validation.validate().then(function (result) {
                    if (result === "Valid") {
                        submitButton.setAttribute("data-kt-indicator", "on");
                        var formData = new FormData(form);
                        $.ajaxSetup({
                            headers: {
                                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                            }
                        });
                        $.ajax({
                            url: BASEUrl + 'register', // Make sure BASEUrl is defined
                            type: 'POST',
                            data: {
                                name: form.querySelector('[name="name"]').value,
                                email: form.querySelector('[name="email"]').value,
                                password: form.querySelector('[name="password"]').value,
                                // confirm_password: $('#confirm_password').val(),
                                contentType: "application/json",
                                headers: {
                                    'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                                },
                            },
                            dataType: 'json',
                            success: function(response) {
                                submitButton.removeAttribute("data-kt-indicator");
                                submitButton.disabled = false;
                                if (response.status === true) {
                                    Swal.fire({
                                        text: response.message,
                                        icon: "success",
                                        buttonsStyling: false,
                                        confirmButtonText: "Ok, got it!",
                                        customClass: {
                                            confirmButton: "btn btn-primary"
                                        }
                                    }).then(function (result) {
                                        if (result.isConfirmed) {
                                            form.querySelector('[name="email"]').value = "";
                                            form.querySelector('[name="password"]').value = "";
                                            form.querySelector('[name="confirm-password"]').value = "";
                                            form.querySelector('[name="name"]').value = "";
                                            // Redirect to a new location
                                            window.location.href = '/dashboard';
                                        }
                                    });
                                }
                            },
                            error: function (jqXHR, error, errorThrown) {
                                submitButton.removeAttribute("data-kt-indicator");
                                submitButton.disabled = false;
                                // console.log(jqXHR);
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
                            text: "Sorry, there are errors in the form. Please try again.",
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

            form.querySelector('input[name="password"]').addEventListener("input", function () {
                if (this.value.length > 0) {
                    validation.updateFieldStatus("password", "NotValidated");
                }
            });
        }
    };
})();

KTUtil.onDOMContentLoaded(function () {
    KTSignupGeneral.init();
});
