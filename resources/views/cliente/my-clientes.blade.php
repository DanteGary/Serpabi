@extends('layouts.admin')
@section('contenido')
	<div class="">
    <div class="row">
      <div class="col-md-4 col-xs-4"></div>
      <div class="col-md-4 col-xs-4"><h1>Clientes</h1></div>
      <div class="col-md-4 col-xs-4"></div>
    </div>
    <!-- <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#create-cliente"><i class="fa fa-plus-square"></i> Crear Nuevo Cliente</button> -->
    
    <div class="row">
            <div class="col-xs-12">
              
            </div>
            <div class="col-md-12">
              <!-- Custom Tabs (Pulled to the right) -->
              <div class="nav-tabs-custom">
                <ul class="nav nav-tabs pull-right">
                  <li><a href="#tab_2-2" data-toggle="tab">Clientes sin Ubicacion</a></li>
                  <li class="active"><a href="#tab_1-1" data-toggle="tab">Clientes con Ubicacion</a></li>
                  <!-- <li><a href="#tab_3-2" data-toggle="tab">Tab 3</a></li> -->
                  <!-- <li class="dropdown">
                    <a class="dropdown-toggle" data-toggle="dropdown" href="#">
                      Dropdown <span class="caret"></span>
                    </a>
                    <ul class="dropdown-menu">
                      <li role="presentation"><a role="menuitem" tabindex="-1" href="#">Action</a></li>
                      <li role="presentation"><a role="menuitem" tabindex="-1" href="#">Another action</a></li>
                      <li role="presentation"><a role="menuitem" tabindex="-1" href="#">Something else here</a></li>
                      <li role="presentation" class="divider"></li>
                      <li role="presentation"><a role="menuitem" tabindex="-1" href="#">Separated link</a></li>
                    </ul>
                  </li> -->
                  <li class="pull-left header"><button type="button" class="btn btn-primary" data-toggle="modal" data-target="#create-cliente"><i class="fa fa-plus-square"></i> Crear Nuevo Cliente</button>
    </li>
                </ul>
                <div class="tab-content">
                  <div class="tab-pane active" id="tab_1-1">
                  <div class="table-responsive">
                  <table class="table table-striped table-bordered table-condensed table-hover">
                    <thead>
                      <th>Nombre</th>
                      <th>Telefono</th>
                      <th>NIT</th>
                      <th>Ultimo Precio</th>
                      <th>Ultima Venta</th>
                      <th>Estado</th>
                      <th>Opciones</th>
                    </thead>
                    <tbody id="clienteubi" class="buscar">
                        
                    </tbody>
                </table>
                <ul id="pagination" class="pagination-sm"></ul>

              </div>
                  </div>
                  <div class="tab-pane" id="tab_2-2">
                    <div class="table-responsive">
                  <table class="table table-striped table-bordered table-condensed table-hover">
                    <thead>
                      <th>Nombre</th>
                      <th>Telefono</th>
                      <th>NIT</th>
                      <th>Ultimo Precio</th>
                      <th>Ultima Venta</th>
                      <th>Estado</th>
                      <th>Opciones</th>
                    </thead>
                    <tbody id="cliente" class="buscar">
                        
                    </tbody>
                </table>
                <ul id="pagination" class="pagination-sm"></ul>
              </div>
                  </div>
                  <!-- <div class="tab-pane" id="tab_3-2">
                    Tab
                  </div> -->
                </div>
              </div>
                  @include('cliente.create')
                  @include('cliente.edit')
                  @include('cliente.delete')
                  @include('cliente.search')
                  @include('cliente.create-map')
                  @include('cliente.create-mapSN')
                  @include('cliente.edit-map')
                  @include('cliente.editClient-SNU')
            </div>
           
    </div>
    <div id="maps"></div>
</div>
@endsection