var page = 1;
var current_page = 1;
var total_page = 0;
var is_ajax_fire = 0;
manageDataProv();
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
function manageDataProv() {
    $.ajax({
        dataType: 'json',
        url: url,
        data: {page:page}
    }).done(function(data){
    	manageRowProv(data.data);
    });
}
$.ajaxSetup({
    headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
});
/* Get Page Data*/
function getPageDataProv() {
	$.ajax({
    	dataType: 'json',
    	url: url,
    	data: {page:page}
	}).done(function(data){
        
		manageRowProv(data.data);
	});
}
/* Add new Proveedor table row */
function manageRowProv(data) {
	var	rows = '';
	$.each( data, function( key, value ) {
	  	rows = rows + '<tr>';
	  	rows = rows + '<td>'+value.nombre+'</td>';
        rows = rows + '<td>'+value.nit+'</td>';
	  	rows = rows + '<td>'+value.telefono+'</td>';
	  	rows = rows + '<td data-id="'+value.id+'">';
        rows = rows + '<button data-toggle="modal" data-target="#edit-item" class="btn btn-success edit-proveedor-item fa fa-edit"></button> ';
        rows = rows + '<button data-toggle="modal" data-target="#delete-item" class="btn btn-danger remove-proveedors-item fa fa-trash "></button> ';
        rows = rows + '</td>';
	  	rows = rows + '</tr>';
	});
	$("#proveedor").html(rows);
}
/* Create new Proveedor */
$(".proveedor-submit").click(function(e){
    e.preventDefault();
    var form_action = $("#create-proveedor").find("form").attr("action");
    var nombre = $("#create-proveedor").find("input[name='nombre']").val();
    var nit = $("#create-proveedor").find("input[name='nit']").val();
    var telefono = $("#create-proveedor").find("input[name='telefono']").val();
    var estado=0;
    $.ajax({
        dataType: 'json',
        type:'POST',
        url: form_action,
        data:{nombre:nombre, nit:nit, telefono:telefono,}
    }).done(function(data){
        getPageDataProv();
        $(".modal").modal('hide');
        $("#create-proveedor").find("input[name='nombre']").val(" ");
        $("#create-proveedor").find("input[name='nit']").val(" ");
        $("#create-proveedor").find("input[name='telefono']").val(" ");
    
        toastr.success('Proveedor Creado satisfactoriamente.', 'Success Alert', {timeOut: 5000});
    });
});
/* Remove Proveedor */
$("body").on("click",".remove-proveedors-item",function(){
    var nombre = $(this).parent("td").prev("td").prev("td").prev("td").text();
    var id = $(this).parent("td").data('id');
    $("#delete-item").find("form").attr("action",url + '/' + id);
    $("#delete-item").find("input[name='nombre']").val(nombre);
    
});

$('.crud-submit-proveedor-delete').click(function(e){
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
        toastr.success('Proveedor Eliminado corectamente.', 'Success Alert', {timeOut: 5000});
        getPageDataProv();

    });
});
/* Edit Post */
$("body").on("click",".edit-proveedor-item",function(){
    var id = $(this).parent("td").data('id');
    var nombre = $(this).parent("td").prev("td").prev("td").prev("td").text();
    var nit = $(this).parent("td").prev("td").prev("td").text();
    var telefono = $(this).parent("td").prev("td").text();

    $( "#edit-item").find("input[name='nombre']").val(nombre);
    $("#edit-item").find("input[name='nit']").val(nit);
    $("#edit-item").find("input[name='telefono']").val(telefono);
    $("#edit-item").find("form").attr("action",url + '/' + id);
});
/* Updated new Proveedor */
$(".crud-submit-proveedores-edit").click(function(e){
    e.preventDefault();
    var form_action = $("#edit-item").find("form").attr("action");
    var nombre = $("#edit-item").find("input[name='nombre']").val();
    var nit = $("#edit-item").find("input[name='nit']").val();
    var telefono = $("#edit-item").find("input[name='telefono']").val();

    $.ajax({
        dataType: 'json',
        type:'PUT',
        url: form_action,
        data:{nombre:nombre, nit:nit, telefono:telefono}
    }).done(function(data){
        getPageDataProv();
        $(".modal").modal('hide');
        $("#create-proveedor").find("input[name='nombre']").val(" ");
        $("#create-proveedor").find("input[name='nit']").val(" ");
        $("#create-proveedor").find("input[name='telefono']").val(" ");
        toastr.success('Proveedor Actualizado Correctamente.', 'Success Alert', {timeOut: 5000});
    });
});