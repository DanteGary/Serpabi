@extends('layouts.admin')
@section('contenido')
  <div class="">
    <h1>Proyectos No Asignados</h1>
    <div class="row">
      
            <div class="col-xs-12">
              <div class="table-responsive">
                <table class="table table-striped table-bordered table-condensed table-hover">
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
                </table>
                <ul id="pagination" class="pagination-sm"></ul>   
                  @include('proyecto.delete')    
                  @include('proyecto.edit')    
              </div>
            </div>
    </div>
</div>
@endsection