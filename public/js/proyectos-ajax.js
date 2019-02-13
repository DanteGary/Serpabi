var page = 1;
var current_page = 1;
var total_page = 0;
var is_ajax_fire = 0;
manageDataProye();
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
function manageDataProye() {
    $.ajax({
        dataType: 'json',
        url: proye,
        data: {page:page}
    }).done(function(data){
    	manageRowProye(data.data);
    });
}
$.ajaxSetup({
    headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
});
/* Get Page Data*/
function getPageDataProye() {
	$.ajax({
    	dataType: 'json',
    	url: proye,
    	data: {page:page}
	}).done(function(data){
        
		manageRowProye(data.data);
	});
}
/* Add new Empleado table row */
function manageRowProye(data) {
	var	rows = '';
	$.each( data, function( key, value ) {
	  	rows = rows + '<tr>';
	  	rows = rows + '<td>'+value.nombre+'</td>';
        rows = rows + '<td>'+value.fecha_inicio+'</td>';
        rows = rows + '<td>'+value.fecha_fin+'</td>';
        rows = rows + '<td>'+value.avanceP+'</td>';
        rows = rows + '<td>'+value.avanceP+'</td>';
        rows = rows + '<td>'+value.nombreEst+'</td>';
        rows = rows + '<td data-id="'+value.id+'"data-id_estado="'+value.id_estado+'">';
        rows = rows + '<a href="tareasM/'+value.id+'" onclick=manageDataTarea('+value.id_estado+') class="btn btn-info" role="button">Tareas</a>';
        rows = rows + '<button data-toggle="modal" data-target="#edit-item" class="btn btn-success edit-proyecto-item fa fa-edit"></button> ';
        rows = rows + '<button data-toggle="modal" data-target="#delete-item" class="btn btn-danger remove-proyecto-item fa fa-trash "></button> ';
        rows = rows + '</td>';
	  	rows = rows + '</tr>';
	});
	$("#proyecto").html(rows);
}


/* Create new Proyecto */
$(".proyecto-submit").click(function(e){
    e.preventDefault();
    var form_action = $("#create-proyecto").find("form").attr("action");
    var nombre = $("#create-proyecto").find("input[name='nombre']").val();
    var fecha_inicio = $("#create-proyecto").find("input[name='fecha_inicio']").val();
    var fecha_fin = $("#create-proyecto").find("input[name='fecha_fin']").val();
    var id_estado = $("#create-proyecto").find("select[name='id_estado']").val();
    var avance = 0;
    $.ajax({
        dataType: 'json',
        type:'POST',
        url: form_action,
        data:{nombre:nombre, fecha_inicio:fecha_inicio, fecha_fin:fecha_fin, avance:avance, id_estado:id_estado}
    }).done(function(data){
        getPageDataProye();
        $(".modal").modal('hide');
        $("#create-proyecto").find("input[name='nombre']").val(" ");
        $("#create-proyecto").find("input[name='fecha_inicio']").val(" ");
        $("#create-proyecto").find("input[name='fecha_fin']").val(" ");
        $("#create-proyecto").find("select[name='id_estado']").val(" ");

        toastr.success('Proyecto Creado satisfactoriamente.', 'Success Alert', {timeOut: 5000});
    });
});

/* Remove Empleado */
$("body").on("click",".remove-proyecto-item",function(){
    var nombre = $(this).parent("td").prev("td").prev("td").prev("td").prev("td").text();
    var id = $(this).parent("td").data('id');
    $("#delete-item").find("form").attr("action",proye + '/' + id);
    $("#delete-item").find("input[name='nombre']").val(nombre);
});

$('.crud-submit-proyecto-delete').click(function(e){

    e.preventDefault();
    var form_action = $("#delete-item").find("form").attr("action");
    $.ajax({
        dataType: 'json',
        type:'delete',
        url: form_action,
    }).done(function(data){
        $(".modal").modal('hide');
        // c_obj.remove();
        toastr.success('Proyecto Eliminado corectamente.', 'Success Alert', {timeOut: 5000});
        getPageDataProye();
    });
});
/* Edit Post */
$("body").on("click",".edit-proyecto-item",function(){
    var id = $(this).parent("td").data('id');
    var nombre = $(this).parent("td").prev("td").prev("td").prev("td").prev("td").text();
    var fecha_inicio = $(this).parent("td").prev("td").prev("td").prev("td").text();
    var fecha_fin = $(this).parent("td").prev("td").prev("td").text();
    var id_estado = $(this).parent("td").prev("td").text();

    $("#edit-item").find("input[name='nombre']").val(nombre);
    $("#edit-item").find("input[name='fecha_inicio']").val(fecha_inicio);
    $("#edit-item").find("input[name='fecha_fin']").val(fecha_fin);
    $("#edit-item").find("select[name='id_estado']").val(id_estado);
    $("#edit-item").find("form").attr("action",proye + '/' + id);
});
/* Updated new Proyecto */
$(".crud-submit-proyecto-edit").click(function(e){
    e.preventDefault();
    var form_action = $("#edit-item").find("form").attr("action");
    var nombre = $("#edit-item").find("input[name='nombre']").val();
    var fecha_inicio = $("#edit-item").find("input[name='fecha_inicio']").val();
    var fecha_fin = $("#edit-item").find("input[name='fecha_fin']").val();
    var id_estado = $("#edit-item").find("select[name='id_estado']").val();

    $.ajax({
        dataType: 'json',
        type:'PUT',
        url: form_action,
        data:{nombre:nombre, fecha_inicio:fecha_inicio, fecha_fin:fecha_fin, id_estado:id_estado}
    }).done(function(data){
        getPageDataProye();
        $(".modal").modal('hide');
        $("#create-empleado").find("input[name='nombre']").val(" ");
        $("#create-empleado").find("input[name='fecha_inicio']").val(" ");
        $("#create-empleado").find("input[name='fecha_fin']").val(" ");
        $("#create-empleado").find("select[name='id_estado']").val(" ");
        toastr.success('Proyecto Actualizado Correctamente.', 'Success Alert', {timeOut: 5000});
    });
});