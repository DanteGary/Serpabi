
var page = 1;
var current_page = 1;
var total_page = 0;
var is_ajax_fire = 0;
var id_cliente=1;
 var idglobal=1;
traer();
manageDataClie();
getPageDataUbiCli();
var link1=1;
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
function manageDataClie() {
    $.ajax({
        dataType: 'json',
        url: clie,
        data: {page:page}
    }).done(function(data){
    	manageRowClie(data.data);
    });
}
$.ajaxSetup({
    headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
});
/* Get Page Data*/
function getPageDataClie() {
	$.ajax({
    	dataType: 'json',
    	url: clie,
    	data: {page:page}
	}).done(function(data){
		manageRowClie(data.data);
	});
}

/*Obtener datos de clientes con ubicaciones*/
function getPageDataUbiCli(){
    $.ajax({
        dataType: 'json',
        url: cliUbi,
        data: {page:page}
    }).done(function(data){
        manageRowUbiC(data.data);
    });
}



/* Add new Cliente table row */
function manageRowClie(data) {
	var	rows = '';
	$.each( data, function( key, value ) {
        if (value.estado=="ACTIVO") {
    	  	rows = rows + '<tr>';
    	  	rows = rows + '<td>'+value.nombre+'</td>';
    	  	rows = rows + '<td>'+value.telefono+'</td>';
            rows = rows + '<td>'+value.nit+'</td>';
            rows = rows + '<td>'+value.precio_venta+'</td>';
            rows = rows + '<td>'+value.tiempo+'</td>';
            if (value.estado=="ACTIVO") {
                rows = rows + '<td><span class="label label-warning">'+value.estado+'</span></td>';
            }
            else{
                rows = rows + '<td><span class="label label-danger">'+value.estado+'</span></td>';
            }
    	  	rows = rows + '<td data-id="'+value.id+'">';
            rows = rows + '<button data-toggle="modal" data-target="#edit-itemSN" class="btn btn-success edit-cliente-itemSN fa fa-edit"></button> ';
            rows = rows + '<button data-toggle="modal" data-target="#delete-item" class="btn btn-danger remove-cliente-item fa fa-trash "></button> ';
            rows = rows + '<button id="callMap" onclick="functionMap('+value.id+')" data-toggle="modal" data-target="#add-itemMap" class="btn btn-default remove-clienteSN-item fa fa-map-marker ">+</button> ';
            // rows = rows + '<button type="button" id="boton" class="btn btn-default btn-xg fa fa-map-marker fa-1g" id="callModal">+</button>';
            rows = rows + '</td>';
    	  	rows = rows + '</tr>';
            // id_cliente=value.id;
            // ubicacion(value.id);
        }
	});
	$("#cliente").html(rows);
}

/*Dibujar los datos de clientes con ubicacion*/
function manageRowUbiC(data){
    var rows = '';
    $.each(data,function(key, value){
        if (value.estado=="ACTIVO") {
            rows = rows + '<tr>';
            rows = rows + '<td>'+value.nombre+'</td>';
            rows = rows + '<td>'+value.telefono+'</td>';
            rows = rows + '<td>'+value.nit+'</td>';
            rows = rows + '<td>'+value.precio_venta+'</td>';
            rows = rows + '<td>'+value.tiempo+'</td>';
            if (value.estado=="ACTIVO") {
                rows = rows + '<td><span class="label label-warning">'+value.estado+'</span></td>';
            }
            else{
                rows = rows + '<td><span class="label label-danger">'+value.estado+'</span></td>';
            }
            rows = rows + '<td data-id="'+value.id+'">';
            rows = rows + '<button data-toggle="modal" data-target="#edit-item" class="btn btn-success edit-cliente-item fa fa-edit"></button> ';
            rows = rows + '<button data-toggle="modal" data-target="#delete-item" class="btn btn-danger remove-cliente-item fa fa-trash "></button> ';
            rows = rows + '<button type="button" id="callModal" class="btn btn-info btn-xg fa fa-map-marker fa-1g" ></button>';
            rows = rows + '</td>';
            rows = rows + '</tr>';
            id_cliente=value.id;
        }
    });

    $("#clienteubi").html(rows);
}


