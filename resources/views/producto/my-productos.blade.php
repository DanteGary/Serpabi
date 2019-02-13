@extends('layouts.admin')
@section('contenido')
	<div class="">
    <h1>Productos <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#create-producto"><i class="fa fa-plus-square"></i></button></h1>
    <div class="row">
      
            <div class="col-xs-12">
              <div class="table-responsive">
                <table class="table table-striped table-bordered table-condensed table-hover">
                    <thead>
                      <th>Nombre</th>
                      <th>Descripcion</th>
                      <th>Cantidad</th>
                      <th>Precio</th>
                      <th>Opciones</th>
                    </thead>
                    <tbody id="producto" class="buscar">
                        
                    </tbody>
                </table>
                <ul id="pagination" class="pagination-sm"></ul>
                @include('producto.create')
                @include('producto.edit')
                @include('producto.delete')
                @include('producto.add')
              </div>
            </div>
    </div>
</div>
@endsection