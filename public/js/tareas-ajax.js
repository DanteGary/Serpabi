var page = 1;
var current_page = 1;
var total_page = 0;
var is_ajax_fire = 0;
manageDataTarea();
manageDataEditTare();
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
function manageDataTarea(id) {
    $.ajax({
        dataType: 'json',
        url: tareas+'/'+id,
        data: {page:page}
    }).done(function(data){
        // $.each(data,function(key,value){
        //     value.nombreProducto;
        // });
    	manageRowTarea(data.data);
    });
}



$.ajaxSetup({
    headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
});
/* Get Page Data*/
function getPageDataTarea(id) {
	$.ajax({
    	dataType: 'json',
    	url: tareas+'/'+id,
    	data: {page:page}
	}).done(function(data){
        
		manageRowTarea(data.data);
	});
}
/* Add new Tarea table row */
var porcentaje = 0;
var numero = 0;
function manageRowTarea(data) {
	var	rows = '';
	$.each( data, function( key, value ) {

	});
	$("#tarea").html(rows);
}

var arrgloPro = [];
function cargarProductos(){
var arrai ={
            id:'',
            nombre:''
            };
    $.ajax({
        dataType: 'json',
        url: prod,
        data: {page:page}
    }).done(function(data){
        $.each( data.data, function( key, value ) {
            arrai = {
                id:value.id,
                nombre:value.nombre
            }
            arrgloPro.push(arrai);
        });
    });

    console.log(arrgloPro);
    dibujarSelect(arrgloPro);
}

// function dibujarSelect(objeto){
//     var resultado = document.getElementById('selectPro');
//     var rows = '<select class="form-control selectpicker " data-live-search=("true") name="id_productos" data-error="Selccione Producto" >\
//                 <option value="">Seleccione...</option>'
//                 $.each( objeto, function( key,value ) {
//                 '<option value="'+value.id+'">'+value.nombre+'</option>'
//                 })
//                 '</select>\
//                 <div class="help-block with-errors"></div>';
//         resultado.innerHTML = rows;

//         // rows = rows + '<select class="form-control selectpicker " data-live-search=("true") name="id_productos" data-error="Selccione Producto" >';
//         // rows = rows + '<option value="">Seleccione...</option>';
//         // $.each( objeto, function( key,value ) {
//         //     var rows = '<option value="'+value.id+'">'+value.nombre+'</option>';
//         // });
//         // var rows = '</select>';
//         // var rows = '<div class="help-block with-errors"></div>'

//         // $("#selectPro").html(rows);
//         console.log(rows);
// }

/* Create new Tarea Planificada */
$(".tareas-submit").click(function(e){
    e.preventDefault();

    var form_action = $("#create-tarea").find("form").attr("action");
    var nombre = $("#create-tarea").find("input[name='nombre']").val();
    var id_proyecto = $("#create-tarea").find("input[name='id_proyecto']").val();
    var fecha_inicio = $("#create-tarea").find("input[name='fecha_inicio']").val();
    var fecha_fin = $("#create-tarea").find("input[name='fecha_fin']").val();
    var id_producto = $("#create-tarea").find("select[name='id_producto']").val();
    var total = $("#create-tarea").find("input[name='total']").val();
    var avance = 0;
    var id_estado = 1;

    $.ajax({
        dataType: 'json',
        type:'POST',
        url: form_action,
        data:{nombre:nombre, fecha_inicio:fecha_inicio, fecha_fin:fecha_fin, total:total, avance:avance, id_estado:id_estado, id_producto:id_producto, id_proyecto:id_proyecto}
    }).done(function(data){
        getPageDataTarea();
        $(".modal").modal('hide');
        $("#create-tarea").find("input[name='nombre']").val(" ");
        $("#create-tarea").find("input[name='id_proyecto']").val();
        $("#create-tarea").find("input[name='fecha_inicio']").val(" ");
        $("#create-tarea").find("input[name='fecha_fin']").val(" ");
        $("#create-tarea").find("select[name='id_producto']").val(" ");
        $("#create-tarea").find("input[name='total']").val(" ");
        toastr.success('Tarea Planificada Creada satisfactoriamente.', 'Success Alert', {timeOut: 5000});
        location.reload();
    });
});

function recuperarID(id,nombre){
    $("#delete-item-tarea").find("form").attr("action",tarea + '/' + id);
    $("#delete-item-tarea").find("input[name='nombre']").val(nombre);
}

// /* Remove Proveedor */
// $("body").on("click",".remove-tarea-item",function(){
//     var nombre = $(this).parent("td").prev("td").prev("td").prev("td").prev("td").prev("td").prev("td").prev("td").prev("td").text();
//     var id = $(this).parent("td").data('id');
//     $("#delete-item").find("form").attr("action",tarea + '/' + id);
//     $("#delete-item").find("input[name='nombre']").val(nombre);
// });

