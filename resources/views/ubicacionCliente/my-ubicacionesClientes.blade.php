@extends('layouts.admin')
@section('contenido')
	<div class="">
    <h1>Ubicacion de Clientes <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#create-ubicacionCliente"><i class="fa fa-plus-square"></i></button></h1>
    <div class="row">
      
            <div class="col-xs-12">
              <div class="table-responsive">
                <table class="table table-striped table-bordered table-condensed table-hover">
                    <thead>
                      <th>Latitud</th>
                      <th>Longitud</th>
                      <th>Cliente</th>
                      <th>Opciones</th>
                    </thead>
                    <tbody id="ubicacionCliente" class="buscar">
                        
                    </tbody>
                </table>
                <ul id="pagination" class="pagination-sm"></ul>
                   @include('ubicacionCliente.create')
                   @include('ubicacionCliente.edit')
                   @include('ubicacionCliente.delete')
              </div>
            </div>
    </div>
</div>
@endsection