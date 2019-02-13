@extends('layouts.admin')
@section('contenido')
  <div class="">
    <div class="row">
      <div class="col-md-4 col-xs-4"></div>
      <div class="col-md-4 col-xs-4"><h1 class="text-light-blue">Empleados</h1></div>
      <div class="col-md-4 col-xs-4"></div>
    </div>
    <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#create-empleado"><i class="fa fa-plus-square">  Nuevo Empleado</i></button>
    <div class="row">
      
            <div class="col-xs-12">
              <div class="table-responsive">
                <table class="table table-striped table-bordered table-condensed table-hover">
                    <thead>
                      <th>Nombre</th>
                      <th>Telefono</th>
                      <th>CI/NIT</th>
                      <th>Estado</th>
                      <th>Cargo</th>
                      <th>Opciones</th>
                    </thead>
                    <tbody id="empleado" class="buscar">
                        
                    </tbody>
                </table>
                <ul id="pagination" class="pagination-sm"></ul>
                
                @include('empleado.create')  
                @include('empleado.edit')
                @include('empleado.delete')    
              </div>
            </div>
    </div>
</div>
@endsection