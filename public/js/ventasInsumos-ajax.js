var page = 1;
var current_page = 1;
var total_page = 0;
var is_ajax_fire = 0;
manageDataVenIns();
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
function manageDataVenIns() {
    $.ajax({
        dataType: 'json',
        url: venIns,
        data: {page:page}
    }).done(function(data){
    	manageRowVenIns(data.data);
    });
}
$.ajaxSetup({
    headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
});
/* Get Page Data*/
function getPageDataVenIns() {
	$.ajax({
    	dataType: 'json',
    	url: venIns,
    	data: {page:page}
	}).done(function(data){
        
		manageRowVenIns(data.data);
	});
}
/* Add new Venta table row */
function manageRowVenIns(data) {
	var	rows = '';
	$.each( data, function( key, value ) {
	  	rows = rows + '<tr>';
	  	rows = rows + '<td>'+value.costo_venta+'</td>';
	  	rows = rows + '<td>'+value.fecha_venta+'</td>';
        rows = rows + '<td>'+value.cantidad+'</td>';
        rows = rows + '<td>'+value.nombrecli+'</td>';
        rows = rows + '<td>'+value.nombreInsumo+'</td>';
	  	rows = rows + '<td data-id="'+value.id+'"data-id_cliente="'+value.id_cliente+'"data-id_material="'+value.id_material+'">';
        rows = rows + '<button data-toggle="modal" data-target="#edit-item" class="btn btn-success edit-ventaInsumo-item fa fa-edit"></button> ';
        rows = rows + '<button data-toggle="modal" data-target="#delete-item" class="btn btn-danger remove-ventaInsumo-item fa fa-trash "></button> ';
        rows = rows + '</td>';
	  	rows = rows + '</tr>';
	});
	$("#ventaInsumo").html(rows);
}

/*Insertar datos del modal al array*/
var arregloInsumos = [];
var contadorIns = 0;
function cargarArrayInsumo(nombre,nombre1){
    
    
    var objetoInsum = {};
    var nombreIn = nombre;
    var nombreC = nombre1;
    var costo_venta = $("#create-ventaInsumo").find("span[name='costo_venta']").text();
    var fecha_venta = $("#create-ventaInsumo").find("input[name='fecha_venta']").val();
    var cantidad = $("#create-ventaInsumo").find("input[name='cantidad']").val();
    var id_cliente = $("#create-ventaInsumo").find("select[name='id_cliente']").val();
    var id_material = $("#create-ventaInsumo").find("select[name='id_material']").val();
    var total = parseFloat(costo_venta)*parseFloat(cantidad);
    
    objetoInsum={
        nombreCliente:nombreC,
        nombreInsumo:nombreIn,
        contadorIns:contadorIns,
        costo_venta:total,
        fecha_venta:fecha_venta,
        cantidad:cantidad,
        id_cliente:id_cliente,
        id_material:id_material
    }

    arregloInsumos.push(objetoInsum);

    dibujarTablaInsumo(arregloInsumos);
}

/*Dibujar tabla de alquileres añadidos*/
function dibujarTablaInsumo(arregloI){
    var rows = '';
    $.each( arregloI, function( key,value ) {
        rows = rows + '<tr>';
        rows = rows + '<td>'+value.nombreCliente+'</td>';
        rows = rows + '<td>'+value.fecha_venta+'</td>';
        rows = rows + '<td>'+value.nombreInsumo+'</td>';
        rows = rows + '<td>'+value.cantidad+'</td>';
        rows = rows + '<td>'+value.costo_venta+'</td>';
        rows = rows + '<td><a href="#" class="btn btn-danger" onclick="deleteElementInsumo('+value.contadorIns+')"><i class="fa fa-trash"></i></a></td>';     
        rows = rows + '</tr>';
    });
    $("#ventasInsumos").html(rows);
    contadorIns++;
}

