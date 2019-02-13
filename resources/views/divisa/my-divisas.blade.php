@extends('layouts.admin')
@section('contenido')
	<div class="">
    <h1>Divisas <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#create-divisa"><i class="fa fa-plus-square"></i></button></h1>
    <div class="row">
      
            <div class="col-xs-12">
              <div class="table-responsive">
                <table class="table table-striped table-bordered table-condensed table-hover">
                    <thead>
                      <th>Nombre Bolivianos</th>
                      <th>Simbolo Bolivianos</th>
                      <th>Opciones</th>
                    </thead>
                    <tbody id="divisa" class="buscar">
                        
                    </tbody>
                </table>
                <ul id="pagination" class="pagination-sm"></ul>
                   @include('divisa.create')
                   @include('divisa.edit')
                   @include('divisa.delete')
              </div>
            </div>
    </div>
</div>
@endsection