@extends('layouts.admin')
@section('contenido')
  <div class="">
    <h1>Material de Insumos<button type="button" class="btn btn-primary" data-toggle="modal" data-target="#create-materialInsumo"><i class="fa fa-plus-square"></i></button></h1>
    <div class="row">
      
            <div class="col-xs-12">
              <div class="table-responsive">
                <table class="table table-striped table-bordered table-condensed table-hover">
                    <thead>
                      <th>Nombre</th>
                      <th>Descripcion</th>
                      <th>Cantidad Total</th>
                      <th>Cantidad Minima</th>
                      <th>Costo Compra</th>
                      <th>Opciones</th>
                    </thead>
                    <tbody id="materialInsumo" class="buscar">
                    </tbody>
                </table>
                <ul id="pagination" class="pagination-sm"></ul>
                @include('materialInsumo.create')
                @include('materialInsumo.delete')
                @include('materialInsumo.edit')
                @include('materialInsumo.add')
              </div>
            </div>
    </div>
</div>
@endsection