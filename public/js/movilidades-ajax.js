var page = 1;
var current_page = 1;
var total_page = 0;
var is_ajax_fire = 0;
manageDataMov();
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
function manageDataMov() {
    $.ajax({
        dataType: 'json',
        url: mov,
        data: {page:page}
    }).done(function(data){
    	manageRowMov(data.data);
    });
}
$.ajaxSetup({
    headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
});
/* Get Page Data*/
function getPageDataMov() {
	$.ajax({
    	dataType: 'json',
    	url: mov,
    	data: {page:page}
	}).done(function(data){
        
		manageRowMov(data.data);
	});
}
/* Add new Movilidad table row */
function manageRowMov(data) {
	var	rows = '';
	$.each( data, function( key, value ) {
	  	rows = rows + '<tr>';
        rows = rows + '<td>'+value.placa+'</td>';
	  	rows = rows + '<td>'+value.descripcion+'</td>';
        rows = rows + '<td>'+value.nombreempleado+'</td>';
	  	rows = rows + '<td data-id="'+value.id+'"data-id_empleados="'+value.id_empleados+'">';
        rows = rows + '<button data-toggle="modal" data-target="#edit-item" class="btn btn-success edit-movilidad-item fa fa-edit"></button> ';
        rows = rows + '<button data-toggle="modal" data-target="#delete-item" class="btn btn-danger remove-movilidad-item fa fa-trash "></button> ';
        rows = rows + '</td>';
	  	rows = rows + '</tr>';
	});
	$("#movilidad").html(rows);
}
/* Create new Movilidad */
$(".movilidad-submit").click(function(e){
    e.preventDefault();
    var form_action = $("#create-movilidad").find("form").attr("action");
    var placa = $("#create-movilidad").find("input[name='placa']").val();
    var descripcion = $("#create-movilidad").find("textarea[name='descripcion']").val();
    var id_empleados = $("#create-movilidad").find("select[name='id_empleados']").val();
    var estado=0;
    $.ajax({
        dataType: 'json',
        type:'POST',
        url: form_action,
        data:{placa:placa, descripcion:descripcion, id_empleados:id_empleados}
    }).done(function(data){
        getPageDataMov();
        $(".modal").modal('hide');
        $("#create-movilidad").find("input[name='placa']").val(" ");
        $("#create-movilidad").find("textarea[name='decripcion']").val();
        $("#create-movilidad").find("select[name='id_empleados']").val(" ");

        toastr.success('Movilidad Creado satisfactoriamente.', 'Success Alert', {timeOut: 5000});
    });
});
/* Remove Proveedor */
$("body").on("click",".remove-movilidad-item",function(){
    var placa = $(this).parent("td").prev("td").prev("td").prev("td").text();
    var descripcion = $(this).parent("td").prev("td").prev("td").text();
    var mostrar = descripcion+' con '+placa;
    var id = $(this).parent("td").data('id');
    $("#delete-item").find("form").attr("action",mov + '/' + id);
    $("#delete-item").find("input[name='placa']").val(mostrar);
});

$('.crud-submit-movilidad-delete').click(function(e){

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
        toastr.success('Movilidad Eliminada corectamente.', 'Success Alert', {timeOut: 5000});
        getPageDataMov();
    });
});
/* Edit Post */
$("body").on("click",".edit-movilidad-item",function(){
    var id = $(this).parent("td").data('id');
    var placa = $(this).parent("td").prev("td").prev("td").prev("td").text();
    var descripcion = $(this).parent("td").prev("td").prev("td").text();
    var id_empleados = $(this).parent("td").prev("td").text();

    $("#edit-item").find("input[name='placa']").val(placa);
    $("#edit-item").find("textarea[name='descripcion']").val(descripcion);
    $("#edit-item").find("select[name='id_empleados']").val(id_empleados);
    $("#edit-item").find("form").attr("action",mov + '/' + id);
});
/* Updated new Movilidad */
$(".crud-submit-movilidad-edit").click(function(e){
    e.preventDefault();
    var form_action = $("#edit-item").find("form").attr("action");
    var placa = $("#edit-item").find("input[name='placa']").val();
    var descripcion = $("#edit-item").find("textarea[name='descripcion']").val();
    var id_empleados = $("#edit-item").find("select[name='id_empleados']").val();

    $.ajax({
        dataType: 'json',
        type:'PUT',
        url: form_action,
        data:{placa:placa, descripcion:descripcion, id_empleados:id_empleados}
    }).done(function(data){
        getPageDataMov();
        $(".modal").modal('hide');
        $("#create-movilidad").find("input[name='placa']").val(" ");
        $("#edit-item").find("textarea[name='descripcion']").val();
        $("#create-movilidad").find("select[name='id_empleados']").val(" ");
        toastr.success('Movilidad Actualizado Correctamente.', 'Success Alert', {timeOut: 5000});
    });
});