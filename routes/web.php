<?php

use app\Serpabi	;

Route::get('/', function () {
    return view('welcome');
});
Route::get('mempleados','EmpleadosController@myEmpleados');
Route::resource('empleados','EmpleadosController');

Route::get('mproducciones','ProduccionesController@myProduccionesM');
Route::resource('producciones','ProduccionesController');

Route::get('masigmateriales','AsigmaterialesController@my_asigmateriales');
Route::resource('asigmateriales','AsigmaterialesController');

Route::get('mcargos','CargosController@myCargo');
Route::resource('cargos','CargosController');

Route::get('mmovilidades','MovilidadesController@myMovilidadesM');
Route::resource('movilidades','MovilidadesController');

Route::get('tareasM/{id}','TareasController@tareas');

Route::get('tareasEdit/{idPro}/{idTar}','TareasController@mostrar');
Route::get('tareasP','TareasController@tareasp');
Route::resource('tareas','TareasController');

Route::get('mubicaciones','UbicacionesController@myUbicacionesN');
Route::resource('ubicaciones','UbicacionesController');
	
Route::view('/', 'welcome');

Route::get('my-proveedores', 'ProveedorController@myProveedor');
Route::resource('proveedores','ProveedorController');

Route::get('my-proyectos', 'ProyectoController@projects');
Route::get('Myproyectos', 'ProyectoController@myProyectos');
Route::resource('proyectos','ProyectoController');

Route::get('my-productos', 'ProductosController@myProductos');
Route::resource('productos','ProductosController');

Route::get('my-materialesInsumos', 'MaterialesInsumosController@materialesInsumos');
Route::resource('materialesInsumos','MaterialesInsumosController');

Route::get('my-Ventas', 'VentasController@myVentasM');
Route::resource('ventas','VentasController');

Route::get('my-alquileres','AlquilerController@myAlquileres');
Route::resource('alquileres','AlquilerController');

Route::get('my-alquilerMateriales','AlquilerMaterialController@myAlquileresMateriales');
Route::resource('alquileresMateriales','AlquilerMaterialController');

Route::get('my-alquilerProductos','AlquilerProductoController@myAlquileresProductos');
Route::resource('alquileresProductos','AlquilerProductoController');

Route::get('my-ventaInsumos','VentaInsumoController@myVentasInsumos');
Route::resource('ventasInsumos','VentaInsumoController');

Route::get('my-ventaProductos','VentaProductoController@myVentasProductos');
Route::resource('ventasProductos','VentaProductoController');

Route::get('my-asignarMateriales', 'AsigmaterialesController@myAsignarMaterial');
Route::resource('asignarMateriales','AsigmaterialesController');

Route::get('my-asignarEmpleados', 'AsignarEmpleadoController@myAsignarEmpleado');
Route::resource('asignarEmpleados','AsignarEmpleadoController');

Route::get('my-compras', 'CompraController@myCompras');
Route::resource('compras','CompraController');

Route::get('my-prestamos', 'PrestamoController@myPrestamos');
Route::resource('prestamos','PrestamoController');

Route::get('my-cuentas', 'CuentaController@myCuenta');
Route::resource('cuentas','CuentaController');

Route::get('my-divisas', 'DivisaController@myDivisa');
Route::resource('divisas','DivisaController');

Route::get('my-egresos', 'EgresoController@myEgresos');
Route::resource('egresos','EgresoController');

Route::get('my-moras', 'MoraController@myMoras');
Route::resource('moras','MoraController');

Route::get('my-movimiento', 'MovimientoController@myMovimientos');
Route::resource('movimientos','MovimientoController');

Route::get('my-saldo', 'SaldoController@mySaldos');
Route::resource('saldos','SaldoController');

Route::get('my-tipo', 'TipoController@myTipo');
Route::resource('tipos','TipoController');

Route::get('my-ubicacionCliente', 'UbicacionClienteController@myUbicacionClientes');
Route::resource('ubicacionesClientes','UbicacionClienteController');



Route::get('my-ingresov', 'IngresovController@myIngresosv');
Route::resource('ingresosv','IngresovController');

Route::get('my-clientes', 'ClienteController@myCliente');
Route::resource('clientes','ClienteController');


Route::get('clientesUbicaciones', 'ClienteController@mostrar');
Route::get('clientesMostrar', 'ClienteController@mostrar');


Route::get('mis-proveedores', 'ProveedorController@proveedores');

Route::get('mis-productos', 'ProductosController@productos');

Route::get('mis-materialesInsumos', 'MaterialesInsumosController@materialesInsumos');

Route::get('mis-ventas', 'VentasController@ventas');

Route::get('mis-ingresos', 'IngresovController@ingresosv');

Route::get('my-clientesmap', 'ClienteController@myMap');

Route::post('miJqueryAjax','ClienteController@myMap');


Auth::routes();

Route::get('/home', 'HomeController@index')->name('home');