/* Create new Cliente */
$(".cliente-submit").click(function(e){
    e.preventDefault();

    var form_action = $("#create-cliente").find("form").attr("action");
    var nombre = $("#create-cliente").find("input[name='nombre']").val();
    var telefono = $("#create-cliente").find("input[name='telefono']").val();
    var nit = $("#create-cliente").find("input[name='nit']").val();
    var estado = $("#create-cliente").find("span[name='estado']").text();
    var tiempo = $("#create-cliente").find("span[name='fecha']").text();
    var precio_venta = 0;
    $.ajax({
        dataType: 'json',
        type:'POST',
        url: form_action,
        data:{nombre:nombre, telefono:telefono, nit:nit, precio_venta:precio_venta, tiempo:tiempo, estado:estado}
    }).done(function(data){
        getPageDataUbiCli();
        getPageDataClie();
        $(".modal").modal('hide');
        $("#create-cliente").find("input[name='nombre']").val(" ");
        $("#create-cliente").find("input[name='telefono']").val(" ");
        $("#create-cliente").find("input[name='nit']").val(" ");
        $("#create-cliente").find("span[name='estado']").text();
        $("#create-cliente").find("span[name='fecha']").text();
        toastr.success('Cliente Creado satisfactoriamente.', 'Success Alert', {timeOut: 5000});

        $('#my-Modal').modal('show');
        mapa(data);
    });

});

var id = 1;
function traer(){
    
    $.ajax({
        dataType: 'json',
        url: clie,
        data: {page:page}
    }).done(function(data){
       $.each(data.data,function(key,value){
        id=parseInt(value.id)+1;
       });
        
        traerNumero(id);
        
    });

}

var nuevoNumero = 0;
function traerNumero(numero1){
    nuevoNumero = numero1;
    
}
/* Remove Cliente */
$("body").on("click",".remove-cliente-item",function(){
    var nombre = $(this).parent("td").prev("td").prev("td").prev("td").prev("td").prev("td").prev("td").text();
    var id = $(this).parent("td").data('id');
    $("#delete-item").find("form").attr("action",clie + '/' + id);
    $("#delete-item").find("input[name='nombre']").val(nombre);
    // console.log(id,nombre);
});

$('.crud-submit-cliente-delete').click(function(e){
    e.preventDefault();
    var form_action = $("#delete-item").find("form").attr("action");
    var estado1 = 'INACTIVO'
     $.ajax({
        dataType: 'json',
        type:'PUT',
        url: form_action,
        data:{estado:estado1}
    }).done(function(data){
        getPageDataClie();
        getPageDataUbiCli();
        $(".modal").modal('hide');
        toastr.success('Cliente Eliminado corectamente.', 'Success Alert', {timeOut: 5000});
    });
});


/* Edit Post */
$("body").on("click",".edit-cliente-item",'shown.bs.modal',function(){

    var id = $(this).parent("td").data('id');
    var nombre = $(this).parent("td").prev("td").prev("td").prev("td").prev("td").prev("td").prev("td").text();
    var telefono = $(this).parent("td").prev("td").prev("td").prev("td").prev("td").prev("td").text();
    var nit = $(this).parent("td").prev("td").prev("td").prev("td").prev("td").text();
    var precio_venta = $(this).parent("td").prev("td").prev("td").prev("td").text();
    var tiempo = $(this).parent("td").prev("td").prev("td").text();
    var estado = $(this).parent("td").prev("td").text();
  
    $("#edit-item").find("input[name='nombre']").val(nombre);
    $("#edit-item").find("input[name='telefono']").val(telefono);
    $("#edit-item").find("input[name='nit']").val(nit);
    $("#edit-item").find("input[name='precio_venta']").val(precio_venta);
    $("#edit-item").find("input[name='tiempo']").val(tiempo);
    $("#edit-item").find("select[name='estado']").val(estado);
    $("#edit-item").find("form").attr("action",clie + '/' + id);

 //    $.ajax({
 //        dataType: 'json',
 //        url: ubiCli,
 //        data: {page:page}
 //    }).done(function(data){
 //    //     var latitud = 0;
 //    //     var longitud = 0;
 //    //     var pos_original = new google.maps.LatLng(-17.3895000, -66.1568000);
	// // var options = {
	// // 	zoom: 15,
	// // 	center: pos_original,
	// // 	mapTypeId: google.maps.MapTypeId.SATELLITE,
	// // 	panControl: false,
 //  	// 	zoomControl: false,
 //  	// 	mapTypeControl: false,
 //  	// 	scaleControl: false,
 //  	// 	streetViewControl: true,
 //  	// 	overviewMapControl: false
	// // };

	// // var map = new google.maps.Map(document.getElementById('mapaEdit'), options); 
 //    // $.each( data.data, function( key, value ) {
 //    //     var lati = value.latitud;
 //    //     var lngi = value.longitud;
 //    //     if(1 == value.id_cliente){
 //    //         var marcador = new google.maps.Marker({
 //    //             position: new google.maps.LatLng(lati,lngi),
 //    //             map: map,
 //    //             draggable:true,
 //    //             title: "cadena",
 //    //             animation: google.maps.Animation.DROP
 //    //         });
 //    //      }
 //    //     });

 //    var latitud = 0;
 //    var longitud = 0;
 //    var idM = id;
 //    var map;
 //    var array_markers = new Array();
 //    map = new GMaps(
 //                {
 //                 el: '#mapaEdit',
 //                 lat:-17.393883,
 //                 lng:-66.2340882,
 //                 zoom: 12,
 //                 click:function (e) {
 //                  console.log(e.latLng.lat());
 //                }
 //    });
 //        $.each( data.data, function( key, value ) {
 //            // if(idM==value.id_cliente){
 //            //     latitud = value.latitud;
 //            //     longitud = value.longitud;
 //            //     map.addMarker({
 //            //         lat: latitud,
 //            //         lng: longitud,
 //            //         title: 'Bolivia',
 //            //         infoWindow: {
 //            //             content: '<p>'+value.latitud+'</p>'
 //            //         }
 //            //     });
 //            //     array_markers.push(latitud,longitud,value.id);
 //            // }
 //        });
 //        console.log(array_markers);

 //        google.maps.event.addListener(map, "click", function(evento) {
 //            var latitud = evento.latLng.lat();
 //            var longitud = evento.latLng.lng();
 //            map.addMarker({
 //                lat: latitud,
 //                lng: longitud,
 //            });
 //              console.log(latitud+" , "+longitud);
 //          });
 //    });

});

