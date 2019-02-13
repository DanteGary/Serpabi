var page = 1;
var current_page = 1;
var total_page = 0;
var is_ajax_fire = 0;
manageDataVenPro();
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
function manageDataVenPro() {
    $.ajax({
        dataType: 'json',
        url: venPro,
        data: {page:page}
    }).done(function(data){
    	manageRowVenPro(data.data);
    });
}
$.ajaxSetup({
    headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
});
/* Get Page Data*/
function getPageDataVenPro() {
	$.ajax({
    	dataType: 'json',
    	url: venPro,
    	data: {page:page}
	}).done(function(data){
        
		manageRowVenPro(data.data);
	});
}
/* Add new Venta table row */
function manageRowVenPro(data) {
	var	rows = '';
	$.each( data, function( key, value ) {
	  	rows = rows + '<tr>';
	  	rows = rows + '<td>'+value.costo_venta+'</td>';
	  	rows = rows + '<td>'+value.fecha_venta+'</td>';
        rows = rows + '<td>'+value.cantidad+'</td>';
        rows = rows + '<td>'+value.nombrecli+'</td>';
        rows = rows + '<td>'+value.nombreProducto+'</td>';
	  	rows = rows + '<td data-id="'+value.id+'"data-id_cliente="'+value.id_cliente+'"data-id_producto="'+value.id_producto+'">';
        rows = rows + '<button data-toggle="modal" data-target="#edit-item" class="btn btn-success edit-ventaProducto-item fa fa-edit"></button> ';
        rows = rows + '<button data-toggle="modal" data-target="#delete-item" class="btn btn-danger remove-ventaProducto-item fa fa-trash "></button> ';
        rows = rows + '</td>';
	  	rows = rows + '</tr>';
	});
	$("#ventaProducto").html(rows);
}

/*Insertar datos del modal al array*/
var arregloProductos = [];
var contadorPro = 0;
function cargarArrayProducto(nombre,nombre1){
    
    
    var objetoPro = {};
    var nombreP = nombre;
    var nombreC = nombre1;
    var costo_venta = $("#create-ventaProducto").find("span[name='costo_venta']").text();
    var fecha_venta = $("#create-ventaProducto").find("input[name='fecha_venta']").val();
    var cantidad = $("#create-ventaProducto").find("input[name='cantidad']").val();
    var id_cliente = $("#create-ventaProducto").find("select[name='id_cliente']").val();
    var id_producto = $("#create-ventaProducto").find("select[name='id_producto']").val();
    var total = parseFloat(costo_venta)*parseFloat(cantidad);
    
    objetoPro={
        nombreCliente:nombreC,
        nombreProducto:nombreP,
        contadorPro:contadorPro,
        costo_venta:total,
        fecha_venta:fecha_venta,
        cantidad:cantidad,
        id_cliente:id_cliente,
        id_producto:id_producto
    }

    arregloProductos.push(objetoPro);

    dibujarTablaProducto(arregloProductos);
}

/*Dibujar tabla de alquileres añadidos*/
function dibujarTablaProducto(arregloPro){
    var rows = '';
    $.each( arregloPro, function( key,value ) {
        rows = rows + '<tr>';
        rows = rows + '<td>'+value.nombreCliente+'</td>';
        rows = rows + '<td>'+value.fecha_venta+'</td>';
        rows = rows + '<td>'+value.nombreProducto+'</td>';
        rows = rows + '<td>'+value.cantidad+'</td>';
        rows = rows + '<td>'+value.costo_venta+'</td>';
        rows = rows + '<td><a href="#" class="btn btn-danger" onclick="deleteElementProducto('+value.contadorPro+')"><i class="fa fa-trash"></i></a></td>';     
        rows = rows + '</tr>';
    });
    $("#ventasProductos").html(rows);
    contadorPro++;
}

