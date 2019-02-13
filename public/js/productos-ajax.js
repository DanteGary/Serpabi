var page = 1;
var current_page = 1;
var total_page = 0;
var is_ajax_fire = 0;
manageDataProd();
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
function manageDataProd() {
    $.ajax({
        dataType: 'json',
        url: prod,
        data: {page:page}
    }).done(function(data){
    	manageRowProd(data.data);
    });
}
$.ajaxSetup({
    headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
});
/* Get Page Data*/
function getPageDataProd() {
	$.ajax({
    	dataType: 'json',
    	url: prod,
    	data: {page:page}
	}).done(function(data){
        
		manageRowProd(data.data);
	});
}
/* Add new Producto table row */
function manageRowProd(data) {
	var	rows = '';
	$.each( data, function( key, value ) {
	  	rows = rows + '<tr>';
	  	rows = rows + '<td>'+value.nombre+'</td>';
        rows = rows + '<td>'+value.descripcion+'</td>';
	  	rows = rows + '<td>'+value.cantidad+'</td>';
        rows = rows + '<td>'+value.preciov+'</td>';
	  	rows = rows + '<td data-id="'+value.id+'">';
        rows = rows + '<button data-toggle="modal" data-target="#add-item" class="btn btn-primary add-producto-item fa fa-plus"></button> ';
        rows = rows + '<button data-toggle="modal" data-target="#edit-item" class="btn btn-success edit-producto-item fa fa-edit"></button> ';
        rows = rows + '<button data-toggle="modal" data-target="#delete-item" class="btn btn-danger remove-productos-item fa fa-trash "></button> ';
        rows = rows + '</td>';
	  	rows = rows + '</tr>';
	});
	$("#producto").html(rows);
}
/* Create new Producto */
$(".producto-submit").click(function(e){
    e.preventDefault();
    var form_action = $("#create-producto").find("form").attr("action");
    var nombre = $("#create-producto").find("input[name='nombre']").val();
    var descripcion = $("#create-producto").find("textarea[name='descripcion']").val();
    var cantidad = $("#create-producto").find("input[name='cantidad']").val();
    var preciov = $("#create-producto").find("input[name='preciov']").val();
    $.ajax({
        dataType: 'json',
        type:'POST',
        url: form_action,
        data:{nombre:nombre, descripcion:descripcion, cantidad:cantidad, preciov:preciov}
    }).done(function(data){
        getPageDataProd();
        $(".modal").modal('hide');
        $("#create-producto").find("input[name='nombre']").val(" ");
        $("#create-producto").find("textarea[name='descripcion']").val(" ");
        $("#create-producto").find("input[name='cantidad']").val(" ");
        $("#create-producto").find("input[name='preciov']").val(" ");

        toastr.success('Producto Creado satisfactoriamente.', 'Success Alert', {timeOut: 5000});
    });
});
/* Remove Producto */
$("body").on("click",".remove-productos-item",function(){
    var nombre = $(this).parent("td").prev("td").prev("td").prev("td").prev("td").text();
    var id = $(this).parent("td").data('id');
    $("#delete-item").find("form").attr("action",prod + '/' + id);
    $("#delete-item").find("input[name='nombre']").val(nombre);
});

$('.crud-submit-producto-delete').click(function(e){
    e.preventDefault();
    // var c_obj = $(this).parents("tr");
    var form_action = $("#delete-item").find("form").attr("action");
    $.ajax({
        dataType: 'json',
        type:'delete',
        url: form_action,
    }).done(function(data){
        $(".modal").modal('hide');
        // c_obj.remove();
        toastr.success('Producto Eliminado corectamente.', 'Success Alert', {timeOut: 5000});
        getPageDataProd();
    });
});