var seleccionado1 = 0;
$( "#agregarInsu" ).click(function () {
    var x = document.getElementById("mySelectI").value;
    var y = document.getElementById("mySelectCl").value;
    alert(y);
    alert(seleccionado1);
    var ventInsu = document.getElementById("mySelectI").options[x].text;
    var ventaClie = document.getElementById("mySelectCl").options[y].text;
    cargarArrayInsumo(ventInsu,ventaClie);
});

/*Eliminar datos de la tabla ventas*/
function deleteElementInsumo(datos1){
    // console.log(datos1);
    // console.log(arregloInsumos);
    var a = 0;
    var tamano = arregloInsumos.length;
    while (tamano>a) {
        if (arregloInsumos[a]["contadorIns"]==datos1) {
            arregloInsumos.splice(a,1);
        }
        a++;
        
    }
    //console.log(arreglo1);
    dibujarTablaInsumo(arregloInsumos);
}

/*Registrar informacion obetenidas de la tabla a la base de datos*/
function insertarInsumo(datas1){
    var numData1 = datas1.length;
    var form_action = $("#create-ventaInsumo").find("form").attr("action");
    
    for (var i = 0; i < numData1; i++) {
        var costoVenta = datas1[i]["costo_venta"];
        var fechaVenta = datas1[i]["fecha_venta"];
        var cantidades = datas1[i]["cantidad"];
        var idCliente = datas1[i]["id_cliente"];
        var idMaterial = datas1[i]["id_material"];
        
        $.ajax({
        dataType: 'json',
        type:'POST',
        url: form_action,
        data:{costo_venta:costoVenta, fecha_venta:fechaVenta, cantidad:cantidades, id_cliente:idCliente, id_material:idMaterial}
        }).done(function(data){
            $(".modal").modal('hide');
        });

        toastr.success('Venta de Material Insumo Registrado satisfactoriamente.', 'Success Alert', {timeOut: 5000});
        getPageDataVenIns();
       actualizarStockInsumo(idMaterial,cantidades);
    }
}

$(".addVentaInsumo-submit").click(function(e){
    e.preventDefault();

    var arreglitoInsumo = arregloInsumos;
    insertarInsumo(arreglitoInsumo);
});


/*Actualizar Stock de Material Insumo
  Despues de registrar un alquiler*/
var cantidadNuevaInsumo = 0;
function actualizarStockInsumo(numId, canti){
    var insumoId = numId;
    var cantti = canti;
     $.ajax({
        dataType: 'json',
        url: matIns,
        data: {page:page}
    }).done(function(data){
        
        $.each( data.data, function( key, value ) {
            if (insumoId==value.id) {
                cantidadNuevaInsumo = value.cantidad - cantti;
                $.ajax({
                    dataType: 'json',
                    type:'PUT',
                    url: matIns+'/'+insumoId,
                    data:{cantidad:cantidadNuevaInsumo}
                }).done(function(data){
                    
                });
            }
        });
    });
}

/* Create new venta de Material de Insumo */
$(".ventaInsumo-submit").click(function(e){
    e.preventDefault();
    var form_action = $("#create-ventaInsumo").find("form").attr("action");
    var costo_venta = $("#create-ventaInsumo").find("input[name='costo_venta']").val();
    var fecha_venta = $("#create-ventaInsumo").find("input[name='fecha_venta']").val();
    var cantidad = $("#create-ventaInsumo").find("input[name='cantidad']").val();
    var id_cliente = $("#create-ventaInsumo").find("select[name='id_cliente']").val();
    var id_material = $("#create-ventaInsumo").find("select[name='id_material']").val();
    var estado=0;
    $.ajax({
        dataType: 'json',
        type:'POST',
        url: form_action,
        data:{costo_venta:costo_venta, fecha_venta:fecha_venta, cantidad:cantidad, id_cliente:id_cliente, id_material:id_material}
    }).done(function(data){
        getPageDataVenIns();
        $(".modal").modal('hide');
        $("#create-ventaInsumo").find("input[name='costo_venta']").val(" ");
        $("#create-ventaInsumo").find("input[name='fecha_venta']").val(" ");
        $("#create-ventaInsumo").find("input[name='cantidad']").val(" ");
        $("#create-ventaInsumo").find("select[name='id_cliente']").val(" ");
        $("#create-ventaInsumo").find("select[name='id_material']").val(" ");

        toastr.success('Venta de Material de Insumo Registrada satisfactoriamente.', 'Success Alert', {timeOut: 5000});
    });
});


