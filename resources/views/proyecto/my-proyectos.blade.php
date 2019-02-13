@extends('layouts.admin')
@section('contenido')
  <div class="">
    <h1>Proyectos</h1>
    <div class="btn-group">
      <button class="btn btn-info" type="button">Proyectos Asignados</button>
      <button class="btn btn-info" type="button"><a href="{{url('Myproyectos')}}">Proyectos No Asignados</a></button>
      <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#create-proyecto"><i class="fa fa-plus-square">Crear Nuevo Proyecto</i></button>
    </div>
    <div class="row">
      
            <div class="col-xs-12">
              <div class="table-responsive">
                <!-- <table class="table table-striped table-bordered table-condensed table-hover">
                    <thead>
                      <th>Nombre</th>
                      <th>Fecha Inicio</th>
                      <th>Fecha Fin</th>
                      <th>Avance</th>
                      <th>%</th>
                      <th>Estado</th>
                      <th>Opciones</th>
                    </thead>
                    <tbody id="proyecto" class="buscar">
                        
                    </tbody>
                </table> -->
                <ul id="pagination" class="pagination-sm"></ul>
                  @include('proyecto.create')    
                  @include('proyecto.delete')    
                  @include('proyecto.edit')    
              </div>
            </div>
    </div>
</div>
@endsection