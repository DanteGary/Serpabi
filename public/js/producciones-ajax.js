var page = 1;
var current_page = 1;
var total_page = 0;
var is_ajax_fire = 0;
manageDataProdu();
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
function manageDataProdu() {
    $.ajax({
        dataType: 'json',
        url: produ,
        data: {page:page}
    }).done(function(data){
    	manageRowProdu(data.data);
    });
}
$.ajaxSetup({
    headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
});
/* Get Page Data*/
function getPageDataProdu() {
	$.ajax({
    	dataType: 'json',
    	url: produ,
    	data: {page:page}
	}).done(function(data){
        
		manageRowProdu(data.data);
	});
}
/* Add new Produccion table row */
function manageRowProdu(data) {
	var	rows = '';
	$.each( data, function( key, value ) {
	  	rows = rows + '<tr>';
	  	rows = rows + '<td>'+value.descripcion+'</td>';
        rows = rows + '<td>'+value.fecha_produccion+'</td>';
        rows = rows + '<td>'+value.nombreprod+'</td>';
        rows = rows + '<td>'+value.cantidad+'</td>';
        rows = rows + '<td>'+value.nombreEmpleado+'</td>';
	  	rows = rows + '<td data-id="'+value.id+'"data-id_empleado="'+value.id_empleado+'"data-id_producto="'+value.id_producto+'">';
        rows = rows + '<button data-toggle="modal" data-target="#edit-item" class="btn btn-success edit-produccion-item fa fa-edit"></button> ';
        rows = rows + '<button data-toggle="modal" data-target="#delete-item" class="btn btn-danger remove-produccion-item fa fa-trash "></button> ';
        rows = rows + '</td>';
	  	rows = rows + '</tr>';
	});
	$("#produccion").html(rows);
}

/* Create new Produccion Diaria*/
var id_producto;
var cantidad;
$(".produccion-submit").click(function(e){
    e.preventDefault();
    var form_action = $("#create-produccion").find("form").attr("action");
    var descripcion = $("#create-produccion").find("textarea[name='descripcion']").val();
    var fecha_produccion = $("#create-produccion").find("input[name='fecha_produccion']").val();
    cantidad = $("#create-produccion").find("input[name='cantidad']").val();
    id_producto = $("#create-produccion").find("select[name='id_producto']").val();
    var id_empleado = $("#create-produccion").find("select[name='id_empleado']").val();
    $.ajax({
        dataType: 'json',
        type:'POST',
        url: form_action,
        data:{descripcion:descripcion, fecha_produccion:fecha_produccion, cantidad:cantidad, id_producto:id_producto, id_empleado:id_empleado}
    }).done(function(data){
        getPageDataProdu();
        $(".modal").modal('hide');
        $("#create-produccion").find("textarea[name='descripcion']").val(" ");
        $("#create-produccion").find("input[name='fecha_produccion']").val(" ");
        $("#create-produccion").find("input[name='cantidad']").val(" ");
        $("#create-produccion").find("input[name='id_producto']").val(" ");
        $("#create-produccion").find("select[name='id_empleado']").val(" ");

        toastr.success('Produccion Diaria Creada satisfactoriamente.', 'Success Alert', {timeOut: 5000});
        
    });
    actualizarCantidadProd(id_producto,cantidad);
    
});

/*Actualizar cantidad de Productos
  Despues de registrar una produccion*/
var productoCantidad = 0;
function actualizarCantidadProd(idProducto, cantidadProducto){
    var productoId = idProducto;
    var productoCan = cantidadProducto;
     $.ajax({
        dataType: 'json',
        url: prod,
        data: {page:page}
    }).done(function(data){
        
        $.each( data.data, function( key, value ) {
            if (productoId==value.id) {
                productoCantidad = parseFloat(value.cantidad) + parseFloat(productoCan);
                $.ajax({
                    dataType: 'json',
                    type:'PUT',
                    url: prod+'/'+productoId,
                    data:{cantidad:productoCantidad}
                }).done(function(data){
                    
                });
            }
        });
    });
}

/* Remove Produccion */
$("body").on("click",".remove-produccion-item",function(){
    var descripcion = $(this).parent("td").prev("td").prev("td").prev("td").prev("td").prev("td").text();
    var id = $(this).parent("td").data('id');
    $("#delete-item").find("form").attr("action",produ + '/' + id);
    $("#delete-item").find("input[name='descripcion']").val(descripcion);
});

$('.crud-submit-produccion-delete').click(function(e){

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
        toastr.success('Produccion Diaria Eliminado corectamente.', 'Success Alert', {timeOut: 5000});
        getPageDataProdu();
    });
});
/* Edit Post */
$("body").on("click",".edit-produccion-item",function(){
    var id = $(this).parent("td").data('id');
    var descripcion = $(this).parent("td").prev("td").prev("td").prev("td").prev("td").prev("td").text();
    var fecha_produccion = $(this).parent("td").prev("td").prev("td").prev("td").prev("td").text();
    var id_producto = $(this).parent("td").prev("td").prev("td").prev("td").text();
    var cantidad = $(this).parent("td").prev("td").prev("td").text();
    var id_empleado = $(this).parent("td").prev("td").text();

    $("#edit-item").find("input[name='descripcion']").val(descripcion);
    $("#edit-item").find("input[name='fecha_produccion']").val(fecha_produccion);
    $("#edit-item").find("select[name='id_producto']").val(id_producto);
    $("#edit-item").find("input[name='cantidad']").val(cantidad);
    $("#edit-item").find("select[name='id_empleado']").val(id_empleado);
    $("#edit-item").find("form").attr("action",produ + '/' + id);
});
/* Updated new Cargo */
$(".crud-submit-produccion-edit").click(function(e){
    e.preventDefault();
    var form_action = $("#edit-item").find("form").attr("action");
    var descripcion = $("#edit-item").find("input[name='descripcion']").val();
    var fecha_produccion = $("#edit-item").find("input[name='fecha_produccion']").val();
    var id_producto = $("#edit-item").find("select[name='id_producto']").val();
    var cantidad = $("#edit-item").find("input[name='cantidad']").val();
    var id_empleado = $("#edit-item").find("select[name='id_empleado']").val();

    $.ajax({
        dataType: 'json',
        type:'PUT',
        url: form_action,
        data:{descripcion:descripcion, fecha_produccion:fecha_produccion, id_producto:id_producto, cantidad:cantidad, id_empleado:id_empleado}
    }).done(function(data){
        getPageDataProdu();
        $(".modal").modal('hide');
        $("#create-produccion").find("input[name='descripcion']").val(" ");
        $("#create-produccion").find("input[name='fecha_produccion']").val(" ");
        $("#create-produccion").find("select[name='id_producto']").val(" ");
        $("#create-produccion").find("input[name='cantidad']").val(" ");
        $("#create-produccion").find("select[name='id_empleado']").val(" ");
        toastr.success('Tarea Diaria Actualizado Correctamente.', 'Success Alert', {timeOut: 5000});
    });
});
