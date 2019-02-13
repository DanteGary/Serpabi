var page = 1;
var current_page = 1;
var total_page = 0;
var is_ajax_fire = 0;
manageDataMovi();
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
function manageDataMovi() {
    $.ajax({
        dataType: 'json',
        url: movi,
        data: {page:page}
    }).done(function(data){
    	manageRowMovi(data.data);
    });
}
$.ajaxSetup({
    headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
});
/* Get Page Data*/
function getPageDataMovi() {
	$.ajax({
    	dataType: 'json',
    	url: movi,
    	data: {page:page}
	}).done(function(data){
        
		manageRowMovi(data.data);
	});
}
/* Add new Movimiento table row */
function manageRowMovi(data) {
	var	rows = '';
	$.each( data, function( key, value ) {
	  	rows = rows + '<tr>';
	  	rows = rows + '<td>'+value.monto+'</td>';
        rows = rows + '<td>'+value.fecha+'</td>';
	  	rows = rows + '<td>'+value.motivo+'</td>';
        rows = rows + '<td>'+value.entradatipo+'</td>';
        rows = rows + '<td>'+value.nombrecuenta+'</td>';
	  	rows = rows + '<td data-id="'+value.id+'"data-id_tipo="'+value.id_tipo+'"data-id_cuenta="'+value.id_cuenta+'">';
        rows = rows + '<button data-toggle="modal" data-target="#edit-item" class="btn btn-success edit-movimiento-item fa fa-edit"></button> ';
        rows = rows + '<button data-toggle="modal" data-target="#delete-item" class="btn btn-danger remove-movimiento-item fa fa-trash "></button> ';
        rows = rows + '</td>';
	  	rows = rows + '</tr>';
	});
	$("#movimiento").html(rows);
}
/* Create new Movimiento */
$(".movimiento-submit").click(function(e){
    e.preventDefault();
    var form_action = $("#create-movimiento").find("form").attr("action");
    var monto = $("#create-movimiento").find("input[name='monto']").val();
    var fecha = $("#create-movimiento").find("input[name='fecha']").val();
    var motivo = $("#create-movimiento").find("input[name='motivo']").val();
    var id_tipo = $("#create-movimiento").find("select[name='id_tipo']").val();
    var id_cuenta = $("#create-movimiento").find("select[name='id_cuenta']").val();
    var estado=0;
    $.ajax({
        dataType: 'json',
        type:'POST',
        url: form_action,
        data:{monto:monto, fecha:fecha, motivo:motivo, id_tipo:id_tipo, id_cuenta:id_cuenta}
    }).done(function(data){
        getPageDataMovi();
        $(".modal").modal('hide');
        $("#create-movimiento").find("input[name='monto']").val(" ");
        $("#create-movimiento").find("input[name='fecha']").val(" ");
        $("#create-movimiento").find("input[name='motivo']").val(" ");
        $("#create-movimiento").find("select[name='id_tipo']").val(" ");
        $("#create-movimiento").find("select[name='id_cuenta']").val(" ");


        toastr.success('Movimiento Creado satisfactoriamente.', 'Success Alert', {timeOut: 5000});
    });
});
/* Remove Motivo */
$("body").on("click",".remove-movimiento-item",function(){
    var motivo = $(this).parent("td").prev("td").prev("td").prev("td").text();
    var id = $(this).parent("td").data('id');
    $("#delete-item").find("form").attr("action",movi + '/' + id);
    $("#delete-item").find("input[name='motivo']").val(motivo);
});

$('.crud-submit-movimiento-delete').click(function(e){
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
        toastr.success('Movimiento Eliminado corectamente.', 'Success Alert', {timeOut: 5000});
        getPageDataMovi();
    });
});


/* Edit Post */
$("body").on("click",".edit-movimiento-item",function(){
    var id = $(this).parent("td").data('id');
    var monto = $(this).parent("td").prev("td").prev("td").prev("td").prev("td").prev("td").text();
    var fecha = $(this).parent("td").prev("td").prev("td").prev("td").prev("td").text();
    var motivo = $(this).parent("td").prev("td").prev("td").prev("td").text();
    var id_tipo = $(this).parent("td").prev("td").prev("td").text();
    var id_cuenta = $(this).parent("td").prev("td").text();

    $("#edit-item").find("input[name='monto']").val(monto);
    $("#edit-item").find("input[name='fecha']").val(fecha);
    $("#edit-item").find("input[name='motivo']").val(motivo);
    $("#edit-item").find("select[name='id_tipo']").val(id_tipo);
    $("#edit-item").find("select[name='id_cuenta']").val(id_cuenta);
    $("#edit-item").find("form").attr("action",movi + '/' + id);
});


/* Updated new Cliente */
$(".crud-submit-movimiento-edit").click(function(e){
    e.preventDefault();
    var form_action = $("#edit-item").find("form").attr("action");
    var monto = $("#edit-item").find("input[name='monto']").val();
    var fecha = $("#edit-item").find("input[name='fecha']").val();
    var motivo = $("#edit-item").find("input[name='motivo']").val();
    var id_tipo = $("#edit-item").find("select[name='id_tipo']").val();
    var id_cuenta = $("#edit-item").find("select[name='id_cuenta']").val();


    $.ajax({
        dataType: 'json',
        type:'PUT',
        url: form_action,
        data:{monto:monto, fecha:fecha, motivo:motivo, id_tipo:id_tipo, id_cuenta:id_cuenta}
    }).done(function(data){
        getPageDataMovi();
        $(".modal").modal('hide');
        $("#create-cliente").find("input[name='monto']").val(" ");
        $("#create-cliente").find("input[name='fecha']").val(" ");
        $("#create-cliente").find("input[name='motivo']").val(" ");
        $("#create-cliente").find("select[name='id_tipo']").val(" ");
        $("#create-cliente").find("select[name='id_cuenta']").val(" ");
        toastr.success('Movimiento Actualizado Correctamente.', 'Success Alert', {timeOut: 1000});

    });
});