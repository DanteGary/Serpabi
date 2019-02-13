@extends('layouts.admin')
@section('contenido')
	<div class="">
    <h1>Moras <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#create-mora"><i class="fa fa-plus-square"></i></button></h1>
    <div class="row">
      
            <div class="col-xs-12">
              <div class="table-responsive">
                <table class="table table-striped table-bordered table-condensed table-hover">
                    <thead>
                      <th>Motivo</th>
                      <th>Monto</th>
                      <th>Cliente</th>
                      <th>Opciones</th>
                    </thead>
                    <tbody id="mora" class="buscar">
                        
                    </tbody>
                </table>
                <ul id="pagination" class="pagination-sm"></ul>
                   @include('mora.create')
                   @include('mora.edit')
                   @include('mora.delete')
              </div>
            </div>
    </div>
</div>
@endsection