/* Edit Post */
$("body").on("click",".edit-producto-item",function(){
    var id = $(this).parent("td").data('id');
    var nombre = $(this).parent("td").prev("td").prev("td").prev("td").prev("td").text();
    var descripcion = $(this).parent("td").prev("td").prev("td").prev("td").text();
    var cantidad = $(this).parent("td").prev("td").prev("td").text();
    var preciov = $(this).parent("td").prev("td").text();

    $("#edit-item").find("input[name='nombre']").val(nombre);
    $("#edit-item").find("textarea[name='descripcion']").val(descripcion);
    $("#edit-item").find("input[name='cantidad']").val(cantidad);
    $("#edit-item").find("input[name='preciov']").val(preciov);
    $("#edit-item").find("form").attr("action",prod + '/' + id);
});


/* Updated new Producto */
$(".crud-submit-productos-edit").click(function(e){
    e.preventDefault();
    var form_action = $("#edit-item").find("form").attr("action");
    var nombre = $("#edit-item").find("input[name='nombre']").val();
    var descripcion = $("#edit-item").find("textarea[name='descripcion']").val();
    var cantidad = $("#edit-item").find("input[name='cantidad']").val();
    var preciov = $("#edit-item").find("input[name='preciov']").val();


    $.ajax({
        dataType: 'json',
        type:'PUT',
        url: form_action,
        data:{nombre:nombre, descripcion:descripcion, cantidad:cantidad, preciov:preciov}
    }).done(function(data){
        getPageDataProd();
        $(".modal").modal('hide');
        $("#create-producto").find("input[name='nombre']").val(" ");
        $("#create-producto").find("textarea[name='descripcion']").val(" ");
        $("#create-producto").find("input[name='cantidad']").val(" ");
        $("#create-producto").find("input[name='preciov']").val(" ");
        toastr.success('Proveedor Actualizado Correctamente.', 'Success Alert', {timeOut: 1000});

    });
});

var cantidad = 0;
/* Edit Post Stock */
$("body").on("click",".add-producto-item",function(){
    var id = $(this).parent("td").data('id');
    var nombre = $(this).parent("td").prev("td").prev("td").prev("td").prev("td").text();
    var descripcion = $(this).parent("td").prev("td").prev("td").prev("td").text();
    var cantidadNueva = $(this).parent("td").prev("td").prev("td").text();
    var preciov = $(this).parent("td").prev("td").text();

    cantidad = cantidadNueva

    $( "#add-item").find("input[name='nombre']").val(nombre);
    $( "#add-item").find("input[name='descripcion']").val(descripcion);
    $("#add-item").find("input[name='cantidad']").val();
    $("#add-item").find("input[name='preciov']").val(preciov);
    $("#add-item").find("form").attr("action",prod + '/' + id);

});
/* Updated Stock of Material Insumo */
    $(".crud-submit-producto-add").click(function(e){
        e.preventDefault();
        var nuevaCantidad = 0;
        var form_action = $("#add-item").find("form").attr("action");
        var nombre = $("#add-item").find("input[name='nombre']").val();
        var descripcion = $("#add-item").find("input[name='descripcion']").val();
        var cantidad1 = $("#add-item").find("input[name='cantidad']").val();
        var preciov = $("#add-item").find("input[name='preciov']").val();
        nuevaCantidad = parseFloat(cantidad) + parseFloat(cantidad1);
        $.ajax({
            dataType: 'json',
            type:'PUT',
            url: form_action,
            data:{nombre:nombre, descripcion:descripcion, cantidad:nuevaCantidad, preciov:preciov}
        }).done(function(data){
            getPageDataProd();
            $(".modal").modal('hide');
            $("#add-item").find("input[name='nombre']").val(" ");
            $("#add-item").find("input[name='descripcion']").val(" ");
            $("#add-item").find("input[name='cantidad']").val(" ");
            $("#add-item").find("input[name='preciov']").val(" ");
            toastr.success('Stock del Producto Actualizado Correctamente.', 'Success Alert', {timeOut: 5000});
        });
    });
// }