@extends('layouts.admin')
@section('contenido')
	<div class="">
    <h1>Compras <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#create-compra"><i class="fa fa-plus-square"></i></button></h1>
    <div class="row">
      
            <div class="col-xs-12">
              <div class="table-responsive">
                <table class="table table-striped table-bordered table-condensed table-hover">
                    <thead>
                      <th>Fecha</th>
                      <th>Material</th>
                      <th>Descripcion</th>
                      <th>Cantidad</th>
                      <th>Costo Unitario</th>
                      <th>Costo Total</th>
                      <th>Proveedor</th>
                      <th>Opciones</th>
                    </thead>
                    <tbody id="compra" class="buscar">
                        
                    </tbody>
                </table>
                <ul id="pagination" class="pagination-sm"></ul>
                @include('compra.create')
                @include('compra.delete')
                @include('compra.edit')
              </div>
            </div>
    </div>
</div>
@endsection