/* Remove Proveedor */
$("body").on("click",".remove-ventaInsumo-item",function(){
    
    var id = $(this).parent("td").data('id');
    $("#delete-item").find("form").attr("action",venIns + '/' + id);
    $("#delete-item").find("input[name='id']").val(id);
});

$('.crud-submit-ventaInsumo-delete').click(function(e){

    e.preventDefault();
    
    var form_action = $("#delete-item").find("form").attr("action");
    $.ajax({
        dataType: 'json',
        type:'delete',
        url: form_action,
    }).done(function(data){
        $(".modal").modal('hide');
        
        toastr.success('Venta Eliminado corectamente.', 'Success Alert', {timeOut: 5000});
        getPageDataVenIns();
    });
});

/* Edit Post */
$("body").on("click",".edit-ventaInsumo-item",function(){
    var id = $(this).parent("td").data('id');
    var costo_venta = $(this).parent("td").prev("td").prev("td").prev("td").prev("td").prev("td").text();
    var fecha_venta = $(this).parent("td").prev("td").prev("td").prev("td").prev("td").text();
    var cantidad = $(this).parent("td").prev("td").prev("td").prev("td").text();
    var id_cliente = $(this).parent("td").prev("td").prev("td").text();
    var id_material = $(this).parent("td").prev("td").text();

    $("#edit-item").find("input[name='costo_venta']").val(costo_venta);
    $("#edit-item").find("input[name='fecha_venta']").val(fecha_venta);
    $("#edit-item").find("input[name='cantidad']").val(cantidad);
    $("#edit-item").find("select[name='id_cliente']").val(id_cliente);
    $("#edit-item").find("select[name='id_material']").val(id_material);
    $("#edit-item").find("form").attr("action",venIns + '/' + id);
});
/* Updated new Cargo */
$(".crud-submit-ventaInsumo-edit").click(function(e){
    e.preventDefault();
    var form_action = $("#edit-item").find("form").attr("action");
    var costo_venta = $("#edit-item").find("input[name='costo_venta']").val();
    var fecha_venta = $("#edit-item").find("input[name='fecha_venta']").val();
    var cantidad = $("#edit-item").find("input[name='cantidad']").val();
    var id_cliente = $("#edit-item").find("select[name='id_cliente']").val();
    var id_material = $("#edit-item").find("select[name='id_material']").val();

    $.ajax({
        dataType: 'json',
        type:'PUT',
        url: form_action,
        data:{costo_venta:costo_venta, fecha_venta:fecha_venta, cantidad:cantidad, id_cliente:id_cliente, id_material:id_material}
    }).done(function(data){
        getPageDataVenIns();
        $(".modal").modal('hide');
        $("#create-ventaInsumo").find("input[name='costo_venta']").val(" ");
        $("#create-ventaInsumo").find("input[name='fecha_venta']").val(" ");
        $("#create-ventaInsumo").find("input[name='cantidad']").val(" ");
        $("#create-ventaInsumo").find("select[name='id_cliente']").val(" ");
        $("#create-ventaInsumo").find("select[name='id_material']").val(" ");
        toastr.success('Venta Actualizada Correctamente.', 'Success Alert', {timeOut: 5000});
    });
});

/*Cargar costo del Material Insumo*/
function changeFuncIns(numero){
    var x = numero;
        $.ajax({
        dataType: 'json',
        url: matIns,
        data: {page:page}
    }).done(function(data){
        var costo = 0;
        $.each( data.data, function( key, value ) {
            if (x==value.id) {
                costo=value.costov;
            }
        });
        $("#costoInsumo").text(costo);
    });
   
}
