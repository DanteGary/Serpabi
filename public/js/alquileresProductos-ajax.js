var page = 1;
var current_page = 1;
var total_page = 0;
var is_ajax_fire = 0;
manageDataAlquiPro();
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
function manageDataAlquiPro() {
    $.ajax({
        dataType: 'json',
        url: alquiPro,
        data: {page:page}
    }).done(function(data){
    	manageRowAlquiPro(data.data);
    });
}
$.ajaxSetup({
    headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
});
/* Get Page Data*/
function getPageDataAlquiPro() {
	$.ajax({
    	dataType: 'json',
    	url: alquiPro,
    	data: {page:page}
	}).done(function(data){
        
		manageRowAlquiPro(data.data);
	});
}
/* Add new Ventas Producto table row */
function manageRowAlquiPro(data) {
	var	rows = '';
	$.each( data, function( key, value ) {
	  	rows = rows + '<tr>';
	  	rows = rows + '<td>'+value.costo_producto+'</td>';
        rows = rows + '<td>'+value.feha_inicio+'</td>';
        rows = rows + '<td>'+value.feha_fin+'</td>';
        rows = rows + '<td>'+value.nombrecli+'</td>';
        rows = rows + '<td>'+value.nombreProducto+'</td>';
	  	rows = rows + '<td data-id="'+value.id+'"data-id_cliente="'+value.id_cliente+'"data-id_producto="'+value.id_producto+'">';
        rows = rows + '<button data-toggle="modal" data-target="#edit-item" class="btn btn-success edit-alquilerProducto-item fa fa-edit"></button> ';
        rows = rows + '<button data-toggle="modal" data-target="#delete-item" class="btn btn-danger remove-alquilerProducto-item fa fa-trash "></button> ';
        rows = rows + '</td>';
	  	rows = rows + '</tr>';
	});
	$("#alquilerProducto").html(rows);
}

/*Insertar datos del modal al array*/
var arreglo1 = [];
var contador1 = 0;
function cargarArrayPro(nombre,nombre1){
    
    
    var objeto = {};
    var nombreP = nombre;
    var nombreC = nombre1;
    var costo_alquiler = $("#create-alquilerProducto").find("span[name='costo_alquiler']").text();
    var feha_inicio = $("#create-alquilerProducto").find("input[name='feha_inicio']").val();
    var feha_fin = $("#create-alquilerProducto").find("input[name='feha_fin']").val();
    var cantidad = $("#create-alquilerProducto").find("input[name='cantidad']").val();
    var id_cliente = $("#create-alquilerProducto").find("select[name='id_cliente']").val();
    var id_producto = $("#create-alquilerProducto").find("select[name='id_producto']").val();
    var total = parseFloat(costo_alquiler)*parseFloat(cantidad);
    
    objeto={
        nombreCliente:nombreC,
        nombreProducto:nombreP,
        contador1:contador1,
        costo_alquiler:total,
        feha_fin:feha_fin,
        feha_inicio:feha_inicio,
        cantidad:cantidad,
        id_cliente:id_cliente,
        id_producto:id_producto
    }

    arreglo1.push(objeto);

    dibujarTabla1(arreglo1);
}

/*Dibujar tabla de alquileres añadidos*/
function dibujarTabla1(arreglo2){
    var rows = '';
    $.each( arreglo2, function( key,value ) {
        rows = rows + '<tr>';
        rows = rows + '<td>'+value.nombreCliente+'</td>';
        rows = rows + '<td>'+value.feha_inicio+'</td>';
        rows = rows + '<td>'+value.feha_fin+'</td>';
        rows = rows + '<td>'+value.nombreProducto+'</td>';
        rows = rows + '<td>'+value.cantidad+'</td>';
        rows = rows + '<td>'+value.costo_alquiler+'</td>';
        rows = rows + '<td><a href="#" class="btn btn-danger" onclick="deleteElement1('+value.contador1+')"><i class="fa fa-trash"></i></a></td>';     
        rows = rows + '</tr>';
    });
    $("#alquileresProducto").html(rows);
    contador1++;
}


