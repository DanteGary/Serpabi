<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="csrf-token" content="{{csrf_token()}}">
    <!-- evita cache -->
    <meta http-equiv="Expires" content="0">
    <meta http-equiv="Last-Modified" content="0">
    <meta http-equiv="Cache-Control" content="no-cache, mustrevalidate">
    <meta http-equiv="Pragma" content="no-cache">
  <!-- evita cache -->
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="stylesheet" href="{{asset('css/bootstrap.min.css')}}">
    <link rel="stylesheet" href="{{asset('css/font-awesome.css')}}">
    <link rel="stylesheet" type="text/css" href="{{asset('css/estyle-print.css')}}">
    <!-- Theme style -->
    <link rel="stylesheet" href="{{asset('css/AdminLTE.min.css')}}">
    <link rel="shortcut icon" href="{{ asset('favicon-96x96.png') }}" >
    <link rel="stylesheet" href="{{asset('css/bootstrap-select.min.css')}}">
    <!-- AdminLTE Skins. Choose a skin from the css/skins
         folder instead of downloading all of them to reduce the load. -->
    <link rel="stylesheet" href="{{asset('css/toastr.min.css')}}">
    <link rel="stylesheet" href="{{asset('css/_all-skins.min.css')}}">

    <?php date_default_timezone_set('America/La_Paz'); ?>
    <title>Serpabi</title>
    <style type="text/css">
      #map {
        height: 500px;
        width: 500px;
        border: 1px solid red;
      }
    </style>
