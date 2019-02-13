
var page = 1;
var current_page = 1;
var total_page = 0;
var is_ajax_fire = 0;
var id_cliente=1;
manageDataMatIns();
var link1=1;
$(document).ready(function () {

            (function ($) {

                $('#filtrar').keyup(function () {

                    var rex = new RegExp($(this).val(), 'i');
                    $('.buscar tr').hide();
                    $('.buscar tr').filter(function () {
                        return rex.test($(this).text());
                    }).show();

                })

            }(jQuery));

        });
/* manage data list */
function manageDataMatIns() {
    $.ajax({
        dataType: 'json',
        url: matIns,
        data: {page:page}
    }).done(function(data){
        manageRowMatIns(data.data);
    });
}
$.ajaxSetup({
    headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
});
/* Get Page Data*/
function getPageDataMatIns() {
    $.ajax({
        dataType: 'json',
        url: matIns,
        data: {page:page}
    }).done(function(data){
        manageRowMatIns(data.data);
    });
}
/* Add new Cliente table row */
function manageRowMatIns(data) {
    var rows = '';
    $.each( data, function( key, value ) {
        rows = rows + '<tr>';
        rows = rows + '<td>'+value.nombre+'</td>';
        rows = rows + '<td>'+value.descripcion+'</td>';
        rows = rows + '<td>'+value.cantidad_total+'</td>';
        rows = rows + '<td>'+value.cantidad_minima+'</td>';
        rows = rows + '<td>'+value.precio_compra+'</td>';
        rows = rows + '<td data-id="'+value.id+'">';
        // rows = rows + '<button data-toggle="modal" data-target="#add-item" class="btn btn-primary add-materialInsumo-item fa fa-plus"></button> ';
        rows = rows + '<button data-toggle="modal" data-target="#edit-item" class="btn btn-success edit-materialInsumo-item fa fa-edit"></button> ';
        rows = rows + '<button data-toggle="modal" data-target="#delete-item" class="btn btn-danger remove-materialInsumo-item fa fa-trash "></button> ';
        rows = rows + '</td>';
        rows = rows + '</tr>';
        id_cliente=value.id;
    });
    $("#materialInsumo").html(rows);
} 
/* Create new Material Insumo */
$(".materialInsumo-submit").click(function(e){
    // var dt = new Date();
    // var month = dt.getMonth()+1;
    // var day = dt.getDate();
    // var year = dt.getFullYear();
    // var date = year+'-'+month+'-'+day;
    // alert(date);
    // var dateControl = document.querySelector('input[type="date"]');
    // dateControl.value = '2017-06-01';

    e.preventDefault();

    var form_action = $("#create-materialInsumo").find("form").attr("action");
    var nombre = $("#create-materialInsumo").find("input[name='nombre']").val();
    var descripcion = $("#create-materialInsumo").find("textarea[name='descripcion']").val();
    var cantidad = $("#create-materialInsumo").find("input[name='cantidad']").val();
    var costov=0;
    alert(form_action);
    // $.ajax({
    //     dataType: 'json',
    //     type:'POST',
    //     url: form_action,
    //     data:{nombre:nombre, descripcion:descripcion, cantidad:cantidad, costov:costov}
    // }).done(function(data){
    //     getPageDataMatIns();
    //     $(".modal").modal('hide');
    //     $("#create-materialInsumo").find("input[name='nombre']").val(" ");
    //     $("#create-materialInsumo").find("input[textarea='descripcion']").val(" ");
    //     $("#create-materialInsumo").find("input[name='cantidad']").val(" ");
    //     toastr.success('Material de Insumo Creado satisfactoriamente.', 'Success Alert', {timeOut: 5000});

    //     $('#my-Modal').modal('show');
    // });
});
/* Remove Material de Insumo */
$("body").on("click",".remove-materialInsumo-item",function(){
    var nombre = $(this).parent("td").prev("td").prev("td").prev("td").text();
    var id = $(this).parent("td").data('id');
    $("#delete-item").find("form").attr("action",matIns + '/' + id);
    $("#delete-item").find("input[name='nombre']").val(nombre);
});

