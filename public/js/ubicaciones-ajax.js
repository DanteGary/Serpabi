var page = 1;
var current_page = 1;
var total_page = 0;
var is_ajax_fire = 0;
manageDataUbi();
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
function manageDataUbi() {
    $.ajax({
        dataType: 'json',
        url: ubi,
        data: {page:page}
    }).done(function(data){
    	manageRowUbi(data.data);
    });
}
$.ajaxSetup({
    headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
});
/* Get Page Data*/
function getPageDataUbi() {
	$.ajax({
    	dataType: 'json',
    	url: ubi,
    	data: {page:page}
	}).done(function(data){
        
		manageRowUbi(data.data);
	});
}
/* Add new Ubicacion table row */
function manageRowUbi(data) {
	var	rows = '';
	$.each( data, function( key, value ) {
	  	rows = rows + '<tr>';
        rows = rows + '<td>'+value.latitud+'</td>';
        rows = rows + '<td>'+value.longitud+'</td>';
        rows = rows + '<td>'+value.placamovilidad+'</td>';
        rows = rows + '<td>'+value.nombrecli+'</td>';
	  	rows = rows + '<td data-id="'+value.id+'"data-id_movilidad="'+value.id_movilidad+'">';
        rows = rows + '<button data-toggle="modal" data-target="#edit-item" class="btn btn-success edit-ubicacion-item fa fa-edit"></button> ';
        rows = rows + '<button data-toggle="modal" data-target="#delete-item" class="btn btn-danger remove-ubicacion-item fa fa-trash "></button> ';
        rows = rows + '</td>';
	  	rows = rows + '</tr>';
	});
	$("#ubicacion").html(rows);
}
/* Create new Cargo */
$(".ubicacion-submit").click(function(e){
    e.preventDefault();
    var form_action = $("#create-ubicacion").find("form").attr("action");
    var latitud = $("#create-ubicacion").find("input[name='latitud']").val();
    var longitud = $("#create-ubicacion").find("input[name='longitud']").val();
    var id_movilidad = $("#create-ubicacion").find("select[name='id_movilidad']").val();
    var id_cliente = $("#create-ubicacion").find("select[name='id_cliente']").val();
    var estado=0;
    $.ajax({
        dataType: 'json',
        type:'POST',
        url: form_action,
        data:{latitud:latitud, longitud:longitud, id_movilidad:id_movilidad, id_cliente:id_cliente}
    }).done(function(data){
        getPageDataUbi();
        $(".modal").modal('hide');
        $("#create-ubicacion").find("input[name='latitud']").val(" ");
        $("#create-ubicacion").find("input[name='longitud']").val(" ");
        $("#create-ubicacion").find("select[name='id_movilidad']").val(" ");
        $("#create-ubicacion").find("select[name='id_cliente']").val(" ");

        toastr.success('Ubicacion Creada satisfactoriamente.', 'Success Alert', {timeOut: 5000});
    });
});
/* Remove Proveedor */
$("body").on("click",".remove-ubicacion-item",function(){
    var latitud = $(this).parent("td").prev("td").prev("td").prev("td").prev("td").text();
    var longitud = $(this).parent("td").prev("td").prev("td").prev("td").text();
    var id = $(this).parent("td").data('id');
    $("#delete-item").find("form").attr("action",ubi + '/' + id);
    $("#delete-item").find("input[name='latitud']").val(latitud);
    $("#delete-item").find("input[name='longitud']").val(longitud);
});

$('.crud-submit-ubicacion-delete').click(function(e){

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
        toastr.success('Ubicacion Eliminada corectamente.', 'Success Alert', {timeOut: 5000});
        getPageDataUbi();
    });
});
/* Edit Post */
$("body").on("click",".edit-ubicacion-item",function(){
    var id = $(this).parent("td").data('id');
    var latitud = $(this).parent("td").prev("td").prev("td").prev("td").prev("td").text();
    var longitud = $(this).parent("td").prev("td").prev("td").prev("td").text();
    var id_movilidad = $(this).parent("td").data('id_movilidad');
    var id_cliente = $(this).parent("td").prev("td").text();
    alert(id_movilidad);
    alert(id_cliente);

    $("#edit-item").find("input[name='latitud']").val(latitud);
    $("#edit-item").find("input[name='longitud']").val(longitud);
    $("#edit-item").find("select[name='id_movilidad']").val(id_movilidad);
    $("#edit-item").find("select[name='id_cliente']").val(id_cliente);
    $("#edit-item").find("form").attr("action",ubi + '/' + id);
});
/* Updated new Ubicacion */
$(".crud-submit-ubicacion-edit").click(function(e){
    e.preventDefault();
    var form_action = $("#edit-item").find("form").attr("action");
    var latitud = $("#edit-item").find("input[name='latitud']").val();
    var longitud = $("#edit-item").find("input[name='longitud']").val();
    var id_movilidad = $("#edit-item").find("select[name='id_movilidad']").val();
    var id_cliente = $("#edit-item").find("select[name='id_cliente']").val();
    alert(id_movilidad);
    alert(id_cliente);
    $.ajax({
        dataType: 'json',
        type:'PUT',
        url: form_action,
        data:{latitud:latitud, longitud:longitud, id_movilidad:id_movilidad, id_cliente:id_cliente}
    }).done(function(data){
        getPageDataUbi();
        $(".modal").modal('hide');
        $("#create-ubicacion").find("input[name='latitud']").val(" ");
        $("#create-ubicacion").find("input[name='longitud']").val(" ");
        $("#create-ubicacion").find("select[name='id_movilidad']").val(" ");
        $("#create-ubicacion").find("select[name='id_cliente']").val(" ");
        toastr.success('Ubicacion Actualizado Correctamente.', 'Success Alert', {timeOut: 5000});
    });
});