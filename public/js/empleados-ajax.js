var page = 1;
var current_page = 1;
var total_page = 0;
var is_ajax_fire = 0;
manageDataEmpl();
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
function manageDataEmpl() {
    $.ajax({
        dataType: 'json',
        url: empl,
        data: {page:page}
    }).done(function(data){
    	manageRowEmpl(data.data);
    });
}
$.ajaxSetup({
    headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
});
/* Get Page Data*/
function getPageDataEmpl() {
	$.ajax({
    	dataType: 'json',
    	url: empl,
    	data: {page:page}
	}).done(function(data){
        
		manageRowEmpl(data.data);
	});
}
/* Add new Empleado table row */
function manageRowEmpl(data) {
	var	rows = '';
	$.each( data, function( key, value ) {
	  	rows = rows + '<tr>';
	  	rows = rows + '<td>'+value.nombre+'</td>';
        rows = rows + '<td>'+value.telefono+'</td>';
        rows = rows + '<td>'+value.ci_nit+'</td>';
        if (value.estado == 1) {
            rows = rows + '<td><span class="label label-warning">ACTIVO</span></td>';
        }
        else {
            rows = rows + '<td><span class="label label-danger">INACTIVO</span></td>';
        }
        rows = rows + '<td>'+value.nombrecargo+'</td>';
	  	rows = rows + '<td data-id="'+value.id+'"data-id_cargos="'+value.id_cargos+'">';
        rows = rows + '<button data-toggle="modal" data-target="#edit-item" class="btn btn-success edit-empleado-item fa fa-edit"></button> ';
        rows = rows + '<button data-toggle="modal" data-target="#delete-item" class="btn btn-danger remove-empleado-item fa fa-trash "></button> ';
        rows = rows + '</td>';
	  	rows = rows + '</tr>';
	});
	$("#empleado").html(rows);
}
/* Create new Empleado */
$(".empleado-submit").click(function(e){
    e.preventDefault();
    var form_action = $("#create-empleado").find("form").attr("action");
    var nombre = $("#create-empleado").find("input[name='nombre']").val();
    var telefono = $("#create-empleado").find("input[name='telefono']").val();
    var ci_nit = $("#create-empleado").find("input[name='ci_nit']").val();
    var id_cargos = $("#create-empleado").find("select[name='id_cargos']").val();
    var estado=1;
    $.ajax({
        dataType: 'json',
        type:'POST',
        url: form_action,
        data:{nombre:nombre, telefono:telefono, ci_nit:ci_nit, estado:estado, id_cargos:id_cargos}
    }).done(function(data){
        getPageDataEmpl();
        $(".modal").modal('hide');
        $("#create-empleado").find("input[name='nombre']").val(" ");
        $("#create-empleado").find("input[name='telefono']").val(" ");
        $("#create-empleado").find("input[name='ci_nit']").val(" ");
        $("#create-empleado").find("select[name='id_cargos']").val(" ");

        toastr.success('Empleado Creado satisfactoriamente.', 'Success Alert', {timeOut: 5000});
    });
});
/* Remove Empleado */
$("body").on("click",".remove-empleado-item",function(){
    var nombre = $(this).parent("td").prev("td").prev("td").prev("td").prev("td").prev("td").text();
    var id = $(this).parent("td").data('id');
    $("#delete-item").find("form").attr("action",empl + '/' + id);
    $("#delete-item").find("input[name='nombre']").val(nombre);
});

$('.crud-submit-empleado-delete').click(function(e){

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
        toastr.success('Empleado Eliminado corectamente.', 'Success Alert', {timeOut: 5000});
        getPageDataEmpl();
    });
});
/* Edit Post */
$("body").on("click",".edit-empleado-item",function(){
    var id = $(this).parent("td").data('id');
    var nombre = $(this).parent("td").prev("td").prev("td").prev("td").prev("td").prev("td").text();
    var telefono = $(this).parent("td").prev("td").prev("td").prev("td").prev("td").text();
    var ci_nit = $(this).parent("td").prev("td").prev("td").prev("td").text();
    var estado = $(this).parent("td").prev("td").prev("td").text();
    var id_cargos = $(this).parent("td").prev("td").text();

    $("#edit-item").find("input[name='nombre']").val(nombre);
    $("#edit-item").find("input[name='telefono']").val(telefono);
    $("#edit-item").find("input[name='ci_nit']").val(ci_nit);
    $("#edit-item").find("select[name='estado']").val(estado);
    $("#edit-item").find("select[name='id_cargos']").val(id_cargos);
    $("#edit-item").find("form").attr("action",empl + '/' + id);
});
/* Updated new Cargo */
$(".crud-submit-empleados-edit").click(function(e){
    e.preventDefault();
    var form_action = $("#edit-item").find("form").attr("action");
    var nombre = $("#edit-item").find("input[name='nombre']").val();
    var telefono = $("#edit-item").find("input[name='telefono']").val();
    var ci_nit = $("#edit-item").find("input[name='ci_nit']").val();
    var estado = $("#edit-item").find("select[name='estado']").val();
    var id_cargos = $("#edit-item").find("select[name='id_cargos']").val();

    $.ajax({
        dataType: 'json',
        type:'PUT',
        url: form_action,
        data:{nombre:nombre, telefono:telefono, ci_nit:ci_nit, estado:estado, id_cargos:id_cargos}
    }).done(function(data){
        getPageDataEmpl();
        $(".modal").modal('hide');
        $("#create-empleado").find("input[name='nombre']").val(" ");
        $("#create-empleado").find("input[name='telefono']").val(" ");
        $("#create-empleado").find("input[name='ci_nit']").val(" ");
        $("#create-empleado").find("select[name='estado']").val(" ");
        $("#create-empleado").find("select[name='id_cargos']").val(" ");
        toastr.success('Empleado Actualizado Correctamente.', 'Success Alert', {timeOut: 5000});
    });
});