var seleccionado1;
$( "#agregarProd" ).click(function () {
    var x = document.getElementById("mySelectPro").value;
    var y = document.getElementById("mySelectClie").value;
    var nombrePro = document.getElementById("mySelectPro").options[x].text;
    var nombreCli = document.getElementById("mySelectClie").options[y].text;
    cargarArrayPro(nombrePro,nombreCli);
});

/*Eliminar datos de la tabla alquileres*/
function deleteElement1(datos1){
    console.log(datos1);
    console.log(arreglo1);
    var a = 0;
    var tamano = arreglo1.length;
    while (tamano>a) {
        if (arreglo1[a]["contador1"]==datos1) {
            arreglo1.splice(a,1);
        }
        a++;
        
    }
    //console.log(arreglo1);
    dibujarTabla1(arreglo1);

}

/*Registrar informacion obetenidas de la tabla a la base de datos*/
function insertar1(datas1){
    var numData1 = datas1.length;
    var form_action = $("#create-alquilerProducto").find("form").attr("action");
    
    for (var i = 0; i < numData1; i++) {
        var costoAlquiler = datas1[i]["costo_alquiler"];
        var fechaInicion = datas1[i]["feha_inicio"];
        var fechaFin = datas1[i]["feha_fin"];
        var cantidades = datas1[i]["cantidad"];
        var idCliente = datas1[i]["id_cliente"];
        var idProducto = datas1[i]["id_producto"];
        
        $.ajax({
        dataType: 'json',
        type:'POST',
        url: form_action,
        data:{costo_producto:costoAlquiler, feha_inicio:fechaInicion, feha_fin:fechaFin, cantidad:cantidades, id_cliente:idCliente, id_producto:idProducto}
        }).done(function(data){
            $(".modal").modal('hide');
        });

        toastr.success('Alquiler de Producto Registrado satisfactoriamente.', 'Success Alert', {timeOut: 5000});
        getPageDataAlquiPro();
       actualizarStock1(idProducto,cantidades);
    }
}

$(".add-producto-submit").click(function(e){
    e.preventDefault();

    var arreglito1 = arreglo1;
    insertar1(arreglito1);
});


/*Actualizar Stock de Productos
  Despues de registrar un alquiler*/
var cantidadNueva1 = 0;
function actualizarStock1(numId, canti){
    var idProduc = numId;
    var cantti = canti;
     $.ajax({
        dataType: 'json',
        url: prod,
        data: {page:page}
    }).done(function(data){
        
        $.each( data.data, function( key, value ) {
            if (idProduc==value.id) {
                cantidadNueva1 = value.cantidad - cantti;
                $.ajax({
                    dataType: 'json',
                    type:'PUT',
                    url: prod+'/'+idProduc,
                    data:{cantidad:cantidadNueva1}
                }).done(function(data){
                    
                });
            }
        });
    });
}


