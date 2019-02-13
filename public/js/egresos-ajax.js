var page = 1;
var current_page = 1;
var total_page = 0;
var is_ajax_fire = 0;
manageDataEgr();
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
function manageDataEgr() {
    $.ajax({
        dataType: 'json',
        url: egr,
        data: {page:page}
    }).done(function(data){
    	manageRowEgr(data.data);
    });
}
$.ajaxSetup({
    headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
});
/* Get Page Data*/
function getPageDataEgr() {
	$.ajax({
    	dataType: 'json',
    	url: egr,
    	data: {page:page}
	}).done(function(data){
        
		manageRowEgr(data.data);
	});
}
/* Add new Egreso table row */
function manageRowEgr(data) {
	var	rows = '';
	$.each( data, function( key, value ) {
	  	rows = rows + '<tr>';
	  	rows = rows + '<td>'+value.motivo+'</td>';
        rows = rows + '<td>'+value.fecha+'</td>';
	  	rows = rows + '<td>'+value.fechacompra+'</td>';
	  	rows = rows + '<td data-id="'+value.id+'"data-id_compra="'+value.id_compra+'">';
        rows = rows + '<button data-toggle="modal" data-target="#edit-item" class="btn btn-success edit-egreso-item fa fa-edit"></button> ';
        rows = rows + '<button data-toggle="modal" data-target="#delete-item" class="btn btn-danger remove-egreso-item fa fa-trash "></button> ';
        rows = rows + '</td>';
	  	rows = rows + '</tr>';
	});
	$("#egreso").html(rows);
}
/* Create new Producto */
$(".egreso-submit").click(function(e){
    e.preventDefault();
    var form_action = $("#create-egreso").find("form").attr("action");
    var motivo = $("#create-egreso").find("input[name='motivo']").val();
    var fecha = $("#create-egreso").find("input[name='fecha']").val();
    var id_compra = $("#create-egreso").find("select[name='id_compra']").val();
    var estado=0;
    $.ajax({
        dataType: 'json',
        type:'POST',
        url: form_action,
        data:{motivo:motivo, fecha:fecha, id_compra:id_compra}
    }).done(function(data){
        getPageDataEgr();
        $(".modal").modal('hide');
        $("#create-egreso").find("input[name='motivo']").val(" ");
        $("#create-egreso").find("input[name='fecha']").val(" ");
        $("#create-egreso").find("select[name='id_compra']").val(" ");

        toastr.success('Egreso Creado satisfactoriamente.', 'Success Alert', {timeOut: 5000});
    });
});
/* Remove Egreso */
$("body").on("click",".remove-egreso-item",function(){
    var motivo = $(this).parent("td").prev("td").prev("td").prev("td").text();
    var id = $(this).parent("td").data('id');
    $("#delete-item").find("form").attr("action",egr + '/' + id);
    $("#delete-item").find("input[name='motivo']").val(motivo);
});

$('.crud-submit-egreso-delete').click(function(e){
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
        toastr.success('Egreso Eliminado corectamente.', 'Success Alert', {timeOut: 5000});
        getPageDataEgr();
    });
});


/* Edit Post */
$("body").on("click",".edit-egreso-item",function(){
    var id = $(this).parent("td").data('id');
    var motivo = $(this).parent("td").prev("td").prev("td").prev("td").text();
    var fecha = $(this).parent("td").prev("td").prev("td").text();
    var id_compra = $(this).parent("td").prev("td").text();

    $("#edit-item").find("input[name='motivo']").val(motivo);
    $("#edit-item").find("input[name='fecha']").val(fecha);
    $("#edit-item").find("select[name='id_compra']").val(id_compra);
    $("#edit-item").find("form").attr("action",egr + '/' + id);
});


/* Updated new Cliente */
$(".crud-submit-egreso-edit").click(function(e){
    e.preventDefault();
    var form_action = $("#edit-item").find("form").attr("action");
    var motivo = $("#edit-item").find("input[name='motivo']").val();
    var fecha = $("#edit-item").find("input[name='fecha']").val();
    var id_compra = $("#edit-item").find("select[name='id_compra']").val();

    $.ajax({
        dataType: 'json',
        type:'PUT',
        url: form_action,
        data:{motivo:motivo, fecha:fecha, id_compra:id_compra}
    }).done(function(data){
        getPageDataEgr();
        $(".modal").modal('hide');
        $("#create-cliente").find("input[name='motivo']").val(" ");
        $("#create-cliente").find("input[name='fecha']").val(" ");
        $("#create-cliente").find("select[name='id_compra']").val(" ");
        toastr.success('Egreso Actualizado Correctamente.', 'Success Alert', {timeOut: 1000});

    });
});