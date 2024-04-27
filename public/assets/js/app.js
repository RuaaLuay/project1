jQuery(document).ready(function () {

    $("body").tooltip({selector: '[data-bs-toggle=tooltip]'});


    var positionClass = "toast-top-right";
    if (configs.lang == "ar") {
        positionClass = "toast-top-left";
    }

    toastr.options = {
        "closeButton": false,
        "debug": false,
        "newestOnTop": false,
        "progressBar": false,
        "positionClass": positionClass,
        "preventDuplicates": false,
        "onclick": null,
        "showDuration": "300",
        "hideDuration": "1000",
        "timeOut": "10000",
        "extendedTimeOut": "1000",
        "showEasing": "swing",
        "hideEasing": "linear",
        "showMethod": "fadeIn",
        "hideMethod": "fadeOut"
    }

    if (localStorage.getItem("toastr_status")) {
        toastr.success(localStorage.getItem("toastr_status"));
        localStorage.clear();
    }

    if (localStorage.getItem("toastr_error_status")) {
        toastr.error(localStorage.getItem("toastr_error_status"));
        localStorage.clear();
    }

    $("body").on('hide.bs.modal', function () {
        //actions you want to perform after modal is closed.
        $('.error_danger').text('');
    });

    parseArabic = function (str) {

        return str.replace(/[٠١٢٣٤٥٦٧٨٩]/g, function (d) {
            return d.charCodeAt(0) - 1632; // Convert Arabic numbers
        }).replace(/[۰۱۲۳۴۵۶۷۸۹]/g, function (d) {
            return d.charCodeAt(0) - 1776; // Convert Persian numbers
        });
    }

    convertNumbers2English = function(string) {
        return string.replace(/[\u0660-\u0669]/g, function (c) {
            return c.charCodeAt(0) - 0x0660;
        }).replace(/[\u06f0-\u06f9]/g, function (c) {
            return c.charCodeAt(0) - 0x06f0;
        });
    }

    $(document).ready(function () {
        $(document).on('keyup', 'input', function () {
            $(this).val(parseArabic(this.value));
        });
    });
});


function getFormData(formSelector) {
    return new FormData(formSelector[0]);
}

function disableAndLoadingButton(selector, loadingText) {
    selector.attr('disabled', true).html('<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>\n' +
        '                                <span class="visually-hidden"></span> ' + loadingText);
}

function enableAndLoadingButton(selector, normalText) {
    selector.attr('disabled', false).html(normalText);
}

function scrollTop() {
    // Click event to scroll to top
    $('html, body').animate({scrollTop: 0}, 75);
}

function errorAlertMessages(messages, is_alert = false) {
    var finalMessage = '';
    $.each(messages, function (i, k, v) {
        finalMessage += ($.isArray(k) ? k[0] : k);
        return false; // breaks
    });
    if (is_alert === true) {
        return '<div class="alert alert-danger" role="alert"> <h4 class="alert-heading">'+labels_btn.error+'</h4> <div class="alert-body">' +
            finalMessage + '</div> </div>';
    }

    return '<div class="alert alert-danger" role="alert"> <h4 class="alert-heading">'+labels_btn.error+'</h4> <div class="alert-body"></div> </div>';
}

function errorInputMessage(errors) {
    var finalMessage = '';
    $.each(errors, function (key, value) {
        $("#error_" + key).text(value[0]);
    });
}

function errorInputMessageCreate(errors) {
    var finalMessage = '';
    $.each(errors, function (key, value) {
        $("#error_" + key).text(value[0]);
    });
}

function errorInputMessageEdit(errors) {
    var finalMessage = '';
    $.each(errors, function (key, value) {
        $("#error_edit_" + key).text(value[0]);
    });
}

function errorMessage(message) {
    /*return '<div class="alert alert-danger" role="alert"> <h4 class="alert-heading">' + labels_btn.error + '</h4> <div class="alert-body">' +
        message + '</div> </div>'*/
    toastr.error(message);
    // localStorage.setItem("toastr_error_status",message);
    // location.reload();
}

function successMessage(message) {
    /*return '<div class="alert alert-primary" role="alert"> <h4 class="alert-heading">' + labels_btn.success + '</h4> <div class="alert-body">' +
        message + '</div> </div>';*/

    /*alertSuccess.fire({
        text: message,
        icon: "success",
        showConfirmButton: false,
        showCloseButton: true,
    });*/
    toastr.success(message);
    // localStorage.setItem("toastr_status",message);
    // location.reload();
}

