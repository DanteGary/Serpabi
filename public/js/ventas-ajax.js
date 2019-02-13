var page = 1;
var current_page = 1;
var total_page = 0;
var is_ajax_fire = 0;
manageDataVen();
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
function manageDataVen() {
    $.ajax({
        dataType: 'json',
        url: ven,
        data: {page:page}
    }).done(function(data){
    	manageRowVen(data.data);
    });
}
$.ajaxSetup({
    headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
});
/* Get Page Data*/
function getPageDataVen() {
	$.ajax({
    	dataType: 'json',
    	url: ven,
    	data: {page:page}
	}).done(function(data){
        
		manageRowVen(data.data);
	});
}
/* Add new Venta table row */
function manageRowVen(data) {
	var	rows = '';
	$.each( data, function( key, value ) {
	  	rows = rows + '<tr>';
	  	rows = rows + '<td>'+value.fecha+'</td>';
        rows = rows + '<td>'+value.cantidad+'</td>';
        rows = rows + '<td>'+value.nombrematerial+'</td>';
        rows = rows + '<td>'+value.nombreprod+'</td>';
	  	rows = rows + '<td data-id="'+value.id+'"data-id_materiales="'+value.id_materiales+'"data-id_productos="'+value.id_productos+'">';
        rows = rows + '<button data-toggle="modal" data-target="#edit-item" class="btn btn-success edit-venta-item fa fa-edit"></button> ';
        rows = rows + '<button data-toggle="modal" data-target="#delete-item" class="btn btn-danger remove-venta-item fa fa-trash "></button> ';
        rows = rows + '</td>';
	  	rows = rows + '</tr>';
	});
	$("#venta").html(rows);
}
/* Create new Cargo */
$(".venta-submit").click(function(e){
    e.preventDefault();
    var form_action = $("#create-venta").find("form").attr("action");
    var fecha = $("#create-venta").find("input[name='fecha']").val();
    var cantidad = $("#create-venta").find("input[name='cantidad']").val();
    var id_materiales = $("#create-venta").find("select[name='id_materiales']").val();
    var id_productos = $("#create-venta").find("select[name='id_productos']").val();
    var estado=0;
    $.ajax({
        dataType: 'json',
        type:'POST',
        url: form_action,
        data:{fecha:fecha, cantidad:cantidad, id_materiales:id_materiales, id_productos:id_productos}
    }).done(function(data){
        getPageDataVen();
        $(".modal").modal('hide');
        $("#create-venta").find("input[name='fecha']").val(" ");
        $("#create-venta").find("input[name='cantidad']").val(" ");
        $("#create-venta").find("select[name='id_materiales']").val(" ");
        $("#create-venta").find("select[name='id_productos']").val(" ");

        toastr.success('Venta Creada satisfactoriamente.', 'Success Alert', {timeOut: 5000});
    });
});
/* Remove Proveedor */
$("body").on("click",".remove-venta-item",function(){
    
    var id = $(this).parent("td").data('id');
    $("#delete-item").find("form").attr("action",ven + '/' + id);
    $("#delete-item").find("input[name='id']").val(id);
});

$('.crud-submit-venta-delete').click(function(e){

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
        toastr.success('Venta Eliminado corectamente.', 'Success Alert', {timeOut: 5000});
        getPageDataVen();
    });
});
/* Edit Post */
$("body").on("click",".edit-venta-item",function(){
    var id = $(this).parent("td").data('id');
    var fecha = $(this).parent("td").prev("td").prev("td").prev("td").prev("td").text();
    var cantidad = $(this).parent("td").prev("td").prev("td").prev("td").text();
    var id_materiales = $(this).parent("td").prev("td").prev("td").text();
    var id_productos = $(this).parent("td").prev("td").text();

    $("#edit-item").find("input[name='fecha']").val(fecha);
    $("#edit-item").find("input[name='cantidad']").val(cantidad);
    $("#edit-item").find("select[name='id_materiales']").val(id_materiales);
    $("#edit-item").find("select[name='id_productos']").val(id_productos);
    $("#edit-item").find("form").attr("action",ven + '/' + id);
});
/* Updated new Cargo */
$(".crud-submit-venta-edit").click(function(e){
    e.preventDefault();
    var form_action = $("#edit-item").find("form").attr("action");
    var fecha = $("#edit-item").find("input[name='fecha']").val();
    var cantidad = $("#edit-item").find("input[name='cantidad']").val();
    var id_materiales = $("#edit-item").find("select[name='id_materiales']").val();
    var id_productos = $("#edit-item").find("select[name='id_productos']").val();

    $.ajax({
        dataType: 'json',
        type:'PUT',
        url: form_action,
        data:{fecha:fecha, cantidad:cantidad, id_materiales:id_materiales, id_productos:id_productos}
    }).done(function(data){
        getPageDataVen();
        $(".modal").modal('hide');
        $("#create-venta").find("input[name='fecha']").val(" ");
        $("#create-venta").find("input[name='cantidad']").val(" ");
        $("#create-venta").find("select[name='id_materiales']").val(" ");
        $("#create-venta").find("select[name='id_productos']").val(" ");
        toastr.success('Venta Actualizada Correctamente.', 'Success Alert', {timeOut: 5000});
    });
});