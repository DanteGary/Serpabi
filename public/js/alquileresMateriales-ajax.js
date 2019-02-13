// var page = 1;
// var current_page = 1;
// var total_page = 0;
// var is_ajax_fire = 0;
// manageDataAlquiM();
// $(document).ready(function () {
 
//             (function ($) {
 
//                 $('#filtrar').keyup(function () {
 
//                     var rex = new RegExp($(this).val(), 'i');
//                     $('.buscar tr').hide();
//                     $('.buscar tr').filter(function () {
//                         return rex.test($(this).text());
//                     }).show();
 
//                 })
 
//             }(jQuery));
 
//         });
// /* manage data list */
// function manageDataAlquiM() {
//     $.ajax({
//         dataType: 'json',
//         url: alquiM,
//         data: {page:page}
//     }).done(function(data){
//     	manageRowAlquiM(data.data);
//     });
// }
// $.ajaxSetup({
//     headers: {
//             'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
//         }
// });
// /* Get Page Data*/
// function getPageDataAlquiM() {
// 	$.ajax({
//     	dataType: 'json',
//     	url: alquiM,
//     	data: {page:page}
// 	}).done(function(data){
        
// 		manageRowAlquiM(data.data);
// 	});
// }
// /* Add new Cargo table row */
// function manageRowAlquiM(data) {
// 	var	rows = '';
// 	$.each( data, function( key, value ) {
// 	  	rows = rows + '<tr>';
// 	  	rows = rows + '<td>'+value.costo_alquiler+'</td>';
//         rows = rows + '<td>'+value.feha_inicio+'</td>';
//         rows = rows + '<td>'+value.feha_fin+'</td>';
//         rows = rows + '<td>'+value.cantidad+'</td>';
//         rows = rows + '<td>'+value.nombrecli+'</td>';
//         rows = rows + '<td>'+value.nombreMatInsu+'</td>';
// 	  	rows = rows + '<td data-id="'+value.id+'"data-id_cliente="'+value.id_cliente+'"data-id_material="'+value.id_material+'">';
//         rows = rows + '<button data-toggle="modal" data-target="#edit-item" class="btn btn-success edit-alquilerMaterial-item fa fa-edit"></button> ';
//         rows = rows + '<button data-toggle="modal" data-target="#delete-item" class="btn btn-danger remove-alquilerMaterial-item fa fa-trash "></button> ';
//         rows = rows + '</td>';
// 	  	rows = rows + '</tr>';
// 	});
// 	$("#alquilerMaterial").html(rows);
// }



// /* Cargar datos del modal al array */
// var arreglo = [];
// var contador = 0;
// function cargarArray(nombre,nombre1){
    
    
//     var objeto = {};
//     var nombreM = nombre;
//     var nombreC = nombre1;
//     var costo_alquiler = $("#create-alquilerMaterial").find("span[name='costo_alquiler']").text();
//     var feha_inicio = $("#create-alquilerMaterial").find("input[name='feha_inicio']").val();
//     var feha_fin = $("#create-alquilerMaterial").find("input[name='feha_fin']").val();
//     var cantidad = $("#create-alquilerMaterial").find("input[name='cantidad']").val();
//     var id_cliente = $("#create-alquilerMaterial").find("select[name='id_cliente']").val();
//     var id_material = $("#create-alquilerMaterial").find("select[name='id_material']").val();
//     var total = parseFloat(costo_alquiler)*parseFloat(cantidad);
    
//     objeto={
//         nombreCliente:nombreC,
//         nombreMaterial:nombreM,
//         contador:contador,
//         costo_alquiler:total,
//         feha_fin:feha_fin,
//         feha_inicio:feha_inicio,
//         cantidad:cantidad,
//         id_cliente:id_cliente,
//         id_material:id_material
//     }

//     arreglo.push(objeto);

//     dibujarTabla(arreglo);
// }

