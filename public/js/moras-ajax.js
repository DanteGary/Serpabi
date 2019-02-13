var page = 1;
var current_page = 1;
var total_page = 0;
var is_ajax_fire = 0;
manageDataMora();
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
function manageDataMora() {
    $.ajax({
        dataType: 'json',
        url: mora,
        data: {page:page}
    }).done(function(data){
    	manageRowMora(data.data);
    });
}
$.ajaxSetup({
    headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
});
/* Get Page Data*/
function getPageDataMora() {
	$.ajax({
    	dataType: 'json',
    	url: mora,
    	data: {page:page}
	}).done(function(data){
        
		manageRowMora(data.data);
	});
}
/* Add new Mora table row */
function manageRowMora(data) {
	var	rows = '';
	$.each( data, function( key, value ) {
	  	rows = rows + '<tr>';
	  	rows = rows + '<td>'+value.motivo+'</td>';
        rows = rows + '<td>'+value.monto+'</td>';
	  	rows = rows + '<td>'+value.nombrecliente+'</td>';
	  	rows = rows + '<td data-id="'+value.id+'"data-id_cliente="'+value.id_cliente+'">';
        rows = rows + '<button data-toggle="modal" data-target="#edit-item" class="btn btn-success edit-mora-item fa fa-edit"></button> ';
        rows = rows + '<button data-toggle="modal" data-target="#delete-item" class="btn btn-danger remove-mora-item fa fa-trash "></button> ';
        rows = rows + '</td>';
	  	rows = rows + '</tr>';
	});
	$("#mora").html(rows);
}
/* Create new Mora */
$(".mora-submit").click(function(e){
    e.preventDefault();
    var form_action = $("#create-mora").find("form").attr("action");
    var motivo = $("#create-mora").find("input[name='motivo']").val();
    var monto = $("#create-mora").find("input[name='monto']").val();
    var id_cliente = $("#create-mora").find("select[name='id_cliente']").val();
    var estado=0;
    $.ajax({
        dataType: 'json',
        type:'POST',
        url: form_action,
        data:{motivo:motivo, monto:monto, id_cliente:id_cliente}
    }).done(function(data){
        getPageDataMora();
        $(".modal").modal('hide');
        $("#create-mora").find("input[name='motivo']").val(" ");
        $("#create-mora").find("input[name='monto']").val(" ");
        $("#create-mora").find("select[name='id_cliente']").val(" ");

        toastr.success('Mora Creada satisfactoriamente.', 'Success Alert', {timeOut: 5000});
    });
});
/* Remove Mora */
$("body").on("click",".remove-mora-item",function(){
    var motivo = $(this).parent("td").prev("td").prev("td").prev("td").text();
    var id = $(this).parent("td").data('id');
    $("#delete-item").find("form").attr("action",mora + '/' + id);
    $("#delete-item").find("input[name='motivo']").val(motivo);
});

$('.crud-submit-mora-delete').click(function(e){
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
        toastr.success('Mora Eliminada corectamente.', 'Success Alert', {timeOut: 5000});
        getPageDataMora();
    });
});


/* Edit Post */
$("body").on("click",".edit-mora-item",function(){
    var id = $(this).parent("td").data('id');
    var motivo = $(this).parent("td").prev("td").prev("td").prev("td").text();
    var monto = $(this).parent("td").prev("td").prev("td").text();
    var id_cliente = $(this).parent("td").prev("td").text();

    $("#edit-item").find("input[name='motivo']").val(motivo);
    $("#edit-item").find("input[name='monto']").val(monto);
    $("#edit-item").find("select[name='id_cliente']").val(id_cliente);
    $("#edit-item").find("form").attr("action",mora + '/' + id);
});


/* Updated new Mora */
$(".crud-submit-mora-edit").click(function(e){
    e.preventDefault();
    var form_action = $("#edit-item").find("form").attr("action");
    var motivo = $("#edit-item").find("input[name='motivo']").val();
    var monto = $("#edit-item").find("input[name='monto']").val();
    var id_cliente = $("#edit-item").find("select[name='id_cliente']").val();

    $.ajax({
        dataType: 'json',
        type:'PUT',
        url: form_action,
        data:{motivo:motivo, monto:monto, id_cliente:id_cliente}
    }).done(function(data){
        getPageDataMora();
        $(".modal").modal('hide');
        $("#create-cliente").find("input[name='motivo']").val(" ");
        $("#create-cliente").find("input[name='monto']").val(" ");
        $("#create-cliente").find("select[name='id_cliente']").val(" ");
        toastr.success('Mora Actualizado Correctamente.', 'Success Alert', {timeOut: 1000});

    });
});