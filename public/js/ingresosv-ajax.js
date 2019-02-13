var page = 1;
var current_page = 1;
var total_page = 0;
var is_ajax_fire = 0;
manageDataIngrv();
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
function manageDataIngrv() {
    $.ajax({
        dataType: 'json',
        url: ingrv,
        data: {page:page}
    }).done(function(data){
    	manageRowIngrv(data.data);
    });
}
$.ajaxSetup({
    headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
});
/* Get Page Data*/
function getPageDataIngrv() {
	$.ajax({
    	dataType: 'json',
    	url: ingrv,
    	data: {page:page}
	}).done(function(data){
        
		manageRowIngrv(data.data);
	});
}
/* Add new Cargo table row */
function manageRowIngrv(data) {
	var	rows = '';
	$.each( data, function( key, value ) {
	  	rows = rows + '<tr>';
	  	rows = rows + '<td>'+value.motivo+'</td>';
        rows = rows + '<td>'+value.fecha+'</td>';
        rows = rows + '<td>'+value.fechaventa+'</td>';
	  	rows = rows + '<td data-id="'+value.id+'"data-id_ventas="'+value.id_ventas+'">';
        rows = rows + '<button data-toggle="modal" data-target="#edit-item" class="btn btn-success edit-ingresov-item fa fa-edit"></button> ';
        rows = rows + '<button data-toggle="modal" data-target="#delete-item" class="btn btn-danger remove-ingresov-item fa fa-trash "></button> ';
        rows = rows + '</td>';
	  	rows = rows + '</tr>';
	});
	$("#ingresov").html(rows);
}
/* Create new Cargo */
$(".ingresov-submit").click(function(e){
    e.preventDefault();
    var form_action = $("#create-ingresov").find("form").attr("action");
    var motivo = $("#create-ingresov").find("input[name='motivo']").val();
    var fecha = $("#create-ingresov").find("input[name='fecha']").val();
    var id_ventas = $("#create-ingresov").find("select[name='id_ventas']").val();
    var estado=0;
    $.ajax({
        dataType: 'json',
        type:'POST',
        url: form_action,
        data:{motivo:motivo, fecha:fecha, id_ventas:id_ventas}
    }).done(function(data){
        getPageDataIngrv();
        $(".modal").modal('hide');
        $("#create-ingresov").find("input[name='motivo']").val(" ");
        $("#create-ingresov").find("input[name='fecha']").val(" ");
        $("#create-ingresov").find("select[name='id_ventas']").val(" ");

        toastr.success('Ingreso de Venta Creado satisfactoriamente.', 'Success Alert', {timeOut: 5000});
    });
});
/* Remove Proveedor */
$("body").on("click",".remove-ingresov-item",function(){
    var motivo = $(this).parent("td").prev("td").prev("td").prev("td").text();
    var id = $(this).parent("td").data('id');
    $("#delete-item").find("form").attr("action",ingrv + '/' + id);
    $("#delete-item").find("input[name='motivo']").val(motivo);
});

$('.crud-submit-ingresov-delete').click(function(e){

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
        toastr.success('Ingreso Eliminado corectamente.', 'Success Alert', {timeOut: 5000});
        getPageDataIngrv();
    });
});
/* Edit Post */
$("body").on("click",".edit-ingresov-item",function(){
    var id = $(this).parent("td").data('id');
    var motivo = $(this).parent("td").prev("td").prev("td").prev("td").text();
    var fecha = $(this).parent("td").prev("td").prev("td").text();
    var id_ventas = $(this).parent("td").prev("td").text();

    $("#edit-item").find("input[name='motivo']").val(motivo);
    $("#edit-item").find("input[name='fecha']").val(fecha);
    $("#edit-item").find("select[name='id_ventas']").val(id_ventas);
    $("#edit-item").find("form").attr("action",ingrv + '/' + id);
});
/* Updated new Cargo */
$(".crud-submit-ingresov-edit").click(function(e){
    e.preventDefault();
    var form_action = $("#edit-item").find("form").attr("action");
    var motivo = $("#edit-item").find("input[name='motivo']").val();
    var fecha = $("#edit-item").find("input[name='fecha']").val();
    var id_ventas = $("#edit-item").find("select[name='id_ventas']").val();

    $.ajax({
        dataType: 'json',
        type:'PUT',
        url: form_action,
        data:{motivo:motivo, fecha:fecha, id_ventas:id_ventas}
    }).done(function(data){
        getPageDataIngrv();
        $(".modal").modal('hide');
        $("#create-cargo").find("input[name='motivo']").val(" ");
        $("#create-cargo").find("input[name='fecha']").val(" ");
        $("#create-cargo").find("select[name='id_ventas']").val(" ");
        toastr.success('Ingreso de Ventas Actualizado Correctamente.', 'Success Alert', {timeOut: 5000});
    });
});