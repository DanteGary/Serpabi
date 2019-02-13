@extends('layouts.admin')
@section('contenido')
  <div class="">
    <h1>Produccion<button type="button" class="btn btn-primary" data-toggle="modal" data-target="#create-produccion"><i class="fa fa-plus-square"></i></button></h1>
    <div class="row">
      
            <div class="col-xs-12">
              <div class="table-responsive">
                <table class="table table-striped table-bordered table-condensed table-hover">
                    <thead>
                      <th>Descripcion</th>
                      <th>Fecha</th>
                      <th>Producto</th>
                      <th>Cantidad</th>
                      <th>Empleado</th>
                      <th>Opciones</th>
                    </thead>
                    <tbody id="produccion" class="buscar">
                        
                    </tbody>
                </table>
                <ul id="pagination" class="pagination-sm"></ul>
                @include('produccion.create')
                @include('produccion.delete')
                @include('produccion.edit')
              </div>
            </div>
    </div>
</div>
@endsection