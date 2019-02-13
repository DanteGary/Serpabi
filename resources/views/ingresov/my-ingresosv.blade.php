@extends('layouts.admin')
@section('contenido')
  <div class="">
    <h1>Ingresos Venta<button type="button" class="btn btn-primary" data-toggle="modal" data-target="#create-ingresov"><i class="fa fa-plus-square"></i></button></h1>
    <div class="row">
      
            <div class="col-xs-12">
              <div class="table-responsive">
                <table class="table table-striped table-bordered table-condensed table-hover">
                    <thead>
                      <th>Motivo</th>
                      <th>Fecha</th>
                      <th>Venta</th>
                    </thead>
                    <tbody id="ingresov" class="buscar">
                        
                    </tbody>
                </table>
                <ul id="pagination" class="pagination-sm"></ul> 
                @include('ingresov.create') 
                @include('ingresov.delete')
                @include('ingresov.edit')
              </div>
            </div>
    </div>
</div>
@endsection