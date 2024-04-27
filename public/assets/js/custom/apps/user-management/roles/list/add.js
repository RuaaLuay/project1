"use strict";
function errorInputMessage(errors) {
    var finalMessage = '';
    $.each(errors, function (key, value) {
        $("#error_" + key).text(value[0]);
    });
}
var KTUsersAddRole = function () {
    const t = document.getElementById("kt_modal_add_role"),
        e = t.querySelector("#kt_modal_add_role_form"),
        n = new bootstrap.Modal(t);
        const checkboxes = document.querySelectorAll('input[name="permission"]');
    const formData = new FormData(e); // Serialize the form data

    const checkedValues = [];

    return {
        init: function () {
            (() => {
                var o = FormValidation.formValidation(e, {
                    fields: {role_name: {validators: {notEmpty: {message: "Role name is required"}}}},
                    plugins: {
                        trigger: new FormValidation.plugins.Trigger,
                        bootstrap: new FormValidation.plugins.Bootstrap5({
                            rowSelector: ".fv-row",
                            eleInvalidClass: "",
                            eleValidClass: ""
                        })
                    }
                });
                t.querySelector('[data-kt-roles-modal-action="close"]').addEventListener("click", (t => {
                    t.preventDefault(), Swal.fire({
                        text: "Are you sure you would like to close?",
                        icon: "warning",
                        showCancelButton: !0,
                        buttonsStyling: !1,
                        confirmButtonText: "Yes, close it!",
                        cancelButtonText: "No, return",
                        customClass: {confirmButton: "btn btn-primary", cancelButton: "btn btn-active-light"}
                    }).then((function (t) {
                        t.value && n.hide()
                    }))
                })), t.querySelector('[data-kt-roles-modal-action="cancel"]').addEventListener("click", (t => {
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
                const r = t.querySelector('[data-kt-roles-modal-action="submit"]');
                r.addEventListener("click", (function (t) {
                    t.preventDefault(),
                    o && o.validate()
                        .then((function (t) {
                            checkboxes.forEach(checkbox => {
                                // Check if the checkbox is checked
                                if (checkbox.checked) {
                                    // If checked, add its value to the array
                                    checkedValues.push(checkbox.value);
                                }
                            });
                            console.log(checkedValues);
                            console.log("validated!");
                            if ("Valid" == t) {
                                e.setAttribute("data-kt-indicator", "on");
                                e.disabled = true;
                                // var formData = {
                                //     'name': $("input[name='role_name']").val(),
                                //     'checkedValues':checkedValues
                                // };
                                formData.append('checkedValues', checkedValues); // Append the checkedValues array
                                formData.append('name',$("input[name='role_name']").val())
                                $.ajax({
                                    url: "/admin/roles/",
                                    type: "POST",
                                    data: formData,
                                    processData: false,
                                    contentType: false, // Set contentType to false when sending FormData
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
                                        }
                                    },
                                    error: function (jqXHR, error, errorThrown) {
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
                                        e.removeAttribute("data-kt-indicator");
                                        e.disabled = false;
                                    },
                                });

                            }
                        }))
                }))
            })()
        }
    }
}();
KTUtil.onDOMContentLoaded((function () {
    KTUsersAddRole.init()
}));