// /*Dibujar tabla de alquileres añadidos*/
// function dibujarTabla(arreglo1){
//     var rows = '';
//     $.each( arreglo1, function( key,value ) {
//         rows = rows + '<tr>';
//         rows = rows + '<td>'+value.nombreCliente+'</td>';
//         rows = rows + '<td>'+value.feha_inicio+'</td>';
//         rows = rows + '<td>'+value.feha_fin+'</td>';
//         rows = rows + '<td>'+value.nombreMaterial+'</td>';
//         rows = rows + '<td>'+value.cantidad+'</td>';
//         rows = rows + '<td>'+value.costo_alquiler+'</td>';
//         rows = rows + '<td><a href="#" class="btn btn-danger" onclick="deleteElement('+value.contador+')"><i class="fa fa-trash"></i></a></td>';     
//         rows = rows + '</tr>';
//     });
//     $("#alqui").html(rows);
//     contador++;
// }

// var seleccionado;
// $( "#agregar" ).click(function () {
//     var x = document.getElementById("mySelect").value;
//     var y = document.getElementById("mySelectCli").value;
//     var nombreMa = document.getElementById("mySelect").options[x].text;
//     var nombreCl = document.getElementById("mySelectCli").options[y].text;
//     cargarArray(nombreMa,nombreCl);
// });


// /*Eliminar datos de la tabla alquileres*/
// function deleteElement(datos){
//     console.log(datos);

//     var a = 0;
//     var tamano = arreglo.length;
//     while (tamano>a) {
//         if (arreglo[a]["contador"]==datos) {
//             arreglo.splice(a,1);
//         }
//         a++;
        
//     }
//     dibujarTabla(arreglo);
// }

// /*Registrar informacion obetenidas de la tabla a la base de datos*/
// function insertar(datas){
//     var numData = datas.length;
//     var form_action = $("#create-alquilerMaterial").find("form").attr("action");
    
//     for (var i = 0; i < numData; i++) {
//         var costoAlquiler = datas[i]["costo_alquiler"];
//         var fechaInicion = datas[i]["feha_inicio"];
//         var fechaFin = datas[i]["feha_fin"];
//         var cantidades = datas[i]["cantidad"];
//         var idCliente = datas[i]["id_cliente"];
//         var idMaterial = datas[i]["id_material"];
        
//         $.ajax({
//         dataType: 'json',
//         type:'POST',
//         url: form_action,
//         data:{costo_alquiler:costoAlquiler, feha_inicio:fechaInicion, feha_fin:fechaFin, cantidad:cantidades, id_cliente:idCliente, id_material:idMaterial}
//         }).done(function(data){
//             $(".modal").modal('hide');
//         });

//         toastr.success('Alquiler de Material Registrado satisfactoriamente.', 'Success Alert', {timeOut: 5000});
//         getPageDataAlquiM();
//        actualizarStock(idMaterial,cantidades);
//     }
// }

// /*Actualizar Stock de Material Insumos
//   Despues de registrar un alquiler*/
// var cantidadNueva = 0;
// function actualizarStock(numId, canti){
//     var idMate = numId;
//     var cantti = canti;
//      $.ajax({
//         dataType: 'json',
//         url: matIns,
//         data: {page:page}
//     }).done(function(data){
        
//         $.each( data.data, function( key, value ) {
//             if (idMate==value.id) {
//                 cantidadNueva = value.cantidad - cantti;
//                 $.ajax({
//                     dataType: 'json',
//                     type:'PUT',
//                     url: matIns+'/'+idMate,
//                     data:{cantidad:cantidadNueva}
//                 }).done(function(data){
                    
//                 });
//             }
//         });
//     });
// }


// /* Create new AlquilerMaterial */
// $(".add-submit").click(function(e){
//     e.preventDefault();

//     var arreglito = arreglo;
//     insertar(arreglito);
// });

// /* Remove Alquiler de Material */
// $("body").on("click",".remove-alquilerMaterial-item",function(){
//     var id = $(this).parent("td").data('id');
//     $("#delete-item").find("form").attr("action",alquiM + '/' + id);
//     $("#delete-item").find("input[name='id']").val(id);
// });

// $('.crud-submit-alquilerMaterial-delete').click(function(e){