$('.crud-submit-tarea-delete').click(function(e){

    e.preventDefault();
    var form_action = $("#delete-item-tarea").find("form").attr("action");
    $.ajax({
        dataType: 'json',
        type:'delete',
        url: form_action,
    }).done(function(data){
        $(".modal").modal('hide');
        
        toastr.success('Tarea Planificada Eliminada corectamente.', 'Success Alert', {timeOut: 5000});
        getPageDataTarea();
    });
});

function editProyec(id,nombre){
    $.ajax({
        dataType: 'json',
        url: tareas+'/'+id,
        data: {page:page}
    }).done(function(data){
        $.each(data, function( key, value ) {
            console.log(value.nombre);
        });
    });
}

function iterar(){

}

function manageDataEditTare(idPro,idTar) {
    $.ajax({
        dataType: 'json',
        url: editTarea+'/'+idPro+'/'+idTar,
        data: {page:page}
    }).done(function(data){
        $.each( data, function( key, value ) {
            $("#edit-item-tarea").find("input[name='nombre']").val(value.nombre);
            $("#edit-item-tarea").find("input[name='fecha_inicio']").val(value.fecha_inicio);
            $("#edit-item-tarea").find("input[name='fecha_fin']").val(value.fecha_fin);
            $("#edit-item-tarea").find("input[name='total']").val(value.total);
            $("#edit-item-tarea").find("input[name='avance']").val(value.avance);
            $("#edit-item-tarea").find("select[name='id_estado']").val(value.id_estado);
            $("#edit-item-tarea").find("select[name='id_producto']").val(value.id_producto);
            $("#edit-item-tarea").find("select[name='id_producto']").val(value.idProyecto);
            $("#edit-item-tarea").find("form").attr("action",tarea + '/' + id);
        });
    });
}
/* Edit Post */
$("body").on("click",".edit-tarea-item",function(){
    var avancep = $(this).parent("td").data('avancep');
    var id = $(this).parent("td").data('id');
    var nombre = $(this).parent("td").prev("td").prev("td").prev("td").prev("td").prev("td").prev("td").prev("td").prev("td").text();
    var fecha_inicio = $(this).parent("td").prev("td").prev("td").prev("td").prev("td").prev("td").prev("td").prev("td").text();
    var fecha_fin = $(this).parent("td").prev("td").prev("td").prev("td").prev("td").prev("td").prev("td").text();
    var total = $(this).parent("td").prev("td").prev("td").prev("td").prev("td").prev("td").text();
    
    var id_estado = $(this).parent("td").prev("td").prev("td").text();
    var id_producto = $(this).parent("td").prev("td").text();

     

    $("#edit-item").find("input[name='nombre']").val(nombre);
    $("#edit-item").find("input[name='fecha_inicio']").val(fecha_inicio);
    $("#edit-item").find("input[name='fecha_fin']").val(fecha_fin);
    $("#edit-item").find("input[name='total']").val(total);
    $("#edit-item").find("input[name='avance']").val(avancep);
    $("#edit-item").find("select[name='id_estado']").val(id_estado);
    $("#edit-item").find("select[name='id_producto']").val(id_producto);
    $("#edit-item").find("form").attr("action",tarea + '/' + id);
});

/* Updated new Tarea Planificada */
$(".crud-submit-tarea-edit").click(function(e){
    e.preventDefault();
    var form_action = $("#edit-item").find("form").attr("action");
    var nombre = $("#edit-item").find("input[name='nombre']").val();
    var fecha_inicio = $("#edit-item").find("input[name='fecha_inicio']").val();
    var fecha_fin = $("#edit-item").find("input[name='fecha_fin']").val();
    var total = $("#edit-item").find("input[name='total']").val();
    var avance = $("#edit-item").find("input[name='avance']").val();
    var id_estado = $("#edit-item").find("select[name='id_estado']").val();
    var id_producto = $("#edit-item").find("select[name='id_producto']").val();

    $.ajax({
        dataType: 'json',
        type:'PUT',
        url: form_action,
        data:{nombre:nombre, fecha_inicio:fecha_inicio, fecha_fin:fecha_fin, total:total, avance:avance, id_estado:id_estado, id_producto:id_producto}
    }).done(function(data){
        getPageDataTarea();
        $(".modal").modal('hide');
        $("#create-tarea").find("input[name='nombre']").val(" ");
        $("#create-tarea").find("input[name='fecha_inicio']").val(" ");
        $("#create-tarea").find("input[name='fecha_fin']").val(" ");
        $("#create-tarea").find("input[name='total']").val(" ");
        $("#create-tarea").find("input[name='avance']").val(" ");
        $("#create-tarea").find("select[name='id_estado']").val(" ");
        $("#create-tarea").find("select[name='id_producto']").val(" ");
        toastr.success('Tarea Planificada Actualizada Correctamente.', 'Success Alert', {timeOut: 5000});
    });
});