</head>
<body class="hold-transition skin-blue sidebar-mini">

    <div class="wrapper">

        <header class="main-header">

          <!-- Logo -->
          <a href="{{url('/')}}" class="logo">
            <!-- mini logo for sidebar mini 50x50 pixels -->
            <span class="logo-mini"><b>SE</b>RPVI</span>
            <!-- logo for regular state and mobile devices -->
            <span class="logo-lg"><b>SERPABI</b></span>
          </a>
          <!-- Header Navbar: style can be found in header.less -->
          <nav class="navbar navbar-static-top" role="navigation">
            <!-- Sidebar toggle button-->
            <a href="#" class="sidebar-toggle" data-toggle="offcanvas" role="button">
              <span class="sr-only">Navegación</span>
            </a>
            <!-- Navbar Right Menu -->
            {{-- @if(Auth::check()) --}}
            <div class="navbar-custom-menu">
              @if (Auth::user()->id)
              <ul class="nav navbar-nav">
          <!-- Messages: style can be found in dropdown.less-->
                <li class="dropdown messages-menu stocker">
                  <a href="#" class="dropdown-toggle" data-toggle="dropdown">
                  <i class="fa fa-frown-o"></i>
                  <span class="label label-warning" id="alertStock"></span>
                </a>
                <ul class="dropdown-menu mstock">
               <li style="text-align: center;" class="header">  Stock en Alerta</li>
                <li>
                </li>
                </ul>
                </li>
                <!-- segundo alert de fecha -->
                <li class="dropdown messages-menu avence">
                  <a href="#" class="dropdown-toggle" data-toggle="dropdown">
                  <i class="fa fa-hourglass-end"></i>
                  <span class="label label-warning" id="alertVence"></span>
                </a>
                <ul class="dropdown-menu mvence">
               <li style="text-align: center;" class="header"> Cerca a Vencer</li>
                <li>
                </li>
                </ul>
                </li>
                <!-- vencidos y acabados-->
                <li class="dropdown messages-menu avence">
                  <a href="#" class="dropdown-toggle" data-toggle="dropdown">
                  <i class="fa fa-bell-o"></i>
                  <span class="label label-danger" id="alertVencido"></span>
                </a>
                <ul class="dropdown-menu mvencido">
               <li style="text-align: center;" class="header">  Vencidos</li>
                <li >
                </li>
                </ul>
                </li>
                <!-- vencidos y acabados-->
                <li class="dropdown messages-menu agotado">
                  <a href="#" class="dropdown-toggle" data-toggle="dropdown">
                  <i class="fa fa-bell-o"></i>
                  <span class="label label-danger" id="alertAgotados"></span>
                </a>
                <ul class="dropdown-menu magotado">
               <li style="text-align: center;" class="header">  Agotados</li>
                <li >
                </li>
                </ul>
                </li>
                        <a href="#" class="dropdown-toggle btn btn-primary" > 
                    {{-- <small class="bg-red">Usuario: {{ Auth::user()->name }}</small> --}}
                    {{-- <!--<span class="hidden-xs">{{Auth::user()->idRol }}</span>--> --}}
                        Usuario: {{ Auth::user()->name }}      
                      </a>
                      <a href="{{ route('logout') }}" class="btn btn-danger"
                      onclick="event.preventDefault();
                      document.getElementById('logout-form').submit();">
                      Cerrar Sesion
                    </a>
                    <form id="logout-form" action="{{ route('logout') }}" method="POST" style="display: none;">
                      {{ csrf_field() }}
                    </form>
                    @endif
            </div>
          </nav>
        </header>
        <!-- Left side column. contains the logo and sidebar -->
        <aside class="main-sidebar">
          <!-- sidebar: style can be found in sidebar.less -->
          <section class="sidebar">
            <!-- Sidebar user panel -->
            <!-- sidebar menu: : style can be found in sidebar.less -->
            <ul class="sidebar-menu">
                <li class="header"></li>
                @if (Auth::user()->id==1)
                <li class="treeview">
                  <a href="{{url('my-proveedores')}}">
                    <i class="fa fa-truck"></i>
                    <span>Proveedores</span>
                  </a>
                </li>

                <li class="treeview">
                  <a href="{{url('my-materialesInsumos')}}">
                    <i class="fa fa-leaf" aria-hidden="true"></i>
                    <span>Materiales de Insumos</span>
                  </a>
                </li>

                <li class="treeview">
                  <a href="{{url('my-clientes')}}">
                    <i class="fa fa-users" aria-hidden="true"></i>
                    <span>Agenda de Clientes</span>
                  </a>
                </li>

                 <li class="treeview">
                  <a href="{{url('my-productos')}}">
                    <i class="fa fa-cubes" aria-hidden="true"></i>
                    <span>Productos</span>
                  </a>
                </li>

                <!-- <li class="treeview">
                  <a href="{{url('mcargos')}}">
                    <i class="fa fa-shopping-basket" aria-hidden="true"></i>
                    <span>Cargos</span>
                  </a>
                </li> -->

                <!-- <li class="treeview">
                  <a href="{{url('mempleados')}}">
                    <i class="fa fa-shopping-basket" aria-hidden="true"></i>
                    <span>Empleados</span>
                  </a>
                </li> -->

                <!-- <li class="treeview">
                  <a href="{{url('my-ingresov')}}">
                    <i class="fa fa-shopping-basket" aria-hidden="true"></i>
                    <span>Ingresos de Venta</span>
                  </a>
                </li> -->

                <li class="treeview">
                  <a href="{{url('mmovilidades')}}">
                    <i class="fa fa-bus" aria-hidden="true"></i>
                    <span>Movilidades</span>
                  </a>
                </li>

                <li class="treeview">
                  <a href="#">
                    <i class="fa fa-cogs" aria-hidden="true"></i>
                    <span>Produccion</span>
                    <i class="fa fa-angle-left pull-right"></i>
                  </a>
                  <ul class="treeview-menu">
                    <li class="treeview">
                      <a href="{{url('mproducciones')}}">
                        <i class="fa fa-arrow-right" aria-hidden="true"></i>
                        <span>Tareas Diarias</span>
                      </a>
                    </li>
                  </ul>
                  <ul class="treeview-menu">
                    <li class="treeview">
                      <a href="{{url('my-proyectos')}}">
                        <i class="fa fa-arrow-right" aria-hidden="true"></i>
                        <span>Tareas Planificadas</span>
                      </a>
                    </li>
                  </ul>
                </li>

                <!-- <li class="treeview">
                  <a href="">
                    <i class="fa fa-shopping-basket" aria-hidden="true"></i>
                    <span>Tareas</span>
                  </a>
                </li> -->

                 <!-- <li class="treeview">
                  <a href="{{url('mubicaciones')}}">
                    <i class="fa fa-shopping-basket" aria-hidden="true"></i>
                    <span>Ubicaciones</span>
                  </a>
                </li> -->

                <!-- <li class="treeview">
                  <a href="{{url('my-Ventas')}}">
                    <i class="fa fa-money" aria-hidden="true"></i>
                    <span>Ventas</span>
                  </a>
                </li> -->

                <li class="treeview">
                  <a href="#">
                    <i class="fa fa-money" aria-hidden="true"></i>
                    <span>Ventas</span>
                     <i class="fa fa-angle-left pull-right"></i>
                  </a>
                  <ul class="treeview-menu">
                    <li class="treeview">
                      <a href="{{url('my-ventaInsumos')}}">
                        <i class="fa fa-arrow-right" aria-hidden="true"></i>
                        <span>Venta de Materiales Insumos</span>
                      </a>
                    </li>
                  </ul>
                  <ul class="treeview-menu">
                    <li class="treeview">
                      <a href="{{url('my-ventaProductos')}}">
                        <i class="fa fa-arrow-right" aria-hidden="true"></i>
                        <span>Venta de Productos</span>
                      </a>
                    </li>
                  </ul>
                </li>
                <li class="treeview">
                  <a href="{{url('my-prestamos')}}">
                    <i class="fa fa-arrow-circle-right" aria-hidden="true"></i>
                    <span>Prestamos</span>
                  </a>
                </li>

              <!--   <li class="treeview">
                  <a href="#">
                    <i class="fa fa-usd"></i>
                    <span>Alquileres</span>
                     <i class="fa fa-angle-left pull-right"></i>
                  </a>
                  <ul class="treeview-menu">
                    <li>
                      <a href="{{url('my-alquilerMateriales')}}">
                        <i class="fa fa-arrow-right"></i>
                        <span>Alquiler de Materiales</span>
                      </a>
                    </li>
                  </ul>
                  <ul class="treeview-menu">
                    <li>
                      <a href="{{url('my-alquilerProductos')}}">
                        <i class="fa fa-arrow-right"></i>
                        <span>Alquiler de Productos</span>
                      </a>
                    </li>
                  </ul>
                </li> -->

                 <li class="treeview">
                  <a href="{{url('my-compras')}}">
                    <i class="fa fa-cart-arrow-down" aria-hidden="true"></i>
                    <span>Compras</span>
                  </a>
                </li>

                <!-- <li class="treeview">
                  <a href="{{url('my-cuentas')}}">
                    <i class="fa fa-shopping-basket" aria-hidden="true"></i>
                    <span>Cuentas</span>
                  </a>
                </li> -->

                <!-- <li class="treeview">
                  <a href="{{url('my-divisas')}}">
                    <i class="fa fa-shopping-basket" aria-hidden="true"></i>
                    <span>Divisas</span>
                  </a>
                </li> -->

                <!-- <li class="treeview">
                  <a href="{{url('my-egresos')}}">
                    <i class="fa fa-shopping-basket" aria-hidden="true"></i>
                    <span>Egresos</span>
                  </a>
                </li> -->

                 <!-- <li class="treeview">
                  <a href="{{url('my-moras')}}">
                    <i class="fa fa-shopping-basket" aria-hidden="true"></i>
                    <span>Moras</span>
                  </a>
                </li> -->

                 <!-- <li class="treeview">
                  <a href="{{url('my-movimiento')}}">
                    <i class="fa fa-shopping-basket" aria-hidden="true"></i>
                    <span>Movimientos</span>
                  </a>
                </li> -->

                 <!-- <li class="treeview">
                  <a href="{{url('my-saldo')}}">
                    <i class="fa fa-shopping-basket" aria-hidden="true"></i>
                    <span>Saldos</span>
                  </a>
                </li> -->

                 <!-- <li class="treeview">
                  <a href="{{url('my-tipo')}}">
                    <i class="fa fa-shopping-basket" aria-hidden="true"></i>
                    <span>Tipos</span>
                  </a>
                </li> -->

                  <!-- <li class="treeview">
                  <a href="{{url('my-ubicacionCliente')}}">
                    <i class="fa fa-shopping-basket" aria-hidden="true"></i>
                    <span>Ubicacion de Clientes</span>
                  </a>
                </li> -->
                @endif
                @if(Auth::user()->id==1 || Auth::user()->id!=1)
                <!-- <li class="treeview">
                  <a href="{{url('allproductos')}}">
                    <i class="fa fa-search"></i>
                    <span>Buscar</span>
                  </a>
                </li> -->
                @endif
              </ul>
          </section>
        </aside>
        <div class="content-wrapper">
          <!-- Main content -->
          <section class="content">
            <div class="row">
              <div class="col-md-12">
                <div class="box">
                  <div class="box-header with-border">
                    <h3 class="box-title">SERPABI</h3>
                    <div class="box-tools pull-right">
                      <button class="btn btn-box-tool" data-widget="collapse"><i class="fa fa-minus"></i></button>
                      <button class="btn btn-box-tool" data-widget="remove"><i class="fa fa-times"></i></button>
                    </div>
                  </div>
                  <!-- /.box-header -->
                  <div class="box-body">
                        <div class="row">

                             @if(Request::path()!='home' && Request::path()!='/')
                             <div class="col-md-12">
                               <div class="input-group">
                                 <span style="background: #d2d6de;" class="input-group-addon">Buscar</span>
                                 <input id="filtrar" type="text" class="form-control" placeholder="Ingresa criterio de Busqueda...">
                                </div>
                            @endif
                              <div>
                                  @yield('contenido')
                              </div>

                             </div>
                          </div>
                            </div>
                        </div><!-- /.row -->
                  </div><!-- /.box-body -->
                </div><!-- /.box -->
              </div><!-- /.col -->
            </div><!-- /.row -->
        </section><!-- /.content -->
    </div><!-- /.content-wrapper -->
    <!--Fin-Contenido-->
    <footer class="main-footer">
      <div class="pull-right hidden-xs">
        <b>Version</b> 1.1.0
      </div>
      <strong>
      <?php $fecha=date('Y');
        echo "© ".$fecha." <a href='#'>MscSoft</a> All rights Reserved.";
       ?>
       </strong>
    </footer>

    <script >


        var url ="<?php echo route('proveedores.index'); ?>"
        var proye ="<?php echo route('proyectos.index'); ?>"
        var prod ="<?php echo route('productos.index'); ?>"
        var cargo ="<?php echo route('cargos.index'); ?>"
        var empl ="<?php echo route('empleados.index'); ?>"
        var ingrv ="<?php echo route('ingresosv.index'); ?>"
        var matIns ="<?php echo route('materialesInsumos.index'); ?>"
        var mov ="<?php echo route('movilidades.index'); ?>"
        var produ ="<?php echo route('producciones.index'); ?>"
        var tarea ="<?php echo route('tareas.index'); ?>"
        var ubi ="<?php echo route('ubicaciones.index'); ?>"
        var ven ="<?php echo route('ventas.index'); ?>"
        var venIns ="<?php echo route('ventasInsumos.index'); ?>"
        var venPro ="<?php echo route('ventasProductos.index'); ?>"
        var alqui ="<?php echo route('alquileres.index'); ?>"
        var alquiM ="<?php echo route('alquileresMateriales.index'); ?>"
        var alquiMC ="<?php echo route('alquileresMateriales.store'); ?>"
        var alquiPro ="<?php echo route('alquileresProductos.index'); ?>"
        var alquiP ="<?php echo route('alquileresProductos.store'); ?>"
        var clie ="<?php echo route('clientes.index'); ?>"
        var comp ="<?php echo route('compras.index'); ?>"
        var pres ="<?php echo route('prestamos.index'); ?>"
        var cue ="<?php echo route('cuentas.index'); ?>"
        var div ="<?php echo route('divisas.index'); ?>"
        var egr ="<?php echo route('egresos.index'); ?>"
        var mora ="<?php echo route('moras.index'); ?>"
        var movi ="<?php echo route('movimientos.index'); ?>"
        var tareas ="<?php echo url('tareasM'); ?>"
        var editTarea ="<?php echo url('tareasEdit'); ?>"
        var sal ="<?php echo route('saldos.index'); ?>"
        var tip ="<?php echo route('tipos.index'); ?>"
        var ubiCli ="<?php echo route('ubicacionesClientes.index'); ?>"
        var cliUbi ="<?php echo url('clientesUbicaciones'); ?>"

    </script>

    <script src="{{asset('js/jQuery-2.1.4.min.js')}}"></script>
    <script src="{{asset('js/Chart.min.js')}}"></script>
    <script src="{{asset('js/bootstrap.min.js')}}"></script>
    <script src="{{asset('js/bootstrap-select.min.js')}}"></script>
    <script src="{{asset('js/app.min.js')}}"></script>
    <script src="{{asset('js/proveedores-ajax.js')}}"></script> 
    <script src="{{asset('js/toaster.min.js')}}"></script>
    <script src="{{asset('js/validator.min.js')}}"></script>
    <script src="{{asset('js/jquery.dataTables.min.js')}}"></script>
    <script src="{{asset('js/productos-ajax.js')}}"></script>
    <script src="{{asset('js/cargos-ajax.js')}}"></script> 
    <script src="{{asset('js/empleados-ajax.js')}}"></script> 
    <script src="{{asset('js/ingresosv-ajax.js')}}"></script> 
    <script src="{{asset('js/materialesInsumos-ajax.js')}}"></script>
    <script src="{{asset('js/movilidades-ajax.js')}}"></script>
    <script src="{{asset('js/producciones-ajax.js')}}"></script>
    <script src="{{asset('js/tareas-ajax.js')}}"></script>
    <script src="{{asset('js/ubicaciones-ajax.js')}}"></script>
    <script src="{{asset('js/ventas-ajax.js')}}"></script>
    <script src="{{asset('js/alquileres-ajax.js')}}"></script>
    <script src="{{asset('js/alquileresMateriales-ajax.js')}}"></script>
    <script src="{{asset('js/ventasInsumos-ajax.js')}}"></script>
    <script src="{{asset('js/alquileresProductos-ajax.js')}}"></script>
    <script src="{{asset('js/ventasProductos-ajax.js')}}"></script>
    <script src="{{asset('js/compras-ajax.js')}}"></script>
    <script src="{{asset('js/prestamos-ajax.js')}}"></script>
    <script src="{{asset('js/cuentas-ajax.js')}}"></script>
    <script src="{{asset('js/divisas-ajax.js')}}"></script>
    <script src="{{asset('js/egresos-ajax.js')}}"></script>
    <script src="{{asset('js/moras-ajax.js')}}"></script>
    <script src="{{asset('js/movimientos-ajax.js')}}"></script>
    <script src="{{asset('js/saldos-ajax.js')}}"></script>
    <script src="{{asset('js/tipos-ajax.js')}}"></script>
    <script src="{{asset('js/tipos-ajax.js')}}"></script>
    <script src="{{asset('js/proyectos-ajax.js')}}"></script>
    <script src="{{asset('js/usuario-ajax.js')}}"></script> 
    <script src="{{asset('js/jquery.dataTables.min.js')}}"></script>
    <!-- <script type="text/javascript" src="http://maps.google.com/maps/api/js?sensor=false"></script> -->
    <!-- <script src="http://maps.google.com/maps/api/js"></script> -->
    <!-- <script src="{{asset('js/api-maps.js')}}"></script> -->
    <script src="{{asset('js/gmaps.js')}}"></script>
    <script type="text/javascript" src="//maps.googleapis.com/maps/api/js?key=AIzaSyBQZPKaTVEzPvYrdGPJglCWwho1He-GM5Q"></script>
    <script src="{{asset('js/clientes-ajax.js')}}"></script>
</body>
</html>