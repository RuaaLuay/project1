// "use strict";
// var KTAccountSettingsProfileDetails = function () {
//     var e, t;
//     return {
//         init: function () {
//             (e = document.getElementById("kt_account_profile_details_form")) && (e.querySelector("#kt_account_profile_details_submit"),
//                 t = FormValidation.formValidation(e, {
//                 fields: {
//                     fname: {validators: {notEmpty: {message: "First name is required"}}},
//                     lname: {validators: {notEmpty: {message: "Last name is required"}}},
//                     // company: {validators: {notEmpty: {message: "Company name is required"}}},
//                     // phone: {validators: {notEmpty: {message: "Contact phone number is required"}}},
//                     // country: {validators: {notEmpty: {message: "Please select a country"}}},
//                     // timezone: {validators: {notEmpty: {message: "Please select a timezone"}}},
//                     // "communication[]": {validators: {notEmpty: {message: "Please select at least one communication method"}}},
//                     // language: {validators: {notEmpty: {message: "Please select a language"}}}
//                 },
//                 plugins: {
//                     trigger: new FormValidation.plugins.Trigger,
//                     submitButton: new FormValidation.plugins.SubmitButton,
//                     bootstrap: new FormValidation.plugins.Bootstrap5({
//                         rowSelector: ".fv-row",
//                         eleInvalidClass: "",
//                         eleValidClass: ""
//                     })
//                 }
//             }))
//         }
//     }
// }();
// KTUtil.onDOMContentLoaded((function () {
//     KTAccountSettingsProfileDetails.init()
// }));

"use strict";
var KTAccountSettingsProfileDetails = function () {
    var e, t;
    return {
        init: function () {
            (e = document.getElementById("kt_account_profile_details_form")) && (e.querySelector("#kt_account_profile_details_submit"),
                t = FormValidation.formValidation(e, {
                    fields: {
                        fname: {validators: {notEmpty: {message: "First name is required"}}},
                        lname: {validators: {notEmpty: {message: "Last name is required"}}},
                        // Add validators for other form fields as needed
                    },
                    plugins: {
                        trigger: new FormValidation.plugins.Trigger,
                        submitButton: new FormValidation.plugins.SubmitButton,
                        bootstrap: new FormValidation.plugins.Bootstrap5({
                            rowSelector: ".fv-row",
                            eleInvalidClass: "",
                            eleValidClass: ""
                        })
                    }
                }));

            // Add an event listener to the form's submit button
            if (e) {
                e.querySelector("#kt_account_profile_details_submit").addEventListener("click", function (event) {
                    event.preventDefault(); // Prevent the default form submission

                    // Validate the form using FormValidation
                    t.validate().then(function (status) {
                        if (status === "Valid") {
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
                            // If the form is valid, make an AJAX request here
                            // Replace the following code with your actual AJAX request
                            console.log("Form is valid. Making AJAX request...");

                            // Example AJAX request using fetch API
                            fetch("your_ajax_url_here", {
                                method: "POST", // or "GET" or other HTTP methods
                                body: new FormData(e), // You can send the form data
                            })
                                .then(function(response) {
                                    // Handle the response here
                                    console.log("AJAX response:", response);
                                })
                                .catch(function(error) {
                                    // Handle any errors that occurred during the fetch
                                    console.error("AJAX error:", error);
                                });
                        }
                    });
                });
            }
        }
    };
}();

KTUtil.onDOMContentLoaded(function () {
    KTAccountSettingsProfileDetails.init();
});
