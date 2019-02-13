var page = 1;
var current_page = 1;
var total_page = 0;
var is_ajax_fire = 0;
manageDataComp();
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
function manageDataComp() {
    $.ajax({
        dataType: 'json',
        url: comp,
        data: {page:page}
    }).done(function(data){
        manageRowComp(data.data);
    });
}
$.ajaxSetup({
    headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
});
/* Get Page Data*/
function getPageDataComp() {
    $.ajax({
        dataType: 'json',
        url: comp,
        data: {page:page}
    }).done(function(data){
        
        manageRowComp(data.data);
    });
}
/* Add new Movimiento table row */
function manageRowComp(data) {
    var rows = '';
    $.each( data, function( key, value ) {
        rows = rows + '<tr>';
        rows = rows + '<td>'+value.fecha+'</td>';
        rows = rows + '<td>'+value.nombreMaterial+'</td>';
        rows = rows + '<td>'+value.descripcionMa+'</td>';
        rows = rows + '<td>'+value.cantidad+'</td>';
        rows = rows + '<td>'+value.costo_unitario+'</td>';
        rows = rows + '<td>'+value.costo_total+'</td>';
        rows = rows + '<td>'+value.nombreProveedor+'</td>';
        rows = rows + '<td data-id="'+value.id+'"data-id_material="'+value.id_material+'"data-id_proveedor="'+value.id_proveedor+'">';
        rows = rows + '<button data-toggle="modal" data-target="#edit-item" class="btn btn-success edit-compra-item fa fa-edit"></button> ';
        rows = rows + '<button data-toggle="modal" data-target="#delete-item" class="btn btn-danger remove-compra-item fa fa-trash "></button> ';
        rows = rows + '</td>';
        rows = rows + '</tr>';
    });
    $("#compra").html(rows);
}

/*Insertar datos del modal al array*/
var arregloCompras = [];
var contadorCompr = 0;
function cargarArrayCompraIn(nombreC,nombreCo){
    
    
    var objetoCom = {};
    var nombreIns = nombreC;
    var nombreProv = nombreCo;
    var id_material = $("#create-compra").find("select[name='id_material']").val();
    var cantidad = $("#create-compra").find("input[name='cantidad']").val();
    var costo_unitario = $("#create-compra").find("input[name='costo_unitario']").val();
    var fecha_compra = $("#create-compra").find("input[name='fecha_compra']").val();
    var id_proveedor = $("#create-compra").find("select[name='id_proveedor']").val();
    // var costo_compra = $("#create-compra").find("span[name='costo_compra']").text();
    var total = parseFloat(costo_unitario)*parseFloat(cantidad);
    
    objetoCom={
        nombreProveedor:nombreProv,
        nombreInsumo:nombreIns,
        contadorCompr:contadorCompr,
        total:total,
        fecha_compra:fecha_compra,
        cantidad:cantidad,
        costo_unitario:costo_unitario,
        id_proveedor:id_proveedor,
        id_material:id_material
    }
    
    arregloCompras.push(objetoCom);
    contadorCompr++;
    dibujarTablaCompraIn(arregloCompras);
}

/*Dibujar tabla de compras añadidos*/
function dibujarTablaCompraIn(arregloComs){
    var rows = '';
    var contadorC = 0;
    
    $.each( arregloComs, function( key,value ) {
        rows = rows + '<tr>';
        rows = rows + '<td>'+value.nombreProveedor+'</td>';
        rows = rows + '<td>'+value.fecha_compra+'</td>';
        rows = rows + '<td>'+value.nombreInsumo+'</td>';
        rows = rows + '<td>'+value.cantidad+'</td>';
        rows = rows + '<td>'+value.total+'</td>';
        rows = rows + '<td><a href="#" class="btn btn-danger" onclick="deleteElementCompra('+value.contadorCompr+')"><i class="fa fa-trash"></i></a></td>';     
        rows = rows + '</tr>';
        contadorC++;
    });
    $("#comprasInsumos").html(rows);
    
    
}


$( "#agregarCompra" ).click(function () {
    var x = document.getElementById("mySelectM").value;
    var y = document.getElementById("mySelectP").value;
    var comInsu = document.getElementById("mySelectM").options[x].text;
    var comClie = document.getElementById("mySelectP").options[y].text;
    cargarArrayCompraIn(comInsu,comClie);
});

/*Eliminar datos de la tabla de compras*/
function deleteElementCompra(datos1){
    
    var tamanoCo = arregloCompras.length;
    var a = 0;
    while (tamanoCo>a) {
        if (arregloCompras[a]["contadorCompr"]==datos1) {
            arregloCompras.splice(a,1);
        }
        a++;
        console.log(arregloCompras);
    dibujarTablaCompraIn(arregloCompras);
    }
    console.log('-->',arregloCompras,'<--');
}

