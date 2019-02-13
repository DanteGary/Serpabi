@extends('layouts.admin')
@section('contenido')
  <div class="">
    <h1>Cargos<button type="button" class="btn btn-primary" data-toggle="modal" data-target="#create-cargo"><i class="fa fa-plus-square"></i></button></h1>
    <div class="row">
      
            <div class="col-xs-12">
              <div class="table-responsive">
                <table class="table table-striped table-bordered table-condensed table-hover">
                    <thead>
                      <th>Nombre</th>
                      <th>Descripcion</th>
                    </thead>
                    <tbody id="cargo" class="buscar">
                        
                    </tbody>
                </table>
                <ul id="pagination" class="pagination-sm"></ul>
                
                @include('cargo.create')    
                @include('cargo.delete')
                @include('cargo.edit') 
              </div>
            </div>
    </div>
</div>
@endsection