/* Create new AlquilerProducto */
$(".alquilerProducto-submit").click(function(e){
    // alert("Hola que hace");
    e.preventDefault();
    var form_action = $("#create-alquilerProducto").find("form").attr("action");
    var costo_producto = $("#create-alquilerProducto").find("input[name='costo_producto']").val();
    var feha_inicio = $("#create-alquilerProducto").find("input[name='feha_inicio']").val();
    var feha_fin = $("#create-alquilerProducto").find("input[name='feha_fin']").val();
    var id_cliente = $("#create-alquilerProducto").find("select[name='id_cliente']").val();
    var id_producto = $("#create-alquilerProducto").find("select[name='id_producto']").val();
    var estado=0;
    $.ajax({
        dataType: 'json',
        type:'POST',
        url: form_action,
        data:{costo_producto:costo_producto, feha_inicio:feha_inicio, feha_fin:feha_fin, id_cliente:id_cliente, id_producto:id_producto}
    }).done(function(data){
        getPageDataAlquiPro();
        $(".modal").modal('hide');
        $("#create-alquilerProducto").find("input[name='costo_producto']").val(" ");
        $("#create-alquilerProducto").find("input[name='feha_inicio']").val(" ");
        $("#create-alquilerProducto").find("input[name='feha_fin']").val(" ");
        $("#create-alquilerProducto").find("select[name='id_cliente']").val(" ");
        $("#create-alquilerProducto").find("select[name='id_producto']").val(" ");

        toastr.success('Alquiler de Producto Creado satisfactoriamente.', 'Success Alert', {timeOut: 5000});
    });
});
/* Remove Alquiler de Producto */
$("body").on("click",".remove-alquilerProducto-item",function(){
    var id = $(this).parent("td").data('id');
    $("#delete-item").find("form").attr("action",alquiPro + '/' + id);
    $("#delete-item").find("input[name='id']").val(id);
});

$('.crud-submit-alquilerProducto-delete').click(function(e){

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
        toastr.success('Alquiler de Producto Eliminado corectamente.', 'Success Alert', {timeOut: 5000});
        getPageDataAlquiPro();
    });
});
/* Edit Post */
$("body").on("click",".edit-alquilerProducto-item",function(){
    var id = $(this).parent("td").data('id');
    var costo_producto = $(this).parent("td").prev("td").prev("td").prev("td").prev("td").prev("td").text();
    var feha_inicio = $(this).parent("td").prev("td").prev("td").prev("td").prev("td").text();
    var feha_fin = $(this).parent("td").prev("td").prev("td").prev("td").text();
    var id_cliente = $(this).parent("td").prev("td").prev("td").text();
    var id_producto = $(this).parent("td").prev("td").text();

    $("#edit-item").find("input[name='costo_producto']").val(costo_producto);
    $("#edit-item").find("input[name='feha_inicio']").val(feha_inicio);
    $("#edit-item").find("input[name='feha_fin']").val(feha_fin);
    $("#edit-item").find("select[name='id_cliente']").val(id_cliente);
    $("#edit-item").find("select[name='id_producto']").val(id_producto);
    $("#edit-item").find("form").attr("action",alquiPro + '/' + id);
});
/* Updated new Alquiler de Material */
$(".crud-submit-alquilerProducto-edit").click(function(e){
	
    e.preventDefault();
    var form_action = $("#edit-item").find("form").attr("action");
    var costo_producto = $("#edit-item").find("input[name='costo_producto']").val();
    var feha_inicio = $("#edit-item").find("input[name='feha_inicio']").val();
    var feha_fin = $("#edit-item").find("input[name='feha_fin']").val();
    var id_cliente = $("#edit-item").find("select[name='id_cliente']").val();
    var id_producto = $("#edit-item").find("select[name='id_producto']").val();

    $.ajax({
        dataType: 'json',
        type:'PUT',
        url: form_action,
        data:{costo_producto:costo_producto, feha_inicio:feha_inicio, feha_fin:feha_fin, id_cliente:id_cliente, id_producto:id_producto}
    }).done(function(data){
        getPageDataAlquiPro();
        $(".modal").modal('hide');
        $("#create-alquilerProducto").find("input[name='costo_producto']").val(" ");
        $("#create-alquilerProducto").find("input[name='feha_inicio']").val(" ");
        $("#create-alquilerProducto").find("input[name='feha_fin']").val(" ");
        $("#create-alquilerProducto").find("select[name='id_cliente']").val(" ");
        $("#create-alquilerProducto").find("select[name='id_producto']").val(" ");
        toastr.success('Alquiler Actualizado Correctamente.', 'Success Alert', {timeOut: 5000});
    });
});

/*Cargar costo del producto*/
function changeFunc(numero){
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
        $("#costoPro").text(costo);
    });
   
}