/*Registrar informacion obetenidas de la tabla a la base de datos*/
function insertarCompra(datas1){
    var numDataCompr = datas1.length;
    var form_action = $("#create-compra").find("form").attr("action");
    
    for (var i = 0; i < numDataCompr; i++) {
        var fecha_compra = datas1[i]["fecha_compra"];
        var cantidades = datas1[i]["cantidad"];
        var costo_total = datas1[i]["total"];
        var costo_unitario = datas1[i]["costo_unitario"];
        var idMaterial = datas1[i]["id_material"];
        var idProveedor = datas1[i]["id_proveedor"];
        console.log(form_action, fecha_compra, cantidades, costo_total, costo_unitario, idMaterial, idProveedor);
        
        $.ajax({
        dataType: 'json',
        type:'POST',
        url: 'compras',
        data:{fecha:fecha_compra, cantidad:cantidades, costo_total:costo_total, costo_unitario:costo_unitario, id_material:idMaterial, id_proveedor:idProveedor}
        }).done(function(data){
            getPageDataComp();
            $(".modal").modal('hide');
        });

        
       actualizarStockInsumoC(idMaterial,cantidades);
    }
    toastr.success('Compra de Material Insumo Registrado satisfactoriamente.', 'Success Alert', {timeOut: 5000});
        
}

$(".addVentaInsumo-submit").click(function(e){
    e.preventDefault();

    var arreglitoCompra = arregloCompras;
    insertarCompra(arreglitoCompra);
});


/*Actualizar Stock de Material Insumo
  Despues de registrar una compra*/
var cantidadNuevaInsu = 0;
function actualizarStockInsumoC(numId, canti){
    var idInsumo = numId;
    var cantt = canti;
     $.ajax({
        dataType: 'json',
        url: matIns,
        data: {page:page}
    }).done(function(data){
        
        $.each( data.data, function( key, value ) {
            if (idInsumo==value.id) {
                cantidadNuevaInsu = value.cantidad_total + cantt;
                $.ajax({
                    dataType: 'json',
                    type:'PUT',
                    url: matIns+'/'+idInsumo,
                    data:{cantidad_total:cantidadNuevaInsu}
                }).done(function(data){
                    
                });
            }
        });
    });
}

/* Create new Compra */
$(".compra-submit").click(function(e){
    e.preventDefault();
    var form_action = $("#create-compra").find("form").attr("action");
    var fecha = $("#create-compra").find("input[name='fecha']").val();
    var cantidad = $("#create-compra").find("input[name='cantidad']").val();
    var id_material = $("#create-compra").find("select[name='id_material']").val();
    var id_proveedor = $("#create-compra").find("select[name='id_proveedor']").val();
    $.ajax({
        dataType: 'json',
        type:'POST',
        url: form_action,
        data:{fecha:fecha, cantidad:cantidad, id_material:id_material, id_proveedor:id_proveedor}
    }).done(function(data){
        getPageDataComp();
        $(".modal").modal('hide');
        $("#create-compra").find("input[name='fecha']").val(" ");
        $("#create-compra").find("input[name='cantidad']").val(" ");
        $("#create-compra").find("select[name='id_material']").val(" ");
        $("#create-compra").find("select[name='id_proveedor']").val(" ");
        toastr.success('Compra Creada satisfactoriamente.', 'Success Alert', {timeOut: 5000});
        cantidads(id_material,cantidad);
    });
    
}); 

function cantidads(numero,can){
    var num = numero; 
    var canti = parseFloat(can);
    $.ajax({
        dataType: 'json',
        url: matIns,
        data: {page:page}
    }).done(function(data){
        var valor=0;
        $.each( data.data, function( key, value ) {
            if (num == value.id) {
                valor = value.cantidad;
                alert(valor);
            } 
        });
        canti+=parseFloat(valor);
        $.ajax({
        dataType: 'json',
        type:'PUT',
        url: matIns+"/"+num,
        data:{cantidad:canti}
    }).done(function(data){
        getPageDataComp();
        });
    });
}



// var hoy = new Date();
//     var dd = hoy.getDate();
//     var mm = hoy.getMonth()+1;
//     var yyyy = hoy.getFullYear();
//     var date = yyyy +'-'+ mm +'-'+ dd;
//     alert(date);

/* Remove Cliente */
$("body").on("click",".remove-compra-item",function(){
    var fecha = $(this).parent("td").prev("td").prev("td").prev("td").prev("td").text();
    var id = $(this).parent("td").data('id');
    $("#delete-item").find("form").attr("action",comp + '/' + id);
    $("#delete-item").find("input[name='fecha']").val(fecha);
});

$('.crud-submit-compra-delete').click(function(e){
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
        toastr.success('Compra Eliminado corectamente.', 'Success Alert', {timeOut: 5000});
        getPageDataComp();
    });
});


/* Edit Post */
$("body").on("click",".edit-compra-item",function(){
    var id = $(this).parent("td").data('id');
    var fecha = $(this).parent("td").prev("td").prev("td").prev("td").prev("td").text();
    var cantidad = $(this).parent("td").prev("td").prev("td").prev("td").text();
    var id_material = $(this).parent("td").prev("td").prev("td").text();
    var id_proveedor = $(this).parent("td").prev("td").text();

    $("#edit-item").find("input[name='fecha']").val(fecha);
    $("#edit-item").find("input[name='cantidad']").val(cantidad);
    $("#edit-item").find("select[name='id_material']").val(id_material);
    $("#edit-item").find("select[name='id_proveedor']").val(id_proveedor);
    $("#edit-item").find("form").attr("action",comp + '/' + id);
});


