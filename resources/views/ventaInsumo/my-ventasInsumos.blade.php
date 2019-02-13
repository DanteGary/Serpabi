@extends('layouts.admin')
@section('contenido')
  <div class="">
    <h1>Ventas Material de Insumos<button type="button" class="btn btn-primary" data-toggle="modal" data-target="#create-ventaInsumo"><i class="fa fa-plus-square"></i></button></h1>
    <div class="row">
      
            <div class="col-xs-12">
              <div class="table-responsive">
                <table class="table table-striped table-bordered table-condensed table-hover">
                    <thead>
                      <th>Costo</th>
                      <th>Fecha</th>
                      <th>Cantidad</th>
                      <th>Cliente</th>
                      <th>Material</th>
                      <th>Opciones</th>
                    </thead>
                    <tbody id="ventaInsumo" class="buscar">
                        
                    </tbody>
                </table>
                <ul id="pagination" class="pagination-sm"></ul>
                @include('ventaInsumo.create')
                @include('ventaInsumo.delete')
                @include('ventaInsumo.edit')
              </div>
            </div>
    </div>
</div>
@endsection