var page = 1;
var current_page = 1;
var total_page = 0;
var is_ajax_fire = 0;
manageDataCue();
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
function manageDataCue() {
    $.ajax({
        dataType: 'json',
        url: cue,
        data: {page:page}
    }).done(function(data){
    	manageRowCue(data.data);
    });
}
$.ajaxSetup({
    headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
});
/* Get Page Data*/
function getPageDataCue() {
	$.ajax({
    	dataType: 'json',
    	url: cue,
    	data: {page:page}
	}).done(function(data){
        
		manageRowCue(data.data);
	});
}
/* Add new Cliente table row */
function manageRowCue(data) {
	var	rows = '';
	$.each( data, function( key, value ) {
	  	rows = rows + '<tr>';
	  	rows = rows + '<td>'+value.nombre+'</td>';
        rows = rows + '<td>'+value.tipo+'</td>';
	  	rows = rows + '<td>'+value.numero_cuenta+'</td>';
        rows = rows + '<td>'+value.banco+'</td>';
	  	rows = rows + '<td data-id="'+value.id+'">';
        rows = rows + '<button data-toggle="modal" data-target="#edit-item" class="btn btn-success edit-cuenta-item fa fa-edit"></button> ';
        rows = rows + '<button data-toggle="modal" data-target="#delete-item" class="btn btn-danger remove-cuenta-item fa fa-trash "></button> ';
        rows = rows + '</td>';
	  	rows = rows + '</tr>';
	});
	$("#cuenta").html(rows);
}
/* Create new Cuenta */
$(".cuenta-submit").click(function(e){
    e.preventDefault();
    var form_action = $("#create-cuenta").find("form").attr("action");
    var nombre = $("#create-cuenta").find("input[name='nombre']").val();
    var tipo = $("#create-cuenta").find("input[name='tipo']").val();
    var numero_cuenta = $("#create-cuenta").find("input[name='numero_cuenta']").val();
    var banco = $("#create-cuenta").find("input[name='banco']").val();
    var estado=0;
    $.ajax({
        dataType: 'json',
        type:'POST',
        url: form_action,
        data:{nombre:nombre, tipo:tipo, numero_cuenta:numero_cuenta, banco:banco}
    }).done(function(data){
        getPageDataCue();
        $(".modal").modal('hide');
        $("#create-cliente").find("input[name='nombre']").val(" ");
        $("#create-cliente").find("input[name='tipo']").val(" ");
        $("#create-cliente").find("input[name='numero_cuenta']").val(" ");
        $("#create-cliente").find("input[name='banco']").val(" ");

        toastr.success('Cuenta Creado satisfactoriamente.', 'Success Alert', {timeOut: 5000});
    });
});
/* Remove Cuenta */
$("body").on("click",".remove-cuenta-item",function(){
    var nombre = $(this).parent("td").prev("td").prev("td").prev("td").prev("td").text();
    var id = $(this).parent("td").data('id');
    $("#delete-item").find("form").attr("action",cue + '/' + id);
    $("#delete-item").find("input[name='nombre']").val(nombre);
});

$('.crud-submit-cuenta-delete').click(function(e){
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
        toastr.success('Cuenta Eliminado corectamente.', 'Success Alert', {timeOut: 5000});
        getPageDataCue();
    });
});


/* Edit Post */
$("body").on("click",".edit-cuenta-item",function(){
    var id = $(this).parent("td").data('id');
    var nombre = $(this).parent("td").prev("td").prev("td").prev("td").prev("td").text();
    var tipo = $(this).parent("td").prev("td").prev("td").prev("td").text();
    var numero_cuenta = $(this).parent("td").prev("td").prev("td").text();
    var banco = $(this).parent("td").prev("td").text();

    $("#edit-item").find("input[name='nombre']").val(nombre);
    $("#edit-item").find("input[name='tipo']").val(tipo);
    $("#edit-item").find("input[name='numero_cuenta']").val(numero_cuenta);
    $("#edit-item").find("input[name='banco']").val(banco);
    $("#edit-item").find("form").attr("action",cue + '/' + id);
});


/* Updated new Cuenta */
$(".crud-submit-cuenta-edit").click(function(e){
    e.preventDefault();
    var form_action = $("#edit-item").find("form").attr("action");
    var nombre = $("#edit-item").find("input[name='nombre']").val();
    var tipo = $("#edit-item").find("input[name='tipo']").val();
    var numero_cuenta = $("#edit-item").find("input[name='numero_cuenta']").val();
    var banco = $("#edit-item").find("input[name='banco']").val();

    $.ajax({
        dataType: 'json',
        type:'PUT',
        url: form_action,
        data:{nombre:nombre, tipo:tipo, numero_cuenta:numero_cuenta, banco:banco}
    }).done(function(data){
        getPageDataCue();
        $(".modal").modal('hide');
        $("#create-cliente").find("input[name='nombre']").val(" ");
        $("#create-cliente").find("input[name='tipo']").val(" ");
        $("#create-cliente").find("input[name='numero_cuenta']").val(" ");
        $("#create-cliente").find("input[name='banco']").val(" ");
        toastr.success('Cuenta Actualizado Correctamente.', 'Success Alert', {timeOut: 1000});

    });
});