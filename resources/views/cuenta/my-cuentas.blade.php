@extends('layouts.admin')
@section('contenido')
	<div class="">
    <h1>Cuentas <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#create-cuenta"><i class="fa fa-plus-square"></i></button></h1>
    <div class="row">
      
            <div class="col-xs-12">
              <div class="table-responsive">
                <table class="table table-striped table-bordered table-condensed table-hover">
                    <thead>
                      <th>Nombre</th>
                      <th>Tipo</th>	
                      <th>Numero de Cuenta</th>
                      <th>Banco</th>
                      <th>Opciones</th>
                    </thead>
                    <tbody id="cuenta" class="buscar">
                        
                    </tbody>
                </table>
                <ul id="pagination" class="pagination-sm"></ul>
                   @include('cuenta.create')
                   @include('cuenta.edit')
                   @include('cuenta.delete')
              </div>
            </div>
    </div>
</div>
@endsection