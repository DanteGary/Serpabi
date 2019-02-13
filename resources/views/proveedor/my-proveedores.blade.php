@extends('layouts.admin')
@section('contenido')
	<div class="">
    <h1>Proveedores <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#create-proveedor"><i class="fa fa-plus-square"></i></button></h1>
    <div class="row">
      
            <div class="col-xs-12">
              <div class="table-responsive">
                <table class="table table-striped table-bordered table-condensed table-hover">
                    <thead>
                      <th>Nombre</th>
                      <th>NIT</th>
                      <th>Telefono</th>
                      <th>Opciones</th>
                    </thead>
                    <tbody id="proveedor" class="buscar">
                        
                    </tbody>
                </table>
                <ul id="pagination" class="pagination-sm"></ul>
                
                @include('proveedor.create')
                @include('proveedor.edit')      
                @include('proveedor.delete')      
              </div>
            </div>
    </div>
</div>
@endsection