function resetForm(form) {
    $(form)[0].reset()
}

function reloadPage() {
    setTimeout(function () {
        window.location.reload();
    }, 1000);
}

function hiddenAlert() {
    $('#success').delay(2500).slideUp(300);
}

function showImagePreview(input, viewTarget) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = function (e) {
            viewTarget.attr('src', e.target.result);
        }
        reader.readAsDataURL(input.files[0]);
    }
}

function locationMap() {
    var mapProp = {
        center: new google.maps.LatLng(24.93781342645239, 46.72206290976101),
        zoom: 9,
    };
    var map = new google.maps.Map(document.getElementById("locationMap"), mapProp);

    google.maps.event.addListener(map, 'click', function (event) {
        var lang = event.latLng.lng();
        var lat = event.latLng.lat();
        document.getElementById("longitude-input").value = lang;
        document.getElementById("latitude-input").value = lat;
        document.getElementById("longitude-form").value = lang;
        document.getElementById("latitude-form").value = lat;
    });
    var marker = new google.maps.Marker({
        map: map,
        position: new google.maps.LatLng(24.93781342645239, 46.72206290976101),
        icon: 'images/marker.png'
    });
    google.maps.event.addListener(map, 'click', function (event) {
        marker.setPosition(event.latLng);
    });
}