//     e.preventDefault();
//     // var c_obj = $(this).parents("tr");
//     var form_action = $("#delete-item").find("form").attr("action");
//     $.ajax({
//         dataType: 'json',
//         type:'delete',
//         url: form_action,
//     }).done(function(data){
//         $(".modal").modal('hide');
//         // c_obj.remove();
//         toastr.success('Alquiler Eliminado corectamente.', 'Success Alert', {timeOut: 5000});
//         getPageDataAlquiM();
//     });
// });
// /* Edit Post */
// $("body").on("click",".edit-alquilerMaterial-item",function(){
//     var id = $(this).parent("td").data('id');
//     var costo_alquiler = $(this).parent("td").prev("td").prev("td").prev("td").prev("td").prev("td").prev("td").text();
//     var feha_inicio = $(this).parent("td").prev("td").prev("td").prev("td").prev("td").prev("td").text();
//     var feha_fin = $(this).parent("td").prev("td").prev("td").prev("td").prev("td").text();
//     var cantidad = $(this).parent("td").prev("td").prev("td").prev("td").text();
//     var id_cliente = $(this).parent("td").prev("td").prev("td").text();
//     var id_material = $(this).parent("td").prev("td").text();

//     $("#edit-item").find("input[name='costo_alquiler']").val(costo_alquiler);
//     $("#edit-item").find("input[name='feha_inicio']").val(feha_inicio);
//     $("#edit-item").find("input[name='feha_fin']").val(feha_fin);
//     $("#edit-item").find("input[name='cantidad']").val(cantidad);
//     $("#edit-item").find("select[name='id_cliente']").val(id_cliente);
//     $("#edit-item").find("select[name='id_material']").val(id_material);
//     $("#edit-item").find("form").attr("action",alquiM + '/' + id);
// });
// /* Updated new Alquiler de Material */
// $(".crud-submit-alquilerMaterial-edit").click(function(e){
//     e.preventDefault();
//     var form_action = $("#edit-item").find("form").attr("action");
//     var costo_alquiler = $("#edit-item").find("input[name='costo_alquiler']").val();
//     var feha_inicio = $("#edit-item").find("input[name='feha_inicio']").val();
//     var feha_fin = $("#edit-item").find("input[name='feha_fin']").val();
//     var cantidad = $("#edit-item").find("input[name='cantidad']").val();
//     var id_cliente = $("#edit-item").find("select[name='id_cliente']").val();
//     var id_material = $("#edit-item").find("select[name='id_material']").val();

//     $.ajax({
//         dataType: 'json',
//         type:'PUT',
//         url: form_action,
//         data:{costo_alquiler:costo_alquiler, feha_inicio:feha_inicio, feha_fin:feha_fin, cantidad:cantidad, id_cliente:id_cliente, id_material:id_material}
//     }).done(function(data){
//         getPageDataAlquiM();
//         $(".modal").modal('hide');
//         $("#create-alquilerMaterial").find("input[name='costo_alquiler']").val(" ");
//         $("#create-alquilerMaterial").find("input[name='feha_inicio']").val(" ");
//         $("#create-alquilerMaterial").find("input[name='feha_fin']").val(" ");
//         $("#create-alquilerMaterial").find("input[name='cantidad']").val(" ");
//         $("#create-alquilerMaterial").find("select[name='id_cliente']").val(" ");
//         $("#create-alquilerMaterial").find("select[name='id_material']").val(" ");
//         toastr.success('Alquiler Actualizado Correctamente.', 'Success Alert', {timeOut: 5000});
//     });
// });


// /*Cargar costo del material insumo*/
// $("body").on("click",".form-control",function(){
//     var x = document.getElementById("mySelect").value;
//     $.ajax({
//         dataType: 'json',
//         url: matIns,
//         data: {page:page}
//     }).done(function(data){
//         var costo = 0;
//         $.each( data.data, function( key, value ) {
//             if (x==value.id) {
//                 costo=value.costov;
//             }
//         });
//         $("#costo").text(costo);
//     });
//     // var y = document.getElementById("mySelect").options[x].text;
    
// });