$('.crud-submit-materialInsumo-delete').click(function(e){
    e.preventDefault();
    var form_action = $("#delete-item").find("form").attr("action");
    $.ajax({
        dataType: 'json',
        type:'delete',
        url: form_action,
    }).done(function(data){
        $(".modal").modal('hide');
        // c_obj.remove();
        toastr.success('Material de Insumo Eliminado corectamente.', 'Success Alert', {timeOut: 5000});
        getPageDataMatIns();
    });
});

/* Edit Post */
$("body").on("click",".edit-materialInsumo-item",function(){
    var id = $(this).parent("td").data('id');
    var nombre = $(this).parent("td").prev("td").prev("td").prev("td").text();
    var descripcion = $(this).parent("td").prev("td").prev("td").text();
    var cantidad = $(this).parent("td").prev("td").text();

    $("#edit-item").find("input[name='nombre']").val(nombre);
    $("#edit-item").find("textarea[name='descripcion']").val(descripcion);
    $("#edit-item").find("input[name='cantidad']").val(cantidad);
    $("#edit-item").find("form").attr("action",matIns + '/' + id);
});
/* Updated new Material Insumo */
$(".crud-submit-materialInsumo-edit").click(function(e){
    e.preventDefault();
    var form_action = $("#edit-item").find("form").attr("action");
    var nombre = $("#edit-item").find("input[name='nombre']").val();
    var descripcion = $("#edit-item").find("textarea[name='descripcion']").val();
    var cantidad = $("#edit-item").find("input[name='cantidad']").val();
    var costov = 0;

    $.ajax({
        dataType: 'json',
        type:'PUT',
        url: form_action,
        data:{nombre:nombre, descripcion:descripcion,cantidad:cantidad, costov:costov}
    }).done(function(data){
        getPageDataMatIns();
        $(".modal").modal('hide');
        $("#edit-item").find("input[name='nombre']").val(" ");
        $("#edit-item").find("textarea[name='descripcion']").val(" ");
        $("#edit-item").find("input[name='cantidad']").val(" ");
        toastr.success('Material Insumo Actualizado Correctamente.', 'Success Alert', {timeOut: 5000});
    });
});

var cantidad = 0;
/* Edit Post Stock */
$("body").on("click",".add-materialInsumo-item",function(){
    var id = $(this).parent("td").data('id');
    var nombre = $(this).parent("td").prev("td").prev("td").prev("td").text();
    cantidad = $(this).parent("td").prev("td").prev("td").text();
    var costov = $(this).parent("td").prev("td").text();

    $( "#add-item").find("input[name='nombre']").val(nombre);
    $("#add-item").find("input[name='cantidad']").val(cantidad);
    $("#add-item").find("input[name='costov']").val(costov);
    $("#add-item").find("form").attr("action",matIns + '/' + id);

    // stock(cantidad);
});
/* Updated Stock of Material Insumo */
// function stock(numero){
    // var stock = numero;
    $(".crud-submit-materialInsumo-add").click(function(e){
        alert(cantidad);
        e.preventDefault();
        var nuevaCantidad = 0;
        var form_action = $("#add-item").find("form").attr("action");
        var nombre = $("#add-item").find("input[name='nombre']").val();
        var cantidad1 = $("#add-item").find("input[name='cantidad']").val();
        var costov = $("#add-item").find("input[name='costov']").val();
        nuevaCantidad = parseFloat(cantidad) + parseFloat(cantidad1);
        alert(nuevaCantidad);
        $.ajax({
            dataType: 'json',
            type:'PUT',
            url: form_action,
            data:{nombre:nombre, cantidad:nuevaCantidad, costov:costov}
        }).done(function(data){
            getPageDataMatIns();
            $(".modal").modal('hide');
            $("#add-item").find("input[name='nombre']").val(" ");
            $("#add-item").find("input[name='cantidad']").val(" ");
            $("#add-item").find("input[name='costov']").val(" ");
            toastr.success('Material Insumo Actualizado Correctamente.', 'Success Alert', {timeOut: 5000});
        });
    });
// }