var seleccionado1;
$( "#agregarProduc" ).click(function () {
    var x = document.getElementById("mySelectP").value;
    var y = document.getElementById("mySelectC").value;
    var ventaPro = document.getElementById("mySelectP").options[x].text;
    var ventaCli = document.getElementById("mySelectC").options[y].text;
    cargarArrayProducto(ventaPro,ventaCli);
});

/*Eliminar datos de la tabla ventas*/
function deleteElementProducto(datos1){
    // console.log(datos1);
    // console.log(arregloProductos);
    var a = 0;
    var tamano = arregloProductos.length;
    while (tamano>a) {
        if (arregloProductos[a]["contadorPro"]==datos1) {
            arregloProductos.splice(a,1);
        }
        a++;
        
    }
    //console.log(arreglo1);
    dibujarTablaProducto(arregloProductos);
}

/*Registrar informacion obetenidas de la tabla a la base de datos*/
function insertarProducto(datas1){
    var numData1 = datas1.length;
    var form_action = $("#create-ventaProducto").find("form").attr("action");
    
    for (var i = 0; i < numData1; i++) {
        var costoVenta = datas1[i]["costo_venta"];
        var fechaVenta = datas1[i]["fecha_venta"];
        var cantidades = datas1[i]["cantidad"];
        var idCliente = datas1[i]["id_cliente"];
        var idProducto = datas1[i]["id_producto"];
        
        $.ajax({
        dataType: 'json',
        type:'POST',
        url: form_action,
        data:{costo_venta:costoVenta, fecha_venta:fechaVenta, cantidad:cantidades, id_cliente:idCliente, id_producto:idProducto}
        }).done(function(data){
            $(".modal").modal('hide');
        });

        toastr.success('Venta de Producto Registrado satisfactoriamente.', 'Success Alert', {timeOut: 5000});
        getPageDataVenPro();
       actualizarStockProducto(idProducto,cantidades);
    }
}

$(".addVenta-submit").click(function(e){
    e.preventDefault();

    var arreglitoProducto = arregloProductos;
    insertarProducto(arreglitoProducto);
});


/*Actualizar Stock de Productos
  Despues de registrar un alquiler*/
var cantidadNuevaProducto = 0;
function actualizarStockProducto(numId, canti){
    var idProduc = numId;
    var cantti = canti;
     $.ajax({
        dataType: 'json',
        url: prod,
        data: {page:page}
    }).done(function(data){
        
        $.each( data.data, function( key, value ) {
            if (idProduc==value.id) {
                cantidadNuevaProducto = value.cantidad - cantti;
                $.ajax({
                    dataType: 'json',
                    type:'PUT',
                    url: prod+'/'+idProduc,
                    data:{cantidad:cantidadNuevaProducto}
                }).done(function(data){
                    
                });
            }
        });
    });
}

/* Create new venta de Producto */
$(".ventaProducto-submit").click(function(e){
    e.preventDefault();
    var form_action = $("#create-ventaProducto").find("form").attr("action");
    var costo_venta = $("#create-ventaProducto").find("input[name='costo_venta']").val();
    var fecha_venta = $("#create-ventaProducto").find("input[name='fecha_venta']").val();
    var cantidad = $("#create-ventaProducto").find("input[name='cantidad']").val();
    var id_cliente = $("#create-ventaProducto").find("select[name='id_cliente']").val();
    var id_producto = $("#create-ventaProducto").find("select[name='id_producto']").val();
    var estado=0;
    $.ajax({
        dataType: 'json',
        type:'POST',
        url: form_action,
        data:{costo_venta:costo_venta, fecha_venta:fecha_venta, cantidad:cantidad, id_cliente:id_cliente, id_producto:id_producto}
    }).done(function(data){
        getPageDataVenPro();
        $(".modal").modal('hide');
        $("#create-ventaProducto").find("input[name='costo_venta']").val(" ");
        $("#create-ventaProducto").find("input[name='fecha_venta']").val(" ");
        $("#create-ventaProducto").find("input[name='cantidad']").val(" ");
        $("#create-ventaProducto").find("select[name='id_cliente']").val(" ");
        $("#create-ventaProducto").find("select[name='id_producto']").val(" ");

        toastr.success('Venta de Producto Registrada satisfactoriamente.', 'Success Alert', {timeOut: 5000});
    });
});


