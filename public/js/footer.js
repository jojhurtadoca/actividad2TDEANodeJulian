$( document ).ready(function() {
    document.getElementById("currentYear").innerHTML = new Date().getFullYear();
    $('[data-toggle="tooltip"]').tooltip();
    $('.collapse').collapse();
    $('[data-toggle="popover"]').popover();
});