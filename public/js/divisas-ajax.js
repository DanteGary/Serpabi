var page = 1;
var current_page = 1;
var total_page = 0;
var is_ajax_fire = 0;
manageDataDiv();
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
function manageDataDiv() {
    $.ajax({
        dataType: 'json',
        url: div,
        data: {page:page}
    }).done(function(data){
    	manageRowDiv(data.data);
    });
}
$.ajaxSetup({
    headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
});
/* Get Page Data*/
function getPageDataDiv() {
	$.ajax({
    	dataType: 'json',
    	url: div,
    	data: {page:page}
	}).done(function(data){
        
		manageRowDiv(data.data);
	});
}
/* Add new Divisa table row */
function manageRowDiv(data) {
	var	rows = '';
	$.each( data, function( key, value ) {
	  	rows = rows + '<tr>';
	  	rows = rows + '<td>'+value.nombre_bolivianos+'</td>';
        rows = rows + '<td>'+value.simbolo_bolivianos+'</td>';
	  	rows = rows + '<td data-id="'+value.id+'">';
        rows = rows + '<button data-toggle="modal" data-target="#edit-item" class="btn btn-success edit-divisa-item fa fa-edit"></button> ';
        rows = rows + '<button data-toggle="modal" data-target="#delete-item" class="btn btn-danger remove-divisa-item fa fa-trash "></button> ';
        rows = rows + '</td>';
	  	rows = rows + '</tr>';
	});
	$("#divisa").html(rows);
}
/* Create new Divisa */
$(".divisa-submit").click(function(e){
    e.preventDefault();
    var form_action = $("#create-divisa").find("form").attr("action");
    var nombre_bolivianos = $("#create-divisa").find("input[name='nombre_bolivianos']").val();
    var simbolo_bolivianos = $("#create-divisa").find("input[name='simbolo_bolivianos']").val();
    var estado=0;
    $.ajax({
        dataType: 'json',
        type:'POST',
        url: form_action,
        data:{nombre_bolivianos:nombre_bolivianos, simbolo_bolivianos:simbolo_bolivianos}
    }).done(function(data){
        getPageDataDiv();
        $(".modal").modal('hide');
        $("#create-divisa").find("input[name='nombre_bolivianos']").val(" ");
        $("#create-divisa").find("input[name='simbolo_bolivianos']").val(" ");

        toastr.success('Divisa Creado satisfactoriamente.', 'Success Alert', {timeOut: 5000});
    });
});
/* Remove Divisa */
$("body").on("click",".remove-divisa-item",function(){
    
    var id = $(this).parent("td").data('id');
    $("#delete-item").find("form").attr("action",div + '/' + id);
    $("#delete-item").find("input[name='id']").val(id);
});

$('.crud-submit-divisa-delete').click(function(e){
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
        toastr.success('Divisa Eliminado corectamente.', 'Success Alert', {timeOut: 5000});
        getPageDataDiv();
    });
});


/* Edit Post */
$("body").on("click",".edit-divisa-item",function(){
    var id = $(this).parent("td").data('id');
    var nombre_bolivianos = $(this).parent("td").prev("td").prev("td").text();
    var simbolo_bolivianos = $(this).parent("td").prev("td").text();

    $("#edit-item").find("input[name='nombre_bolivianos']").val(nombre_bolivianos);
    $("#edit-item").find("input[name='simbolo_bolivianos']").val(simbolo_bolivianos);
    $("#edit-item").find("form").attr("action",div + '/' + id);
});


/* Updated new Cliente */
$(".crud-submit-divisa-edit").click(function(e){
    e.preventDefault();
    var form_action = $("#edit-item").find("form").attr("action");
    var nombre_bolivianos = $("#edit-item").find("input[name='nombre_bolivianos']").val();
    var simbolo_bolivianos = $("#edit-item").find("input[name='simbolo_bolivianos']").val();

    $.ajax({
        dataType: 'json',
        type:'PUT',
        url: form_action,
        data:{nombre_bolivianos:nombre_bolivianos, simbolo_bolivianos:simbolo_bolivianos}
    }).done(function(data){
        getPageDataDiv();
        $(".modal").modal('hide');
        $("#create-cliente").find("input[name='nombre_bolivianos']").val(" ");
        $("#create-cliente").find("input[name='simbolo_bolivianos']").val(" ");

        toastr.success('Divisa Actualizado Correctamente.', 'Success Alert', {timeOut: 1000});

    });
});