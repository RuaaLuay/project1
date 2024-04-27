"use strict";

var KTAuthNewPassword = (function () {
    var form, submitButton, passwordMeter, validator;

    var isStrongPassword = function () {
        return passwordMeter.getScore() > 50;
    };

    var handleFormSubmit = function (event) {
        event.preventDefault();
        validator.revalidateField("password");
        validator.validate().then(function (validationResult) {
            if (validationResult === "Valid") {
                submitButton.setAttribute("data-kt-indicator", "on");
                submitButton.disabled = true;
                $.ajaxSetup({
                    headers: {
                        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                    }
                });
                $.ajax({
                    url:  '/reset-password', // Make sure BASEUrl is defined
                    type: 'POST',
                    data: {
                        // email: form.querySelector('[name="email"]').value,
                        password: form.querySelector('[name="password"]').value,
                        token: form.querySelector('[name="token"]').value,
                        email: form.querySelector('[name="email"]').value,
                        password_confirmation:form.querySelector('[name="password_confirmation"]').value,
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
                                    // form.querySelector('[name="email"]').value = "";
                                    form.querySelector('[name="password"]').value = "";
                                    form.querySelector('[name="password_confirmation"]').value = "";
                                    // form.querySelector('[name="name"]').value = "";
                                    // Redirect to a new location
                                    // window.location.href = '/dashboard';
                                }
                            });

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
                                // errorInputMessage(errors);
                                $.each(errors, function(key, value) {
                                    toastr.error(value);
                                })
                                blockUI.release();
                            }
                        }
                    }
                });
                // axios.post(form.getAttribute("action"), new FormData(form))
                //     .then(function (response) {
                //         if (response.data) {
                //             form.reset();
                //             var redirectUrl = form.getAttribute("data-kt-redirect-url");
                //             if (redirectUrl) {
                //                 location.href = redirectUrl;
                //             }
                //         } else {
                //             showError("Sorry, the email is incorrect, please try again.");
                //         }
                //     })
                //     .catch(function (error) {
                //         showError("Sorry, looks like there are some errors detected, please try again.");
                //     })
                //     .then(function () {
                //         submitButton.removeAttribute("data-kt-indicator");
                //         submitButton.disabled = false;
                //     });
            } else {
                showError("Sorry, looks like there are some errors detected, please try again.");
            }
        });
    };

    var showError = function (message) {
        Swal.fire({
            text: message,
            icon: "error",
            buttonsStyling: false,
            confirmButtonText: "Ok, got it!",
            customClass: { confirmButton: "btn btn-primary" }
        });
    };

    return {
        init: function () {
            form = document.querySelector("#kt_new_password_form");
            submitButton = document.querySelector("#kt_new_password_submit");
            passwordMeter = KTPasswordMeter.getInstance(form.querySelector('[data-kt-password-meter="true"]'));
            validator = FormValidation.formValidation(form,
            {
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
                            notEmpty: {message: "The password is required"},
                            callback: {
                                message: "Please enter valid password", callback: function (t) {
                                    if (t.value.length > 0) return n()
                                }
                            }
                        }
                    },
                    "password_confirmation": {
                        validators: {
                            notEmpty: {message: "The password confirmation is required"},
                            identical: {
                                compare: function () {
                                    return t.querySelector('[name="password"]').value
                                }, message: "The password and its confirm are not the same"
                            }
                        }
                    },
                },
                plugins: {
                    trigger: new FormValidation.plugins.Trigger({event: {password: !1}}),
                        bootstrap: new FormValidation.plugins.Bootstrap5({
                        rowSelector: ".fv-row",
                        eleInvalidClass: "",
                        eleValidClass: ""
                    })
                }

            });

            form.querySelector('input[name="password"]').addEventListener("input", function () {
                if (this.value.length > 0) {
                    validator.updateFieldStatus("password", "NotValidated");
                }
            });

            submitButton.addEventListener("click", handleFormSubmit);
        }
    };
})();

KTUtil.onDOMContentLoaded(function () {
    KTAuthNewPassword.init();
});
