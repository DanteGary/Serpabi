var page = 1;
var current_page = 1;
var total_page = 0;
var is_ajax_fire = 0;
manageDataAlqui();
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
function manageDataAlqui() {
    $.ajax({
        dataType: 'json',
        url: alqui,
        data: {page:page}
    }).done(function(data){
    	manageRowAlqui(data.data);
    });
}
$.ajaxSetup({
    headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
});
/* Get Page Data*/
function getPageDataAlqui() {
	$.ajax({
    	dataType: 'json',
    	url: alqui,
    	data: {page:page}
	}).done(function(data){
        
		manageRowAlqui(data.data);
	});
}
/* Add new Cargo table row */
function manageRowAlqui(data) {
	var	rows = '';
	$.each( data, function( key, value ) {
	  	rows = rows + '<tr>';
	  	rows = rows + '<td>'+value.costo+'</td>';
        rows = rows + '<td>'+value.feha_inicio+'</td>';
        rows = rows + '<td>'+value.feha_fin+'</td>';
        rows = rows + '<td>'+value.nombrecli+'</td>';
	  	rows = rows + '<td data-id="'+value.id+'"data-id_cliente="'+value.id_cliente+'">';
        rows = rows + '<button data-toggle="modal" data-target="#edit-item" class="btn btn-success edit-alquiler-item fa fa-edit"></button> ';
        rows = rows + '<button data-toggle="modal" data-target="#delete-item" class="btn btn-danger remove-alquiler-item fa fa-trash "></button> ';
        rows = rows + '</td>';
	  	rows = rows + '</tr>';
	});
	$("#alquiler").html(rows);
}
/* Create new Cargo */
$(".alquiler-submit").click(function(e){
    e.preventDefault();
    var form_action = $("#create-alquiler").find("form").attr("action");
    var costo = $("#create-alquiler").find("input[name='costo']").val();
    var feha_inicio = $("#create-alquiler").find("input[name='feha_inicio']").val();
    var feha_fin = $("#create-alquiler").find("input[name='feha_fin']").val();
    var id_cliente = $("#create-alquiler").find("select[name='id_cliente']").val();
    var estado=0;
    $.ajax({
        dataType: 'json',
        type:'POST',
        url: form_action,
        data:{costo:costo, feha_inicio:feha_inicio, feha_fin:feha_fin, id_cliente:id_cliente}
    }).done(function(data){
        getPageDataAlqui();
        $(".modal").modal('hide');
        $("#create-alquiler").find("input[name='costo']").val(" ");
        $("#create-alquiler").find("input[name='feha_inicio']").val(" ");
        $("#create-alquiler").find("input[name='feha_fin']").val(" ");
        $("#create-alquiler").find("select[name='id_cliente']").val(" ");

        toastr.success('Alquiler Creado satisfactoriamente.', 'Success Alert', {timeOut: 5000});
    });
});
/* Remove Proveedor */
$("body").on("click",".remove-alquiler-item",function(){
    var id_cliente = $(this).parent("td").prev("td").text();
    var id = $(this).parent("td").data('id');
    $("#delete-item").find("form").attr("action",alqui + '/' + id);
    $("#delete-item").find("input[name='id']").val(id);
    $("#delete-item").find("input[name='id_cliente']").val(id_cliente);
});

$('.crud-submit-alquiler-delete').click(function(e){

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
        toastr.success('Alquiler Eliminado corectamente.', 'Success Alert', {timeOut: 5000});
        getPageDataAlqui();
    });
});
/* Edit Post */
$("body").on("click",".edit-alquiler-item",function(){
    var id = $(this).parent("td").data('id');
    var costo = $(this).parent("td").prev("td").prev("td").prev("td").prev("td").text();
    var feha_inicio = $(this).parent("td").prev("td").prev("td").prev("td").text();
    var feha_fin = $(this).parent("td").prev("td").prev("td").text();
    var id_cliente = $(this).parent("td").prev("td").text();

    $("#edit-item").find("input[name='costo']").val(costo);
    $("#edit-item").find("input[name='feha_inicio']").val(feha_inicio);
    $("#edit-item").find("input[name='feha_fin']").val(feha_fin);	
    $("#edit-item").find("select[name='id_cliente']").val(id_cliente);
    $("#edit-item").find("form").attr("action",alqui + '/' + id);
});
/* Updated new Alquiler */
$(".crud-submit-alquiler-edit").click(function(e){
    e.preventDefault();
    var form_action = $("#edit-item").find("form").attr("action");
    var costo = $("#edit-item").find("input[name='costo']").val();
    var feha_inicio = $("#edit-item").find("input[name='feha_inicio']").val();
    var feha_fin = $("#edit-item").find("input[name='feha_fin']").val();
    var id_cliente = $("#edit-item").find("select[name='id_cliente']").val();

    $.ajax({
        dataType: 'json',
        type:'PUT',
        url: form_action,
        data:{costo:costo, feha_inicio:feha_inicio, feha_fin:feha_fin, id_cliente:id_cliente}
    }).done(function(data){
        getPageDataAlqui();
        $(".modal").modal('hide');
        $("#create-alquiler").find("input[name='costo']").val(" ");
        $("#create-alquiler").find("input[name='feha_inicio']").val(" ");
        $("#create-alquiler").find("input[name='feha_fin']").val(" ");
        $("#create-alquiler").find("select[name='id_cliente']").val(" ");
        toastr.success('Alquiler Actualizado Correctamente.', 'Success Alert', {timeOut: 5000});
    });
});