/* Edit Post of clients without ubication*/
$("body").on("click",".edit-cliente-itemSN",'shown.bs.modal',function(){

    var id = $(this).parent("td").data('id');
    var nombre = $(this).parent("td").prev("td").prev("td").prev("td").prev("td").prev("td").prev("td").text();
    var telefono = $(this).parent("td").prev("td").prev("td").prev("td").prev("td").prev("td").text();
    var nit = $(this).parent("td").prev("td").prev("td").prev("td").prev("td").text();
    var precio_venta = $(this).parent("td").prev("td").prev("td").prev("td").text();
    var tiempo = $(this).parent("td").prev("td").prev("td").text();
    var estado = $(this).parent("td").prev("td").text();
  
    $("#edit-itemSN").find("input[name='nombre']").val(nombre);
    $("#edit-itemSN").find("input[name='telefono']").val(telefono);
    $("#edit-itemSN").find("input[name='nit']").val(nit);
    $("#edit-itemSN").find("input[name='precio_venta']").val(precio_venta);
    $("#edit-itemSN").find("input[name='tiempo']").val(tiempo);
    $("#edit-itemSN").find("select[name='estado']").val(estado);
    $("#edit-itemSN").find("form").attr("action",clie + '/' + id);

});

/* Updated new Cliente */
$(".crud-submit-cliente-edit").click(function(e){

    e.preventDefault();
    var form_action = $("#edit-item").find("form").attr("action");
    var nombre = $("#edit-item").find("input[name='nombre']").val();
    var telefono = $("#edit-item").find("input[name='telefono']").val();
    var nit = $("#edit-item").find("input[name='nit']").val();
    var precio_venta = $("#edit-item").find("input[name='precio_venta']").val();
    var tiempo = $("#edit-item").find("input[name='tiempo']").val();
    var estado = $("#edit-item").find("select[name='estado']").val();

    // console.log(form_action,nombre,telefono,nit,precio_venta,tiempo,estado);
    $.ajax({
        dataType: 'json',
        type:'PUT',
        url: form_action,
        data:{nombre:nombre, telefono:telefono, nit:nit, precio_venta:precio_venta, tiempo:tiempo, estado:estado}
    }).done(function(data){
        getPageDataUbiCli();

        $(".modal").modal('hide');
        $("#create-cliente").find("input[name='nombre']").val(" ");
        $("#create-cliente").find("input[name='telefono']").val(" ");
        $("#create-cliente").find("input[name='nit']").val(" ");
        $("#create-cliente").find("input[name='precio_venta']").val(" ");
        $("#create-cliente").find("input[name='tiempo']").val(" ");
        $("#create-cliente").find("span[name='estado']").val(" ");
        // $('#my-ModalEdit').modal('show');

        toastr.success('Cliente Actualizado Correctamente.', 'Success Alert', {timeOut: 1000});
    });
// location.reload();
    // mapaEdit(link1);
});

