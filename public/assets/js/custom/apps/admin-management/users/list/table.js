// "use strict";
// var KTUsersList = function () {
//     var e, t, n, r, o = document.getElementById("users-table"), c = () => {
//         o.querySelectorAll('[data-kt-users-table-filter="delete_row"]').forEach((t => {
//             t.addEventListener("click", (function (t) {
//                 t.preventDefault();
//                 const n = t.target.closest("tr"), r = n.querySelectorAll("td")[1].querySelectorAll("a")[1].innerText;
//                 Swal.fire({
//                     text: "Are you sure you want to delete " + r + "?",
//                     icon: "warning",
//                     showCancelButton: !0,
//                     buttonsStyling: !1,
//                     confirmButtonText: "Yes, delete!",
//                     cancelButtonText: "No, cancel",
//                     customClass: {
//                         confirmButton: "btn fw-bold btn-danger",
//                         cancelButton: "btn fw-bold btn-active-light-primary"
//                     }
//                 }).then((function (t) {
//                     t.value ? Swal.fire({
//                         text: "You have deleted " + r + "!.",
//                         icon: "success",
//                         buttonsStyling: !1,
//                         confirmButtonText: "Ok, got it!",
//                         customClass: {confirmButton: "btn fw-bold btn-primary"}
//                     }).then((function () {
//                         e.row($(n)).remove().draw()
//                     })).then((function () {
//                         a()
//                     })) : "cancel" === t.dismiss && Swal.fire({
//                         text: customerName + " was not deleted.",
//                         icon: "error",
//                         buttonsStyling: !1,
//                         confirmButtonText: "Ok, got it!",
//                         customClass: {confirmButton: "btn fw-bold btn-primary"}
//                     })
//                 }))
//             }))
//         }))
//     }, l = () => {
//         const c = o.querySelectorAll('[type="checkbox"]');
//         t = document.querySelector('[data-kt-user-table-toolbar="base"]'), n = document.querySelector('[data-kt-user-table-toolbar="selected"]'), r = document.querySelector('[data-kt-user-table-select="selected_count"]');
//         const s = document.querySelector('[data-kt-user-table-select="delete_selected"]');
//         c.forEach((e => {
//             e.addEventListener("click", (function () {
//                 setTimeout((function () {
//                     a()
//                 }), 50)
//             }))
//         })), s.addEventListener("click", (function () {
//             Swal.fire({
//                 text: "Are you sure you want to delete selected customers?",
//                 icon: "warning",
//                 showCancelButton: !0,
//                 buttonsStyling: !1,
//                 confirmButtonText: "Yes, delete!",
//                 cancelButtonText: "No, cancel",
//                 customClass: {
//                     confirmButton: "btn fw-bold btn-danger",
//                     cancelButton: "btn fw-bold btn-active-light-primary"
//                 }
//             }).then((function (t) {
//                 t.value ? Swal.fire({
//                     text: "You have deleted all selected customers!.",
//                     icon: "success",
//                     buttonsStyling: !1,
//                     confirmButtonText: "Ok, got it!",
//                     customClass: {confirmButton: "btn fw-bold btn-primary"}
//                 }).then((function () {
//                     c.forEach((t => {
//                         t.checked && e.row($(t.closest("tbody tr"))).remove().draw()
//                     }));
//                     o.querySelectorAll('[type="checkbox"]')[0].checked = !1
//                 })).then((function () {
//                     a(), l()
//                 })) : "cancel" === t.dismiss && Swal.fire({
//                     text: "Selected customers was not deleted.",
//                     icon: "error",
//                     buttonsStyling: !1,
//                     confirmButtonText: "Ok, got it!",
//                     customClass: {confirmButton: "btn fw-bold btn-primary"}
//                 })
//             }))
//         }))
//     };
//     const a = () => {
//         const e = o.querySelectorAll('tbody [type="checkbox"]');
//         let c = !1, l = 0;
//         e.forEach((e => {
//             e.checked && (c = !0, l++)
//         })), c ? (r.innerHTML = l, t.classList.add("d-none"), n.classList.remove("d-none")) : (t.classList.remove("d-none"), n.classList.add("d-none"))
//     };
//     return {
//         init: function () {
//             // o && (o.querySelectorAll("tbody tr").forEach((e => {
//             //     const t = e.querySelectorAll("td"), n = t[3].innerText.toLowerCase();
//             //     let r = 0, o = "minutes";
//             //     n.includes("yesterday") ? (r = 1, o = "days") : n.includes("mins") ? (r = parseInt(n.replace(/\D/g, "")), o = "minutes") : n.includes("hours") ? (r = parseInt(n.replace(/\D/g, "")), o = "hours") : n.includes("days") ? (r = parseInt(n.replace(/\D/g, "")), o = "days") : n.includes("weeks") && (r = parseInt(n.replace(/\D/g, "")), o = "weeks");
//             //     const c = moment().subtract(r, o).format();
//             //     t[3].setAttribute("data-order", c);
//             //     const l = moment(t[5].innerHTML, "DD MMM YYYY, LT").format();
//             //     t[5].setAttribute("data-order", l)
//             // })), (e = $(o).DataTable({
//             //     info: !1,
//             //     order: [],
//             //     pageLength: 10,
//             //     lengthChange: !1,
//             //     columnDefs: [{orderable: !1, targets: 0}, {orderable: !1, targets: 6}]
//             // })).on("draw", (function () {
//             //     l(), c(), a()
//             // })), l(), document.querySelector('[data-kt-user-table-filter="search"]').addEventListener("keyup", (function (t) {
//             //     e.search(t.target.value).draw()
//             // })), document.querySelector('[data-kt-user-table-filter="reset"]').addEventListener("click", (function () {
//             //     document.querySelector('[data-kt-user-table-filter="form"]').querySelectorAll("select").forEach((e => {
//             //         $(e).val("").trigger("change")
//             //     })), e.search("").draw()
//             // })), c(), (() => {
//             //     const t = document.querySelector('[data-kt-user-table-filter="form"]'),
//             //         n = t.querySelector('[data-kt-user-table-filter="filter"]'), r = t.querySelectorAll("select");
//             //     n.addEventListener("click", (function () {
//             //         var t = "";
//             //         r.forEach(((e, n) => {
//             //             e.value && "" !== e.value && (0 !== n && (t += " "), t += e.value)
//             //         })), e.search(t).draw()
//             //     }))
//             // })())
//         }
//     }
// }();
// KTUtil.onDOMContentLoaded((function () {
//     KTUsersList.init()
// }));
// $(function () {
//     var table = $("#kt_table_users").DataTable({
//         processing: true,
//         serverSide: true,
//         ajax: '/students/list2', // Hardcode the URL here
//         columns: [
//             {data: 'id', name: 'id',  searchable: true},
//             {data: 'name', name: 'name' ,  searchable: true},
//             {data: 'email', name: 'email',  searchable: true},
//             {data: 'username', name: 'username',  searchable: true},
//             {data: 'phone', name: 'phone',  searchable: true},
//             {data: 'dob', name: 'dob',  searchable: true},
//             {
//                 data: 'action',
//                 name: 'action',
//                 orderable: true,
//                 searchable: true
//             },
//         ]
//     });
//
// });
// actions.js

