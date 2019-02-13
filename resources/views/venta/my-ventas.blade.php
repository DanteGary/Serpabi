@extends('layouts.admin')
@section('contenido')
  <div class="">
    <h1>Ventas<button type="button" class="btn btn-primary" data-toggle="modal" data-target="#create-venta"><i class="fa fa-plus-square"></i></button></h1>
    <div class="row">
      
            <div class="col-xs-12">
              <div class="table-responsive">
                <table class="table table-striped table-bordered table-condensed table-hover">
                    <thead>
                      <th>Fecha</th>
                      <th>Cantidad</th>
                      <th>Material</th>
                      <th>Producto</th>
                    </thead>
                    <tbody id="venta" class="buscar">
                        
                    </tbody>
                </table>
                <ul id="pagination" class="pagination-sm"></ul>
              </div>
            </div>
    </div>
</div>
@endsection