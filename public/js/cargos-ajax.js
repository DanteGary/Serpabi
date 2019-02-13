var page = 1;
var current_page = 1;
var total_page = 0;
var is_ajax_fire = 0;
manageDataCarg();
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
function manageDataCarg() {
    $.ajax({
        dataType: 'json',
        url: cargo,
        data: {page:page}
    }).done(function(data){
    	manageRowCarg(data.data);
    });
}
$.ajaxSetup({
    headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
});
/* Get Page Data*/
function getPageDataCarg() {
	$.ajax({
    	dataType: 'json',
    	url: cargo,
    	data: {page:page}
	}).done(function(data){
        
		manageRowCarg(data.data);
	});
}
/* Add new Cargo table row */
function manageRowCarg(data) {
	var	rows = '';
	$.each( data, function( key, value ) {
	  	rows = rows + '<tr>';
	  	rows = rows + '<td>'+value.nombre+'</td>';
        rows = rows + '<td>'+value.descripcion+'</td>';
	  	rows = rows + '<td data-id="'+value.id+'">';
        rows = rows + '<button data-toggle="modal" data-target="#edit-item" class="btn btn-success edit-cargo-item fa fa-edit"></button> ';
        rows = rows + '<button data-toggle="modal" data-target="#delete-item" class="btn btn-danger remove-cargo-item fa fa-trash "></button> ';
        rows = rows + '</td>';
	  	rows = rows + '</tr>';
	});
	$("#cargo").html(rows);
}
/* Create new Cargo */
$(".cargo-submit").click(function(e){
    e.preventDefault();
    var form_action = $("#create-cargo").find("form").attr("action");
    var nombre = $("#create-cargo").find("input[name='nombre']").val();
    var descripcion = $("#create-cargo").find("input[name='descripcion']").val();
    var estado=0;
    $.ajax({
        dataType: 'json',
        type:'POST',
        url: form_action,
        data:{nombre:nombre, descripcion:descripcion}
    }).done(function(data){
        getPageDataCarg();
        $(".modal").modal('hide');
        $("#create-cargo").find("input[name='nombre']").val(" ");
        $("#create-cargo").find("input[name='descripcion']").val(" ");

        toastr.success('Cargo Creado satisfactoriamente.', 'Success Alert', {timeOut: 5000});
    });
});
/* Remove Proveedor */
$("body").on("click",".remove-cargo-item",function(){
    var nombre = $(this).parent("td").prev("td").text();
    var id = $(this).parent("td").data('id');
    $("#delete-item").find("form").attr("action",cargo + '/' + id);
    $("#delete-item").find("input[name='nombre']").val(nombre);
});

$('.crud-submit-cargo-delete').click(function(e){

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
        toastr.success('Cargo Eliminado corectamente.', 'Success Alert', {timeOut: 5000});
        getPageDataCarg();
    });
});
/* Edit Post */
$("body").on("click",".edit-cargo-item",function(){
    var id = $(this).parent("td").data('id');
    var nombre = $(this).parent("td").prev("td").prev("td").text();
    var descripcion = $(this).parent("td").prev("td").text();

    $("#edit-item").find("input[name='nombre']").val(nombre);
    $("#edit-item").find("input[name='descripcion']").val(descripcion);
    $("#edit-item").find("form").attr("action",cargo + '/' + id);
});
/* Updated new Cargo */
$(".crud-submit-cargos-edit").click(function(e){
    e.preventDefault();
    var form_action = $("#edit-item").find("form").attr("action");
    var nombre = $("#edit-item").find("input[name='nombre']").val();
    var descripcion = $("#edit-item").find("input[name='descripcion']").val();

    $.ajax({
        dataType: 'json',
        type:'PUT',
        url: form_action,
        data:{nombre:nombre, descripcion:descripcion}
    }).done(function(data){
        getPageDataCarg();
        $(".modal").modal('hide');
        $("#create-cargo").find("input[name='nombre']").val(" ");
        $("#create-cargo").find("input[name='descripcion']").val(" ");
        toastr.success('Cargo Actualizado Correctamente.', 'Success Alert', {timeOut: 5000});
    });
});