// document.addEventListener("DOMContentLoaded", function () {
//     var table = document.getElementById('users-table');
//     const deleteButtons = table.querySelectorAll('[data-kt-docs-table-filter="delete_row"]');
// console.log(deleteButtons);
//     deleteButtons.forEach(d => {
//         // Delete button on click
//         d.addEventListener('click', function (e) {
//             e.preventDefault();
//             console.log(deleteButtons);
//             // Select parent row
//             const parent = e.target.closest('tr');
//             // Get customer name
//             const customerName = parent.querySelectorAll('td')[1].innerText;
//             // SweetAlert2 pop up --- official docs reference: https://sweetalert2.github.io/
//             Swal.fire({
//                 text: "Are you sure you want to delete " + customerName + "?",
//                 icon: "warning",
//                 showCancelButton: true,
//                 buttonsStyling: false,
//                 confirmButtonText: "Yes, delete!",
//                 cancelButtonText: "No, cancel",
//                 customClass: {
//                     confirmButton: "btn fw-bold btn-danger",
//                     cancelButton: "btn fw-bold btn-active-light-primary"
//                 }
//             }).then(function (result) {
//                 if (result.value) {
//                     // Simulate delete request -- for demo purpose only
//                     Swal.fire({
//                         text: "Deleting " + customerName,
//                         icon: "info",
//                         buttonsStyling: false,
//                         showConfirmButton: false,
//                         timer: 2000
//                     }).then(function () {
//                         Swal.fire({
//                             text: "You have deleted " + customerName + "!.",
//                             icon: "success",
//                             buttonsStyling: false,
//                             confirmButtonText: "Ok, got it!",
//                             customClass: {
//                                 confirmButton: "btn fw-bold btn-primary",
//                             }
//                         }).then(function () {
//                             // delete row data from server and re-draw datatable
//                             dt.draw();
//                         });
//                     });
//                 } else if (result.dismiss === 'cancel') {
//                     Swal.fire({
//                         text: customerName + " was not deleted.",
//                         icon: "error",
//                         buttonsStyling: false,
//                         confirmButtonText: "Ok, got it!",
//                         customClass: {
//                             confirmButton: "btn fw-bold btn-primary",
//                         }
//                     });
//                 }
//             });
//         })
//     });
//
//  //    const t = document.getElementById("users-table");
//  //        // Add click event listener for the Edit button
//  //    const editButton = document.getElementById("edit_row");
//  // console.log(editButton);
//  //        editButton.addEventListener("click", function () {
//  //            // Handle the edit action here
//  //            alert("Edit button clicked");
//  //            // You can replace the alert with your actual edit logic
//  //        });
//
//     // // Add click event listener for the Delete button
//     // const deleteButtons = document.querySelectorAll("#delete_row");
//     // deleteButtons.forEach(function (deleteButton) {
//     //     deleteButton.addEventListener("click", function () {
//     //         console.log('dddd');
//     //         const userId = deleteButton.getAttribute("data-kt-user-id");
//     //         // Prompt for confirmation or perform the delete action
//     //         const confirmDelete = confirm("Are you sure you want to delete user " + userId + "?");
//     //         if (confirmDelete) {
//     //             // Handle the delete action here
//     //             alert("Delete button clicked for user " + userId);
//     //             // You can replace the alert with your actual delete logic
//     //         }
//     //     });
//     // });
// });
$(document).ready(function() {
    $('body').on('click', '#delete_row', function (e) {
        e.preventDefault();
        // Select parent row
        const parent = e.target.closest('tr');
        // var target = e.target.closest('tr');
        var blockUI = new KTBlockUI(parent);
        // Get customer name
        const customerName = parent.querySelectorAll('td')[0].innerText;
        // SweetAlert2 pop up --- official docs reference: https://sweetalert2.github.io/
        const id = $(this).data('kt-user-id');

        Swal.fire({
            text: "Are you sure you want to delete " + customerName + "?",
            icon: "warning",
            showCancelButton: true,
            buttonsStyling: false,
            confirmButtonText: "Yes, delete!",
            cancelButtonText: "No, cancel",
            customClass: {
                confirmButton: "btn fw-bold btn-danger",
                cancelButton: "btn fw-bold btn-active-light-primary"
            }
        }).then(function (result) {
            if (result.value) {
                $.ajax({
                    url: "/admin/admins/delete/"+id,
                    type: "POST",
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
                                    // n.hide();
                                    parent.remove();
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
                    },
                    complete: function () {
                    },
                });

            } else if (result.dismiss === 'cancel') {
                Swal.fire({
                    text: customerName + " was not deleted.",
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
});
