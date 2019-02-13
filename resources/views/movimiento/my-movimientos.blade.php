@extends('layouts.admin')
@section('contenido')
	<div class="">
    <h1>Movimientos <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#create-movimiento"><i class="fa fa-plus-square"></i></button></h1>
    <div class="row">
      
            <div class="col-xs-12">
              <div class="table-responsive">
                <table class="table table-striped table-bordered table-condensed table-hover">
                    <thead>
                      <th>Monto</th>
                      <th>Fecha</th>
                      <th>Motivo</th>
                      <th>Tipo</th>
                      <th>Cuenta</th>
                      <th>Opciones</th>
                    </thead>
                    <tbody id="movimiento" class="buscar">
                        
                    </tbody>
                </table>
                <ul id="pagination" class="pagination-sm"></ul>
                   @include('movimiento.create')
                   @include('movimiento.edit')
                   @include('movimiento.delete')
              </div>
            </div>
    </div>
</div>
@endsection