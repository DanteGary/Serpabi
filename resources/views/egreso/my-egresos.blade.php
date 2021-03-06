@extends('layouts.admin')
@section('contenido')
	<div class="">
    <h1>Egresos <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#create-egreso"><i class="fa fa-plus-square"></i></button></h1>
    <div class="row">
      
            <div class="col-xs-12">
              <div class="table-responsive">
                <table class="table table-striped table-bordered table-condensed table-hover">
                    <thead>
                      <th>Motivo</th>
                      <th>Fecha</th>
                      <th>Compra</th>
                      <th>Opciones</th>
                    </thead>
                    <tbody id="egreso" class="buscar">
                        
                    </tbody>
                </table>
                <ul id="pagination" class="pagination-sm"></ul>
                   @include('egreso.create')
                   @include('egreso.edit')
                   @include('egreso.delete')
              </div>
            </div>
    </div>
</div>
@endsection