/* Updated new Cliente without ubication */
$(".crud-submit-cliente-editSN").click(function(e){

    e.preventDefault();
    var form_action = $("#edit-itemSN").find("form").attr("action");
    var nombre = $("#edit-itemSN").find("input[name='nombre']").val();
    var telefono = $("#edit-itemSN").find("input[name='telefono']").val();
    var nit = $("#edit-itemSN").find("input[name='nit']").val();
    var precio_venta = $("#edit-itemSN").find("input[name='precio_venta']").val();
    var tiempo = $("#edit-itemSN").find("input[name='tiempo']").val();
    var estado = $("#edit-itemSN").find("select[name='estado']").val();

    console.log(form_action,nombre,telefono,nit,precio_venta,tiempo,estado);

    var link = form_action.split("/");
    link1 = link[4];
    $.ajax({
        dataType: 'json',
        type:'PUT',
        url: form_action,
        data:{nombre:nombre, telefono:telefono, nit:nit, precio_venta:precio_venta, tiempo:tiempo, estado:estado}
    }).done(function(data){
        getPageDataClie();

        $(".modal").modal('hide');
        $("#create-cliente").find("input[name='nombre']").val(" ");
        $("#create-cliente").find("input[name='telefono']").val(" ");
        $("#create-cliente").find("input[name='nit']").val(" ");
        $("#create-cliente").find("input[name='precio_venta']").val(" ");
        $("#create-cliente").find("input[name='tiempo']").val(" ");
        $("#create-cliente").find("span[name='estado']").val(" ");
        // $('#my-ModalEdit').modal('show');

        toastr.success('Cliente Actualizado Correctamente.', 'Success Alert', {timeOut: 1000});
    });
// location.reload();
    
});

$("body").on("click","#callModal",function(e){
     e.preventDefault();
     var idmpa = $(this).parent("td").data('id');

    $('#myModal').modal('show');


    $('#myModal').on('shown.bs.modal', function (e) {
    $.ajax({
        dataType: 'json',
        url: ubiCli,
        data: {page:page}
    }).done(function(data){
        var latitud = 0;
        var longitud = 0;
        map = new GMaps(
                    {
                     el: '#map',
                     lat:-17.393883,
                     lng:-66.2340882,
                     zoom: 12,
                     click:function (e) {
                      console.log(e.latLng.lat());
                    }
                  });

    $.each( data.data, function( key, value ) {
            if(idmpa==value.id_cliente){
                latitud = value.latitud;
                longitud = value.longitud;
                  map.addMarker({
                      lat: latitud,
                      lng: longitud,
                      title: 'Bolivia',
                      infoWindow: {
                          content: '<p>'+value.latitud+'</p>'
                        }
                 });
            }
        });
    });

});

});


function functionMap(id){
    var idclie = id;
    $('#my-Modal1').modal('show');
        mapa1(idclie);

}

/* Actualizar Ubicacion del Cliente S/N*/
function mapa1(idc){
    var idcl = idc;
    $("#idCliente").val(idcl);
    $('#my-Modal1').modal('show');
    $('#my-Modal1').on('shown.bs.modal', function (e) {
     var mapa1;

        mapa1 = new google.maps.Map(document.getElementById('mapa1'), {
          center: {lat: -17.393883, lng: -66.2340882},
          zoom: 15
        });

    google.maps.event.addListener(mapa1, "click", function(evento) {
          var latitud = evento.latLng.lat();
          var longitud = evento.latLng.lng();
          var coordenadas = evento.latLng.lat() + ", " + evento.latLng.lng();
          var marker = new google.maps.Marker({
               position: new google.maps.LatLng(latitud, longitud),
               map: mapa1,
            });

            $("#lati1").val(latitud);
            $("#longi1").val(longitud);
        });

     });
}

$("#btnMapa1").click(function(e){
    e.preventDefault();
    
    var latitud = $("#my-Modal1").find("input[name='lati1']").val();
    var longitud = $("#my-Modal1").find("input[name='longi1']").val();
    var idClientes = $("#my-Modal1").find("input[name='idCliente']").val();

    $.ajax({
        dataType: 'json',
        type:'POST',
        url: ubiCli,
        data:{latitud:latitud, longitud:longitud, id_cliente:idClientes}
    }).done(function(data){
        getPageDataClie();
        getPageDataUbiCli();
        $(".modal").modal('hide');
        $("#my-Modal1").find("input[name='lati']").val(" ");
        $("#my-Modal1").find("input[name='longi']").val(" ");
        $("#my-Modal1").find("input[name='id']").val(" ");
        toastr.success('Ubicacion del Cliente Creado satisfactoriamente.', 'Success Alert', {timeOut: 5000});
    });
});


