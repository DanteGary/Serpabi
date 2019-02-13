@extends('layouts.admin')
@section('contenido')
  <div class="">
    <h1>Alquileres Materiales<button type="button" class="btn btn-primary" data-toggle="modal" data-target="#create-alquilerMaterial"><i class="fa fa-plus-square fa-2x"></i></button></h1>
    <div class="row">
      
            <div class="col-xs-12">
              <div class="table-responsive">
                <table class="table table-striped table-bordered table-condensed table-hover">
                    <thead>
                      <th>Costo</th>
                      <th>Fecha Inicio</th>
                      <th>Fecha Fin</th>
                      <th>Cantidad</th>
                      <th>Cliente</th>
                      <th>Material</th>
                      <th>Opciones</th>
                    </thead>
                    <tbody id="alquilerMaterial" class="buscar">
                        
                    </tbody>
                </table>
                <ul id="pagination" class="pagination-sm"></ul>
                @include('alquilerMaterial.create')
                @include('alquilerMaterial.delete') 
                @include('alquilerMaterial.edit')
                @include('cliente.create')
              </div>
            </div>
    </div>
</div>
@endsection