/* Remove Venta de Producto */
$("body").on("click",".remove-ventaProducto-item",function(){
    
    var id = $(this).parent("td").data('id');
    $("#delete-item").find("form").attr("action",venPro + '/' + id);
    $("#delete-item").find("input[name='id']").val(id);
});

$('.crud-submit-ventaProducto-delete').click(function(e){

    e.preventDefault();
    
    var form_action = $("#delete-item").find("form").attr("action");
    $.ajax({
        dataType: 'json',
        type:'delete',
        url: form_action,
    }).done(function(data){
        $(".modal").modal('hide');
        
        toastr.success('Venta Eliminado corectamente.', 'Success Alert', {timeOut: 5000});
        getPageDataVenPro();
    });
});

/* Edit Post */
$("body").on("click",".edit-ventaProducto-item",function(){
    var id = $(this).parent("td").data('id');
    var costo_venta = $(this).parent("td").prev("td").prev("td").prev("td").prev("td").prev("td").text();
    var fecha_venta = $(this).parent("td").prev("td").prev("td").prev("td").prev("td").text();
    var cantidad = $(this).parent("td").prev("td").prev("td").prev("td").text();
    var id_cliente = $(this).parent("td").prev("td").prev("td").text();
    var id_producto = $(this).parent("td").prev("td").text();

    $("#edit-item").find("input[name='costo_venta']").val(costo_venta);
    $("#edit-item").find("input[name='fecha_venta']").val(fecha_venta);
    $("#edit-item").find("input[name='cantidad']").val(cantidad);
    $("#edit-item").find("select[name='id_cliente']").val(id_cliente);
    $("#edit-item").find("select[name='id_producto']").val(id_producto);
    $("#edit-item").find("form").attr("action",venPro + '/' + id);
});
/* Updated new Venta Producto */
$(".crud-submit-ventaProducto-edit").click(function(e){
    e.preventDefault();
    var form_action = $("#edit-item").find("form").attr("action");
    var costo_venta = $("#edit-item").find("input[name='costo_venta']").val();
    var fecha_venta = $("#edit-item").find("input[name='fecha_venta']").val();
    var cantidad = $("#edit-item").find("input[name='cantidad']").val();
    var id_cliente = $("#edit-item").find("select[name='id_cliente']").val();
    var id_producto = $("#edit-item").find("select[name='id_producto']").val();

    $.ajax({
        dataType: 'json',
        type:'PUT',
        url: form_action,
        data:{costo_venta:costo_venta, fecha_venta:fecha_venta, cantidad:cantidad, id_cliente:id_cliente, id_producto:id_producto}
    }).done(function(data){
        getPageDataVenPro();
        $(".modal").modal('hide');
        $("#create-ventaProducto").find("input[name='costo_venta']").val(" ");
        $("#create-ventaProducto").find("input[name='fecha_venta']").val(" ");
        $("#create-ventaProducto").find("input[name='cantidad']").val(" ");
        $("#create-ventaProducto").find("select[name='id_cliente']").val(" ");
        $("#create-ventaProducto").find("select[name='id_producto']").val(" ");
        toastr.success('Venta Actualizada Correctamente.', 'Success Alert', {timeOut: 5000});
    });
});

/*Cargar costo del producto*/
function changeFuncPro(numero){
    var x = numero;
        $.ajax({
        dataType: 'json',
        url: prod,
        data: {page:page}
    }).done(function(data){
        var costo = 0;
        $.each( data.data, function( key, value ) {
            if (x==value.id) {
                costo=value.preciov;
            }
        });
        $("#costoProducto").text(costo);
    });
   
}
