var page = 1;
var current_page = 1;
var total_page = 0;
var is_ajax_fire = 0;
manageDataSal();
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
function manageDataSal() {
    $.ajax({
        dataType: 'json',
        url: sal,
        data: {page:page}
    }).done(function(data){
    	manageRowSal(data.data);
    });
}
$.ajaxSetup({
    headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
});
/* Get Page Data*/
function getPageDataSal() {
	$.ajax({
    	dataType: 'json',
    	url: sal,
    	data: {page:page}
	}).done(function(data){
        
		manageRowSal(data.data);
	});
}
/* Add new Cliente table row */
function manageRowSal(data) {
	var	rows = '';
	$.each( data, function( key, value ) {
	  	rows = rows + '<tr>';
	  	rows = rows + '<td>'+value.monto+'</td>';
        rows = rows + '<td>'+value.nombrecuenta+'</td>';
	  	rows = rows + '<td>'+value.nombredivisa+'</td>';
	  	rows = rows + '<td data-id="'+value.id+'"data-id_cuenta="'+value.id_cuenta+'"data-id_divisa="'+value.id_divisa+'">';
        rows = rows + '<button data-toggle="modal" data-target="#edit-item" class="btn btn-success edit-saldo-item fa fa-edit"></button> ';
        rows = rows + '<button data-toggle="modal" data-target="#delete-item" class="btn btn-danger remove-saldo-item fa fa-trash "></button> ';
        rows = rows + '</td>';
	  	rows = rows + '</tr>';
	});
	$("#saldo").html(rows);
}
/* Create new Saldo */
$(".saldo-submit").click(function(e){
    e.preventDefault();
    var form_action = $("#create-saldo").find("form").attr("action");
    var monto = $("#create-saldo").find("input[name='monto']").val();
    var id_cuenta = $("#create-saldo").find("select[name='id_cuenta']").val();
    var id_divisa = $("#create-saldo").find("select[name='id_divisa']").val();
    var estado=0;
    $.ajax({
        dataType: 'json',
        type:'POST',
        url: form_action,
        data:{monto:monto, id_cuenta:id_cuenta, id_divisa:id_divisa}
    }).done(function(data){
        getPageDataSal();
        $(".modal").modal('hide');
        $("#create-saldo").find("input[name='monto']").val(" ");
        $("#create-saldo").find("select[name='id_cuenta']").val(" ");
        $("#create-saldo").find("select[name='id_divisa']").val(" ");

        toastr.success('Saldo Creado satisfactoriamente.', 'Success Alert', {timeOut: 5000});
    });
});
/* Remove Saldo */
$("body").on("click",".remove-saldo-item",function(){
    var id = $(this).parent("td").data('id');
    $("#delete-item").find("form").attr("action",sal + '/' + id);
    $("#delete-item").find("input[name='id']").val(id);
});

$('.crud-submit-saldo-delete').click(function(e){
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
        toastr.success('Saldo Eliminado corectamente.', 'Success Alert', {timeOut: 5000});
        getPageDataSal();
    });
});


/* Edit Post */
$("body").on("click",".edit-saldo-item",function(){
    var id = $(this).parent("td").data('id');
    var monto = $(this).parent("td").prev("td").prev("td").prev("td").text();
    var id_cuenta = $(this).parent("td").prev("td").prev("td").text();
    var id_divisa = $(this).parent("td").prev("td").text();

    $("#edit-item").find("input[name='monto']").val(monto);
    $("#edit-item").find("select[name='id_cuenta']").val(id_cuenta);
    $("#edit-item").find("select[name='id_divisa']").val(id_divisa);
    $("#edit-item").find("form").attr("action",sal + '/' + id);
});


/* Updated new Saldo */
$(".crud-submit-saldo-edit").click(function(e){
    e.preventDefault();
    var form_action = $("#edit-item").find("form").attr("action");
    var monto = $("#edit-item").find("input[name='monto']").val();
    var id_cuenta = $("#edit-item").find("select[name='id_cuenta']").val();
    var id_divisa = $("#edit-item").find("select[name='id_divisa']").val();

    $.ajax({
        dataType: 'json',
        type:'PUT',
        url: form_action,
        data:{monto:monto, id_cuenta:id_cuenta, id_divisa:id_divisa}
    }).done(function(data){
        getPageDataSal();
        $(".modal").modal('hide');
        $("#create-cliente").find("input[name='monto']").val(" ");
        $("#create-cliente").find("select[name='id_cuenta']").val(" ");
        $("#create-cliente").find("select[name='id_divisa']").val(" ");
        toastr.success('Saldo Actualizado Correctamente.', 'Success Alert', {timeOut: 1000});

    });
});