function initAutocomplete(lang = 24.93781342645239, lat = 46.72206290976101) {
    const map = new google.maps.Map(document.getElementById("locationMap"), {
        center: {lat: lat, lng: lang},
        zoom: 13,
        mapTypeId: "roadmap",
        zoomControl: false,
        streetViewControl: false,
        // fullscreenControlOptions:{
        //     position: google.maps.ControlPosition.RIGHT_BOTTOM,
        // }
    });

    function CustomZoomOutControl(controlDiv, map) {

        // Set CSS for the control border
        var controlUI = document.createElement('div');
        // controlUI.style.boxShadow = '0 2px 6px rgba(0,0,0,.3)';
        controlUI.className = "map-zoom-control";

        controlDiv.appendChild(controlUI);

        // Set CSS for the control interior
        var controlText = document.createElement('div');
        controlText.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="16.945" height="16.945" viewBox="0 0 16.945 16.945">\n' +
            '  <g id="zoom-in" opacity="0.78">\n' +
            '    <path id="Path_39725" data-name="Path 39725" d="M16.4,12.635H10.125v1.255H16.4Z" transform="translate(-6.359 -6.359)" fill="#475c7a"/>\n' +
            '    <path id="Path_39726" data-name="Path 39726" d="M15.582,14.672a6.822,6.822,0,0,0,1.6-4.393,6.9,6.9,0,1,0-6.9,6.9,6.822,6.822,0,0,0,4.393-1.6l4.764,4.739.885-.885Zm-5.3,1.255a5.649,5.649,0,1,1,5.648-5.649A5.648,5.648,0,0,1,10.279,15.927Z" transform="translate(-3.375 -3.375)" fill="#475c7a"/>\n' +
            '  </g>\n' +
            '</svg>\n';
        controlUI.appendChild(controlText);

        // Setup the click event listeners
        google.maps.event.addDomListener(controlUI, 'click', function () {
            map.setZoom(map.getZoom() - 1);
        });

    }

    function CustomZoomInControl(controlDiv, map) {

        // Set CSS for the control border
        var controlUI = document.createElement('div');
        // controlUI.style.boxShadow = '0 2px 6px rgba(0,0,0,.3)';
        controlUI.className = "map-zoom-control";

        controlDiv.appendChild(controlUI);

        // Set CSS for the control interior
        var controlText = document.createElement('div');
        controlText.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="16.945" height="16.946" viewBox="0 0 16.945 16.946">\n' +
            '  <g id="zoom-in" opacity="0.78">\n' +
            '    <path id="Path_39725" data-name="Path 39725" d="M16.4,12.635h-2.51v-2.51H12.635v2.51h-2.51v1.255h2.51V16.4h1.255v-2.51H16.4Z" transform="translate(-6.359 -6.359)" fill="#475c7a"/>\n' +
            '    <path id="Path_39726" data-name="Path 39726" d="M15.582,14.672a6.822,6.822,0,0,0,1.6-4.393,6.9,6.9,0,1,0-6.9,6.9,6.822,6.822,0,0,0,4.393-1.6l4.764,4.739.885-.885Zm-5.3,1.255a5.649,5.649,0,1,1,5.648-5.649A5.648,5.648,0,0,1,10.279,15.927Z" transform="translate(-3.375 -3.375)" fill="#475c7a"/>\n' +
            '  </g>\n' +
            '</svg>\n';
        controlUI.appendChild(controlText);

        // Setup the click event listeners
        google.maps.event.addDomListener(controlUI, 'click', function () {
            map.setZoom(map.getZoom() + 1);
        });

    }

    var customZoomInControlDiv = document.createElement('div'),
        CustomZoomOutControlDiv = document.createElement('div')
    var customZoomInControl = new CustomZoomInControl(customZoomInControlDiv, map),
        customZoomOutControl = new CustomZoomOutControl(CustomZoomOutControlDiv, map)

    customZoomInControlDiv.index = 4;
    CustomZoomOutControlDiv.index = 3;
    map.controls[google.maps.ControlPosition.RIGHT_BOTTOM].push(CustomZoomOutControlDiv);
    map.controls[google.maps.ControlPosition.RIGHT_BOTTOM].push(customZoomInControlDiv);


    google.maps.event.addListener(map, 'click', function (event) {
        var lang = event.latLng.lng();
        var lat = event.latLng.lat();
        document.getElementById("longitude-input").value = lang;
        document.getElementById("latitude-input").value = lat;
        document.getElementById("longitude-form").value = lang;
        document.getElementById("latitude-form").value = lat;
    });
    var marker = new google.maps.Marker({
        map: map,
        position: new google.maps.LatLng(24.93781342645239, 46.72206290976101),
        icon: config_map.imageMarker
    });
    google.maps.event.addListener(map, 'click', function (event) {
        marker.setPosition(event.latLng);
    });

    geolocate = function geolocate() {
        if (navigator.geolocation) {

            navigator.geolocation.getCurrentPosition(function (position) {

                var pos = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

                map.setCenter(pos);
                marker.setPosition(pos);
                var latlng = new google.maps.LatLng(pos);
                var geocoder = geocoder = new google.maps.Geocoder();
                geocoder.geocode({'latLng': latlng}, function (results, status) {
                    if (status === google.maps.GeocoderStatus.OK) {
                        if (results[1]) {
                            document.getElementById('search-map').value = results[1].formatted_address;

                        }
                    } else {

                    }
                });

                // Create a marker and center map on users location
                marker.setMap(null);
                marker = new google.maps.Marker({
                    position: pos,
                    draggable: true,
                    animation: google.maps.Animation.DROP,
                    icon: imageMarker,
                    map: map,

                });
                // marker.setMap(mapObject);
                map.setCenter(new google.maps.LatLng(position.coords.latitude, position.coords.longitude));
                map.setZoom(16);
                document.getElementById("longitude-input").value = position.coords.longitude;
                document.getElementById("latitude-input").value = position.coords.latitude;
                document.getElementById("longitude-form").value = position.coords.longitude;
                document.getElementById("latitude-form").value = position.coords.latitude;
            });
        }
    };

    // Create the search box and link it to the UI element.
    const input = document.getElementById("search-map");
    const searchBox = new google.maps.places.SearchBox(input);


    // map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);
    // Bias the SearchBox results towards current map's viewport.
    map.addListener("bounds_changed", () => {
        searchBox.setBounds(map.getBounds());
    });

    let markers = [];

    // Listen for the event fired when the users selects a prediction and retrieve
    // more details for that place.
    searchBox.addListener("places_changed", () => {
        const places = searchBox.getPlaces();

        if (places.length == 0) {
            return;
        }

        // Clear out the old markers.
        markers.forEach((marker) => {
            marker.setMap(null);
        });
        markers = [];

        // For each place, get the icon, name and location.
        const bounds = new google.maps.LatLngBounds();

        places.forEach((place) => {
            if (!place.geometry || !place.geometry.location) {
                console.log("Returned place contains no geometry");
                return;
            }

            const icon = {
                url: place.icon,
                size: new google.maps.Size(30, 30),
                origin: new google.maps.Point(0, 0),
                anchor: new google.maps.Point(17, 35),
                scaledSize: new google.maps.Size(25, 25),
            };

            // Create a marker for each place.
            markers.push(
                new google.maps.Marker({
                    map,
                    icon,
                    title: place.name,
                    position: place.geometry.location,
                })
            );
            if (place.geometry.viewport) {
                // Only geocodes have viewport.
                bounds.union(place.geometry.viewport);
            } else {
                bounds.extend(place.geometry.location);
            }
            document.getElementById("longitude-input").value = place.geometry.location.lng();
            document.getElementById("latitude-input").value = place.geometry.location.lat();
            document.getElementById("longitude-form").value = place.geometry.location.lng();
            document.getElementById("latitude-form").value = place.geometry.location.lat();
        });
        map.fitBounds(bounds);
    });
    google.maps.event.addListener(map, 'click', function (e) {
        geo(e);
    });
    let geo = function (e) {
        var latlng = new google.maps.LatLng(e.latLng.lat(), e.latLng.lng());
        var geocoder = geocoder = new google.maps.Geocoder();
        geocoder.geocode({'latLng': latlng}, function (results, status) {
            if (status === google.maps.GeocoderStatus.OK) {
                if (results[1]) {
                    document.getElementById('search-map').value = results[1].formatted_address;

                }
            } else {
                document.getElementById('map_location').value = "";
            }
        });
        marker.setPosition(e.latLng);
    }
    let onStart = function () {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const pos = {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude,
                    };
                    // infoWindow.open(map);
                    map.setCenter(pos);
                    marker.setPosition(pos);
                    var latlng = new google.maps.LatLng(pos);
                    var geocoder = geocoder = new google.maps.Geocoder();
                    geocoder.geocode({'latLng': latlng}, function (results, status) {
                        if (status === google.maps.GeocoderStatus.OK) {
                            if (results[1]) {
                                document.getElementById('search-map').value = results[1].formatted_address;

                            }
                        } else {

                        }
                    });
                    document.getElementById("longitude-input").value = position.coords.longitude;
                    document.getElementById("latitude-input").value = position.coords.latitude;
                    document.getElementById("longitude-form").value = position.coords.longitude;
                    document.getElementById("latitude-form").value = position.coords.latitude;

                },
                () => {
                    handleLocationError(true, infoWindow, map.getCenter());
                }
            );
        } else {
            // Browser doesn't support Geolocation
            handleLocationError(false, infoWindow, map.getCenter());
        }
    }
    onStart()
}


