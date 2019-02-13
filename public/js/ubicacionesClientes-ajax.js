var page = 1;
var current_page = 1;
var total_page = 0;
var is_ajax_fire = 0;
manageDataUbiCli();
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
function manageDataUbiCli() {
    $.ajax({
        dataType: 'json',
        url: ubiCli,
        data: {page:page}
    }).done(function(data){
    	manageRowUbiCli(data.data);
    });
}
$.ajaxSetup({
    headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
});
/* Get Page Data*/
function getPageDataUbiCli() {
	$.ajax({
    	dataType: 'json',
    	url: ubiCli,
    	data: {page:page}
	}).done(function(data){
        
		manageRowUbiCli(data.data);
	});
}
/* Add new Cliente table row */
function manageRowUbiCli(data) {
	var	rows = '';
	$.each( data, function( key, value ) {
	  	rows = rows + '<tr>';
	  	rows = rows + '<td>'+value.latitud+'</td>';
        rows = rows + '<td>'+value.longitud+'</td>';
	  	rows = rows + '<td>'+value.nombrecliente+'</td>';
	  	rows = rows + '<td data-id="'+value.id+'"data-id_cliente="'+value.id_cliente+'">';
        rows = rows + '<button data-toggle="modal" data-target="#edit-item" class="btn btn-success edit-ubicacionCliente-item fa fa-edit"></button> ';
        rows = rows + '<button data-toggle="modal" data-target="#delete-item" class="btn btn-danger remove-ubicacionCliente-item fa fa-trash "></button> ';
        rows = rows + '</td>';
	  	rows = rows + '</tr>';
	});
	$("#ubicacionCliente").html(rows);
}
/* Create new Ubicacion Cliente */
$(".ubicacionCliente-submit").click(function(e){
    e.preventDefault();
    var form_action = $("#create-ubicacionCliente").find("form").attr("action");
    var latitud = $("#create-ubicacionCliente").find("input[name='latitud']").val();
    var longitud = $("#create-ubicacionCliente").find("input[name='longitud']").val();
    var id_cliente = $("#create-ubicacionCliente").find("select[name='id_cliente']").val();
    $.ajax({
        dataType: 'json',
        type:'POST',
        url: form_action,
        data:{latitud:latitud, longitud:longitud, id_cliente:id_cliente}
    }).done(function(data){
        getPageDataUbiCli();
        $(".modal").modal('hide');
        $("#create-ubicacionCliente").find("input[name='latitud']").val(" ");
        $("#create-ubicacionCliente").find("input[name='longitud']").val(" ");
        $("#create-ubicacionCliente").find("select[name='id_cliente']").val(" ");


        toastr.success('Ubicacion del Cliente Creado satisfactoriamente.', 'Success Alert', {timeOut: 5000});
    });
});
/* Remove Ubicacion del Cliente */
$("body").on("click",".remove-ubicacionCliente-item",function(){
    var latitud = $(this).parent("td").prev("td").prev("td").prev("td").text();
    var longitud = $(this).parent("td").prev("td").prev("td").text();
    var id = $(this).parent("td").data('id');
    $("#delete-item").find("form").attr("action",ubiCli + '/' + id);
    $("#delete-item").find("input[name='latitud']").val(latitud);
    $("#delete-item").find("input[name='longitud']").val(longitud);
});

$('.crud-submit-ubicacionCliente-delete').click(function(e){
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
        toastr.success('Ubicacion del Cliente Eliminado corectamente.', 'Success Alert', {timeOut: 5000});
        getPageDataUbiCli();
    });
});


/* Edit Post */
$("body").on("click",".edit-ubicacionCliente-item",function(){
    var id = $(this).parent("td").data('id');
    var latitud = $(this).parent("td").prev("td").prev("td").prev("td").text();
    var longitud = $(this).parent("td").prev("td").prev("td").text();
    var id_cliente = $(this).parent("td").prev("td").text();

    $("#edit-item").find("input[name='latitud']").val(latitud);
    $("#edit-item").find("input[name='longitud']").val(longitud);
    $("#edit-item").find("select[name='id_cliente']").val(id_cliente);
    $("#edit-item").find("form").attr("action",ubiCli + '/' + id);

});


/* Updated new Ubicacion Cliente */
$(".crud-submit-ubicacionCLiente-edit").click(function(e){
    e.preventDefault();
    var form_action = $("#edit-item").find("form").attr("action");
    var latitud = $("#edit-item").find("input[name='latitud']").val();
    var longitud = $("#edit-item").find("input[name='longitud']").val();
    var id_cliente = $("#edit-item").find("select[name='id_cliente']").val();


    $.ajax({
        dataType: 'json',
        type:'PUT',
        url: form_action,
        data:{latitud:latitud, longitud:longitud, id_cliente:id_cliente}
    }).done(function(data){
        getPageDataUbiCli();
        $(".modal").modal('hide');
        $("#create-ubicacionCliente").find("input[name='latitud']").val(" ");
        $("#create-ubicacionCliente").find("input[name='longitud']").val(" ");
        $("#create-ubicacionCliente").find("select[name='id_cliente']").val(" ");
        toastr.success('Ubicacion del Cliente Actualizado Correctamente.', 'Success Alert', {timeOut: 1000});

    });
});