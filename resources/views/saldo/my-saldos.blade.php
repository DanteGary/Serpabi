@extends('layouts.admin')
@section('contenido')
	<div class="">
    <h1>Saldos <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#create-saldo"><i class="fa fa-plus-square"></i></button></h1>
    <div class="row">
      
            <div class="col-xs-12">
              <div class="table-responsive">
                <table class="table table-striped table-bordered table-condensed table-hover">
                    <thead>
                      <th>Monto</th>
                      <th>Cuenta</th>
                      <th>Divisa</th>
                      <th>Opciones</th>
                    </thead>
                    <tbody id="saldo" class="buscar">
                        
                    </tbody>
                </table>
                <ul id="pagination" class="pagination-sm"></ul>
                   @include('saldo.create')
                   @include('saldo.edit')
                   @include('saldo.delete')
              </div>
            </div>
    </div>
</div>
@endsection