/* Crear Ubicacion del Cliente*/
function mapa(idData){
    console.log(idData);
    $('#my-Modal').modal('show');
    $('#my-Modal').on('shown.bs.modal', function (e) {
     var mapa;

        mapa = new google.maps.Map(document.getElementById('mapa'), {
          center: {lat: -17.393883, lng: -66.2340882},
          zoom: 15
        });

    google.maps.event.addListener(mapa, "click", function(evento) {
          var latitud = evento.latLng.lat();
          var longitud = evento.latLng.lng();
          var coordenadas = evento.latLng.lat() + ", " + evento.latLng.lng();
          var marker = new google.maps.Marker({
               position: new google.maps.LatLng(latitud, longitud),
               map: mapa,
            });

            $("#lati").val(latitud);
            $("#longi").val(longitud);
            
        });

     });
    $("#mapID").val(idData);
}


$("#btnMapa").click(function(e){
    e.preventDefault();
    
    var latitud = $("#my-Modal").find("input[name='lati']").val();
    var longitud = $("#my-Modal").find("input[name='longi']").val();
    var mapaid = $("#my-Modal").find("input[name='mapID']").val();
    // console.log(latitud,longitud,mapaid);
    $.ajax({
        dataType: 'json',
        type:'POST',
        url: ubiCli,
        data:{latitud:latitud, longitud:longitud, id_cliente:mapaid}
    }).done(function(data){
        getPageDataUbiCli();
        getPageDataClie();
        $(".modal").modal('hide');
        $("#my-Modal").find("input[name='lati']").val(" ");
        $("#my-Modal").find("input[name='longi']").val(" ");
        toastr.success('Ubicacion del Cliente Creado satisfactoriamente.', 'Success Alert', {timeOut: 5000});
    });
});

/*Editar Ubicacion */
function mapaEdit(link1){

    $('#my-ModalEdit').on('shown.bs.modal', function (e) {
        
        var pos_original = new google.maps.LatLng(-17.3895000, -66.1568000);
	var options = {
		zoom: 15,
		center: pos_original,
		mapTypeId: google.maps.MapTypeId.SATELLITE,
		panControl: false,
  		zoomControl: false,
  		mapTypeControl: false,
  		scaleControl: false,
  		streetViewControl: true,
  		overviewMapControl: false
	};

	var map = new google.maps.Map(document.getElementById('mapaEdit'), options);

    /*Ubicacion del cliente a editar */
    $.ajax({
        dataType: 'json',
        url: ubiCli,
        data: {page:page}
    }).done(function(data){
        $.each( data.data, function( key, value ) {
            if(1==value.id_cliente){
                latitud = value.latitud;
                longitud = value.longitud;
                console.log(longitud+"->"+latitud);
            }

        });
    });

    var contador =0;

        google.maps.event.addListener(map, 'click', function(resultado){
            console.log("click "+contador+" en lat:"+resultado.latLng.lat()+" , lng:"+resultado.latLng.lng());
            gernera_marcador(resultado.latLng.lat(),resultado.latLng.lng(),contador);
            contador++;
        });

    var array_marcadores = new Array();

        function gernera_marcador(lat,lng,numero){
            var cadena="soy el marcador nº ";
            cadena+=numero;
            var marcador = new google.maps.Marker({
                    position: new google.maps.LatLng(lat,lng),
                    map: map,
                    draggable:true,
                    title: cadena,
                    animation: google.maps.Animation.DROP,
                    identificador: numero
                });
            //apilamos marcador
            array_marcadores.push(marcador);
            	//añadimos evento click en el marcador
            google.maps.event.addListener(marcador, 'click', function(evento){
                var latitud = evento.latLng.lat();
                var longitud = evento.latLng.lng();
                for(var a=0;a<array_marcadores.length;a++)
                    {
                        if(array_marcadores[a]['identificador'] == this.identificador)
                        {
                            array_marcadores[a].setMap(null);  //borramos el marcador del mapa
                            array_marcadores.splice(a, 1);	   //borramos el marcador de nuestro array
                        }
                    }

                });
        }

        google.maps.event.addListener(map, 'rightclick', function(){
        console.log('----------------------------------');
        for(var a=0;a<array_marcadores.length;a++)
            {
                console.log(
                    "posición array : "+a+", identificador :"+ array_marcadores[a]['identificador']+", lat:"+array_marcadores[a].position.lat()+", lon :"+array_marcadores[a].position.lng()
                    );
            }
        });
        function eliminaMarcadores(){
            console.log('Borrando todos los marcadores');
            for(a in array_marcadores)
            {
                array_marcadores[a].setMap(null);
            }
            array_marcadores = [];
        }

        document.getElementById('botonBorrar').addEventListener('click',eliminaMarcadores,false);

    });
}