function showModalDelete() {
    $('body').on('click', '.btn-delete', function (e) {
        e.preventDefault();
        $('#delete-modal').modal('show');
        var deleteUrl = $(this).attr('href');
        var pid = $(this).attr('data-id');
        $('#delete-modal #btn-confirm-delete').attr('data-url', deleteUrl).attr('data-id', pid);
    });
}

function ajaxDelete() {

    $('#btn-confirm-delete').click(function () {
        var deleteUrl = $(this).attr('data-url');
        var pid = $(this).attr('data-id');
        $('#btn-confirm-delete').attr('disabled', true).html('<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>\n' +
            '<span class="visually-hidden"></span>'+labels_btn.deleting);
        $.ajax({
            url: deleteUrl,
            type: "DELETE",
            data: {_token: $('meta[name="csrf-token"]').attr('content')},
            success: function (response) {
                $('#btn-confirm-delete').attr('disabled', false).html(labels_btn.yes_delete);

                if (response.status) {
                    $('#delete-modal').modal('hide');
                    $('body #btn-delete-' + pid).closest('tr').css('background', '#ea8a8a').delay(1000).hide(1000);
                } else {
                    $('#delete-modal').modal('hide');
                    errorMessage(response.message);
                }
            }
        });
    });
}


function errorServe() {
    Swal.fire({
        title: labels_btn.something_went_wrong,
        text: labels_btn.try_agin,
        icon: 'error',
        confirmButtonText: labels_btn.cancel,
        customClass: {
            confirmButton: 'btn btn-primary'
        },
        buttonsStyling: false
    });
}

function errorUX(message = 'You clicked the button and try again correct!') {
    Swal.fire({
        title: '',
        text: message,
        icon: 'error',
        confirmButtonText: labels_btn.try_agin,
        customClass: {
            confirmButton: 'btn btn-primary'
        },
        buttonsStyling: false
    });
}

function successSweet(title = labels_btn.msg_success, message = labels_btn.delete_success) {
    Swal.fire({
        title: title,
        text: message,
        icon: 'success',
        buttonsStyling: false,
        confirmButtonText: labels_btn.close,
        customClass: {
            confirmButton: 'btn btn-primary'
        },
    });

}


