@extends('layouts.admin')
@section('contenido')
  <div class="">
    <h1>Alquiler de Productos<button type="button" class="btn btn-primary" data-toggle="modal" data-target="#create-alquilerProducto"><i class="fa fa-plus-square"></i></button></h1>
    <div class="row">
      
            <div class="col-xs-12">
              <div class="table-responsive">
                <table class="table table-striped table-bordered table-condensed table-hover">
                    <thead>
                      <th>Costo</th>
                      <th>Fecha Inicio</th>
                      <th>Fecha Fin</th>
                      <th>Cliente</th>
                      <th>Producto</th>
                      <th>Opciones</th>
                    </thead>
                    <tbody id="alquilerProducto" class="buscar">
                        
                    </tbody>
                </table>
                <ul id="pagination" class="pagination-sm"></ul>
                @include('alquilerProducto.create')
                @include('alquilerProducto.delete')
                @include('alquilerProducto.edit')
                @include('cliente.create')
              </div>
            </div>
    </div>
</div>
@endsection