/* Updated new Compra */
$(".crud-submit-compra-edit").click(function(e){
    e.preventDefault();
    var form_action = $("#edit-item").find("form").attr("action");
    var fecha = $("#edit-item").find("input[name='fecha']").val();
    var cantidad = $("#edit-item").find("input[name='cantidad']").val();
    var id_material = $("#edit-item").find("select[name='id_material']").val();
    var id_proveedor = $("#edit-item").find("select[name='id_proveedor']").val();

    $.ajax({
        dataType: 'json',
        type:'PUT',
        url: form_action,
        data:{fecha:fecha, cantidad:cantidad, id_material:id_material, id_proveedor:id_proveedor}
    }).done(function(data){
        getPageDataComp();
        $(".modal").modal('hide');
        $("#create-compra").find("input[name='fecha']").val(" ");
        $("#create-compra").find("input[name='cantidad']").val(" ");
        $("#create-compra").find("select[name='id_material']").val(" ");
        $("#create-compra").find("select[name='id_proveedor']").val(" ");
        toastr.success('Compra Actualizado Correctamente.', 'Success Alert', {timeOut: 1000});

    });
});



// /* Updated Stock of Material Insumo */
function stock(numero){
    alert(numero);
//     var stock = numero;
//         var canti = 0;
//         $.ajax({
//             dataType: 'json',
//             type:'PUT',
//             url: form_action,
//             data:{cantidad:stock}
//         }).done(function(data){

//             });
}
/*Desplegar el formulario de registrar insumos*/
$('#insumo').css('display','none');
var results = document.getElementById('btnHTML');
var resultado = document.getElementById('myDIV');
// console.log(resultado);
var btnHTML = '';
$("#agregarInsumo").click(function () {
     $('#insumo').show('slow');
     $('#boton').hide('slow');
     $('#recuperar').show('slow');
    //  btnHTML += '<label class="control-label" for="id_proveedor"></label>\
    //              <div class="form-group">\
    //              <button type="button" onClick="cerrar();" id="cerrar" class="btn btn-danger" data-toggle="modal" data-target=""><i class="fa fa-plus-square"></i>Cancelar</button>\
    //              </div>';
    // results.innerHTML = btnHTML;

});

function cerrar(){
    $('#insumo').hide('slow');
    $('#boton').show('slow');
    $('#recuperar').hide('slow');

    document.getElementById("miForm").reset();
}

/* Crear un material de insumo en caso de que no exista en los registros*/
$("#crearInsumo").click(function(e){
    e.preventDefault();
    var form_action = $("#create-compra").find("form").attr("action");
    var nombre = $("#create-compra").find("input[name='nombre']").val();
    var descripcion = $("#create-compra").find("input[name='descripcion']").val();
    var precio_compra = $("#create-compra").find("input[name='precio_compra']").val();
    var cantidad_total = 0;
    var cantidad_minima = 0;
    var estado = 1;
    console.log(cantidad_total,cantidad_minima,estado);
    $.ajax({
        dataType: 'json',
        type:'POST',
        url: 'materialesInsumos',
        data:{nombre:nombre, descripcion:descripcion, cantidad_total:cantidad_total, cantidad_minima:cantidad_minima, estado:estado, precio_compra:precio_compra}
    }).done(function(data){
        $('#insumo').hide('slow');
        $('#boton').show('slow');
        $('#recuperar').hide('slow');

        document.getElementById("miForm").reset();
        toastr.success('Material de Insumo Creado satisfactoriamente.', 'Success Alert', {timeOut: 5000});
    });
});


/*Desplegar el formulario de registrar proveedores*/
$('#proveedores').css('display','none');
var results = document.getElementById('btnHTMLProveedor');
$("#addProveedores").click(function () {
     $('#proveedores').show('slow');
     $('#botonProveedor').hide('slow');
     $('#recuperarProveedor').show('slow');
});

function cerrarProveedor(){
    $('#proveedores').hide('slow');
    $('#botonProveedor').show('slow');
    $('#recuperarProveedor').hide('slow');

    document.getElementById("miFormPro").reset();
}

/* Crear un proveedor en caso de que no exista en los registros*/
$("#crearProveedores").click(function(e){
    e.preventDefault();

    var form_action = $("#create-compra").find("form").attr("action");
    var nombre = $("#create-compra").find("input[name='nombreProveedor']").val();
    var nit = $("#create-compra").find("input[name='nit']").val();
    var telefono = $("#create-compra").find("input[name='telefono']").val();
    
    $.ajax({
        dataType: 'json',
        type:'POST',
        url: 'proveedores',
        data:{nombre:nombre, nit:nit, telefono:telefono}
    }).done(function(data){
        $('#proveedores').hide('slow');
        $('#botonProveedor').show('slow');
        $('#recuperarProveedor').hide('slow');

        document.getElementById("miFormPro").reset();
        toastr.success('Proveedor Creado satisfactoriamente.', 'Success Alert', {timeOut: 5000});
    });
});