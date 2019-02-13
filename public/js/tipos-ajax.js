var page = 1;
var current_page = 1;
var total_page = 0;
var is_ajax_fire = 0;
manageDataTip();
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
function manageDataTip() {
    $.ajax({
        dataType: 'json',
        url: tip,
        data: {page:page}
    }).done(function(data){
    	manageRowTip(data.data);
    });
}
$.ajaxSetup({
    headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
});
/* Get Page Data*/
function getPageDataTip() {
	$.ajax({
    	dataType: 'json',
    	url: tip,
    	data: {page:page}
	}).done(function(data){
        
		manageRowTip(data.data);
	});
}
/* Add new Tipo table row */
function manageRowTip(data) {
	var	rows = '';
	$.each( data, function( key, value ) {
	  	rows = rows + '<tr>';
	  	rows = rows + '<td>'+value.entrada+'</td>';
        rows = rows + '<td>'+value.salida+'</td>';
	  	rows = rows + '<td data-id="'+value.id+'">';
        rows = rows + '<button data-toggle="modal" data-target="#edit-item" class="btn btn-success edit-tipo-item fa fa-edit"></button> ';
        rows = rows + '<button data-toggle="modal" data-target="#delete-item" class="btn btn-danger remove-tipo-item fa fa-trash "></button> ';
        rows = rows + '</td>';
	  	rows = rows + '</tr>';
	});
	$("#tipo").html(rows);
}
/* Create new Tipo */
$(".tipo-submit").click(function(e){
    e.preventDefault();
    var form_action = $("#create-tipo").find("form").attr("action");
    var entrada = $("#create-tipo").find("input[name='entrada']").val();
    var salida = $("#create-tipo").find("input[name='salida']").val();;
    $.ajax({
        dataType: 'json',
        type:'POST',
        url: form_action,
        data:{entrada:entrada, salida:salida}
    }).done(function(data){
        getPageDataTip();
        $(".modal").modal('hide');
        $("#create-tipo").find("input[name='entrada']").val(" ");
        $("#create-tipo").find("input[name='salida']").val(" ");


        toastr.success('Tipo Creado satisfactoriamente.', 'Success Alert', {timeOut: 5000});
    });
});
/* Remove Tipo */
$("body").on("click",".remove-tipo-item",function(){
    var entrada = $(this).parent("td").prev("td").prev("td").text();
    var salida = $(this).parent("td").prev("td").text();
    var id = $(this).parent("td").data('id');
    $("#delete-item").find("form").attr("action",tip + '/' + id);
    $("#delete-item").find("input[name='entrada']").val(entrada);
    $("#delete-item").find("input[name='salida']").val(salida);
});

$('.crud-submit-tipo-delete').click(function(e){
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
        toastr.success('Tipo Eliminado corectamente.', 'Success Alert', {timeOut: 5000});
        getPageDataTip();
    });
});


/* Edit Post */
$("body").on("click",".edit-tipo-item",function(){
    var id = $(this).parent("td").data('id');
    var entrada = $(this).parent("td").prev("td").prev("td").text();
    var salida = $(this).parent("td").prev("td").text();
    

    $("#edit-item").find("input[name='entrada']").val(entrada);
    $("#edit-item").find("input[name='salida']").val(salida);
    $("#edit-item").find("form").attr("action",tip + '/' + id);
});


/* Updated new Cliente */
$(".crud-submit-tipo-edit").click(function(e){
    e.preventDefault();
    var form_action = $("#edit-item").find("form").attr("action");
    var entrada = $("#edit-item").find("input[name='entrada']").val();
    var salida = $("#edit-item").find("input[name='salida']").val();


    $.ajax({
        dataType: 'json',
        type:'PUT',
        url: form_action,
        data:{entrada:entrada, salida:salida}
    }).done(function(data){
        getPageDataTip();
        $(".modal").modal('hide');
        $("#create-cliente").find("input[name='entrada']").val(" ");
        $("#create-cliente").find("input[name='salida']").val(" ");
        toastr.success('Tipo Actualizado Correctamente.', 'Success Alert', {timeOut: 1000});

    });
});