function ajaxCreateOrUpdate(routeNameCreate, routeNameUpdate) {
    $("#btn_submit").click(function (e) {
        e.preventDefault();
        var formData = new FormData(document.getElementById("addEditForm"));
        var type = "POST";
        $btn = $('#btn_submit');
        var state = $btn.val();
        var item_id = $('#item_id').val();
        var ajaxurl = BASE_URL + routeNameCreate;
        if (state === "edit") {
            ajaxurl = BASE_URL + routeNameUpdate + item_id;
            formData.append('_method', 'PUT');
        }
        $.ajaxSetup({
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            }
        });
        $.ajax({
            type: type,
            url: ajaxurl,
            data: formData,
            processData: false,
            contentType: false,
            dataType: 'json',
            beforeSend: function () {
                disableAndLoadingButton($btn, labels_btn.saving);
            },
            success: function (data) {
                if (data.status === true) {
                    Swal.fire({
                        text: data.message,
                        icon: "success",
                        buttonsStyling: false,
                        confirmButtonText: 'Done',
                        customClass: {
                            confirmButton: "btn btn-primary"
                        }
                    }).then(function (result) {
                        toastr.success(data.message);
                        $('#example').DataTable().ajax.reload();
                        document.getElementById("addEditForm").reset();
                        $('#modal_add_edit').modal('hide');
                    });
                } else {
                    toastr.error(labels_btn.something_went_wrong_try_again);
                    errorUX(data.message);
                }
            },
            error: function (jqXHR, error, errorThrown) {
                if (typeof jqXHR.responseJSON == 'undefined') {
                    errorServe();
                } else if (jqXHR.responseJSON.errors) {
                    let errors = jqXHR.responseJSON.errors;
                    if (errors) {
                        errorInputMessage(errors);
                        $.each(errors, function (key, value) {
                            toastr.error(value);
                        })
                    }
                } else {
                    errorServe();
                }
            },
            complete: function (data) {
                enableAndLoadingButton($btn, labels_btn.save);
            }
        });

    });
}

function show_fcm_token(){
    var firebaseConfig = {
        apiKey: "AIzaSyAQJ8cqAoc9FVjI-rmzrs9ecXnmLglVOzk",
        authDomain: "muafa-462af.firebaseapp.com",
        projectId: "muafa-462af",
        storageBucket: "muafa-462af.appspot.com",
        messagingSenderId: "625784930051",
        appId: "1:625784930051:web:b712f9ecb370f1b2e8f336",
        measurementId: "G-7V5WWM718S"
    };

    firebase.initializeApp(firebaseConfig);
    const messaging = firebase.messaging();

    messaging
        .requestPermission()
        .then(function () {
            return messaging.getToken()
        })
        .then(function(token) {
            console.log(token);
            jQuery('#fcm_token').val(token);
        }).catch(function (err) {
        console.log('User Chat Token Error'+ err);
    });

    messaging.onMessage(function(payload) {
        console.log(payload);

        const noteTitle = payload.notification.title;
        const noteOptions = {
            body: payload.notification.body,
            icon: payload.notification.icon,
        };
        /*new Notification(noteTitle, noteOptions);
        return self.registration.showNotification(noteTitle, noteOptions);*/

        return self.registration.showNotification(noteTitle, noteOptions);
    });
}

function SeenNotification(id) {
    $.ajax({
        async: false,
        dataType: "json",
        url: BASE_URL + "/notifications/mark-as-seen/" + id,
        type: 'GET',
        success: function(data) {
            console.log(data);
        },
    });
}

$('#main_specialty_id').on('select2:select', function (e) {
    var data = e.params.data;
    $.ajax({
        async: false,
        dataType: "json",
        url: BASE_URL + "/admin/common/get-specialty/" + data.id,
        type: 'GET',
        success: function(data) {
            if(data.status){
                $('#sub_specialty_id').val(null).trigger('change');
                $('#sub_specialty_id').empty().trigger("change");
                $('#sub_specialty_id').append(newOption).trigger('change');
                for (let i = 0; i < data.specialty.length; i++) {
                    var text = data.specialty[i].title;
                    var newOption = new Option(text, data.specialty[i].id, false, false);
                    $('#sub_specialty_id').append(newOption).trigger('change');
                }
            }else{
                $('#sub_specialty_id').val(null).trigger('change');
                $('#sub_specialty_id').empty().trigger("change");
            }

        },
        error: function (data){
            $('#sub_specialty_id').val(null).trigger('change');
            $('#sub_specialty_id').empty().trigger("change");
        },
    });
});


var locale_strings = function () {
    var tmp = null;
    $.ajax({
        async: false,
        dataType: "json",
        url: BASE_URL + "/locale",
        type: 'GET',
        success: function(data) {
            tmp = data;
        }
    });
    return tmp;
}();
