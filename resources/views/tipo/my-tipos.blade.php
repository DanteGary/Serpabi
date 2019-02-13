@extends('layouts.admin')
@section('contenido')
	<div class="">
    <h1>Tipos <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#create-tipo"><i class="fa fa-plus-square"></i></button></h1>
    <div class="row">
      
            <div class="col-xs-12">
              <div class="table-responsive">
                <table class="table table-striped table-bordered table-condensed table-hover">
                    <thead>
                      <th>Entrada</th>
                      <th>Salida</th>
                      <th>Opciones</th>
                    </thead>
                    <tbody id="tipo" class="buscar">
                        
                    </tbody>
                </table>
                <ul id="pagination" class="pagination-sm"></ul>
                   @include('tipo.create')
                   @include('tipo.edit')
                   @include('tipo.delete')
              </div>
            </div>
    </div>
</div>
@endsection