@extends('layouts.admin')
@section('contenido')
  <div class="">
    <h1>Movilidades<button type="button" class="btn btn-primary" data-toggle="modal" data-target="#create-movilidad"><i class="fa fa-plus-square"></i></button></h1>
    <div class="row">
      
            <div class="col-xs-12">
              <div class="table-responsive">
                <table class="table table-striped table-bordered table-condensed table-hover">
                    <thead>
                      <th>Placa</th>
                      <th>Descripcion</th>
                      <th>Empleado</th>
                      <th>Opciones</th>
                    </thead>
                    <tbody id="movilidad" class="buscar">
                        
                    </tbody>
                </table>
                <ul id="pagination" class="pagination-sm"></ul>
                  @include('movilidad.create')
                  @include('movilidad.delete')
                  @include('movilidad.edit')
              </div>
            </div>
    </div>
</div>
@endsection