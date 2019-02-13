@extends('layouts.admin')
@section('contenido')
  <div class="">
    <h1>Tareas<button type="button" class="btn btn-primary" onclick="cargarProductos()" data-toggle="modal" data-target="#create-tarea"><i class="fa fa-plus-square"></i></button></h1>
    <div class="row">
      
            <div class="col-xs-12">
              <div class="table-responsive">
                <table class="table table-striped table-bordered table-condensed table-hover">
                    <thead>
                      <th>Nombre</th>
                      <th>Fecha Inicio</th>
                      <th>Fecha Fin</th>
                      <th>Total</th>
                      <th>Avance</th>
                      <th>%</th>
                      <th>Estado</th>
                      <th>Producto</th> 
                      <th>Opciones</th> 
                    </thead>
                    <tbody id="tarea" class="buscar">
                      @php 
                        $numero = 0;
                        $porcentaje = 0;
                        $arreglo = array();
                        
                      @endphp
                        @foreach($tasks as $t)
                          @switch($t->id_estado)
                            @case(1)
                            @php 
                              $numero = ($t->avance*100)/$t->total;
                              $porcentaje = 0;
                            @endphp
                            <tr>
                              <td>{{$t->nombre}}</td>
                              <td>{{$t->fecha_inicio}}</td>
                              <td>{{$t->fecha_fin}}</td>
                              <td>{{$t->total}}</td>
                              <td>
                                <div class="progress progress-ls progress-striped active">
                                <div class="progress-bar progress-bar-success" style="width: @php echo $numero; @endphp%"></div>
                                </div>
                              </td>
                              <td><a><span class="badge bg-green">@php echo $numero; @endphp%


                              </span></a></td>
                              <td><span class="label label-success">{{$t->nombreEstado}}</span></td> 
                              <td>{{$t->nombreProducto}}</td> 
                              
                              <td>
                                <button data-toggle="modal" onclick="manageDataEditTare('{{$t->idProyecto}}','{{$t->id}}')" data-target="#edit-item-tarea" class="btn btn-success remove-tarea-item fa fa-edit"></button>

                                <button data-toggle="modal" onclick="recuperarID('{{$t->id}}','{{$t->nombre}}')" data-target="#delete-item-tarea" class="btn btn-danger remove-tarea-item fa fa-trash "></button>
                              </td> 
                            </tr>
                            @break
                            @case(2)
                            @php 
                              $numero = ($t->avance*100)/$t->total;
                              $porcentaje = 0;
                            @endphp
                            <tr>
                              <td>{{$t->nombre}}</td>
                              <td>{{$t->fecha_inicio}}</td>
                              <td>{{$t->fecha_fin}}</td>
                              <td>{{$t->total}}</td>
                              <td>
                                <div class="progress progress-ls progress-striped active">
                                <div class="progress-bar progress-bar-primary" style="width: @php echo $numero; @endphp%"></div>
                                </div>
                              </td>
                              <td><a><span class="badge bg-light-blue">@php echo $numero; @endphp%


                              </span></a></td>
                              <td><span class="label label-primary">{{$t->nombreEstado}}</span></td> 
                              <td>{{$t->nombreProducto}}</td> 
                              
                              <td>
                                <button data-toggle="modal" onclick="manageDataEditTare('{{$t->idProyecto}}','{{$t->id}}')" data-target="#edit-item-tarea" class="btn btn-success remove-tarea-item fa fa-edit"></button>

                                <button data-toggle="modal" onclick="recuperarID('{{$t->id}}','{{$t->nombre}}')" data-target="#delete-item-tarea" class="btn btn-danger remove-tarea-item fa fa-trash "></button>
                              </td> 
                            </tr>
                            @break
                            @case(3)
                            @php 
                              $numero = ($t->avance*100)/$t->total;
                              $porcentaje = 0;
                            @endphp
                            <tr>
                              <td>{{$t->nombre}}</td>
                              <td>{{$t->fecha_inicio}}</td>
                              <td>{{$t->fecha_fin}}</td>
                              <td>{{$t->total}}</td>
                              <td>
                                <div class="progress progress-ls progress-striped active">
                                <div class="progress-bar progress-bar-yellow" style="width: @php echo $numero; @endphp%"></div>
                                </div>
                              </td>
                              <td><a><span class="badge bg-yellow">@php echo $numero; @endphp%


                              </span></a></td>
                              <td><span class="label label-warning">{{$t->nombreEstado}}</span></td> 
                              <td>{{$t->nombreProducto}}</td> 
                              
                              <td>
                                <button data-toggle="modal" onclick="manageDataEditTare('{{$t->idProyecto}}','{{$t->id}}')" data-target="#edit-item-tarea" class="btn btn-success remove-tarea-item fa fa-edit"></button>

                                <button data-toggle="modal" onclick="recuperarID('{{$t->id}}','{{$t->nombre}}')" data-target="#delete-item-tarea" class="btn btn-danger remove-tarea-item fa fa-trash "></button>
                              </td> 
                            </tr>
                            @break
                            @case(4)
                            @php 
                              $numero = ($t->avance*100)/$t->total;
                              $porcentaje = 0;
                            @endphp
                            <tr>
                              <td>{{$t->nombre}}</td>
                              <td>{{$t->fecha_inicio}}</td>
                              <td>{{$t->fecha_fin}}</td>
                              <td>{{$t->total}}</td>
                              <td>
                                <div class="progress progress-ls progress-striped active">
                                <div class="progress-bar progress-bar-danger" style="width: @php echo $numero; @endphp%"></div>
                                </div>
                              </td>
                              <td><a><span class="badge bg-red">@php echo $numero; @endphp%


                              </span></a></td>
                              <td><span class="label label-danger">{{$t->nombreEstado}}</span></td> 
                              <td>{{$t->nombreProducto}}</td> 
                              
                              <td>
                                <button data-toggle="modal" onclick="manageDataEditTare('{{$t->idProyecto}}','{{$t->id}}')" data-target="#edit-item-tarea" class="btn btn-success remove-tarea-item fa fa-edit"></button>

                                <button data-toggle="modal" onclick="recuperarID('{{$t->id}}','{{$t->nombre}}')" data-target="#delete-item-tarea" class="btn btn-danger remove-tarea-item fa fa-trash "></button>
                              </td> 
                            </tr>
                            @break
                          @endswitch
                        @endforeach
                    </tbody>
                </table>

                <ul id="pagination" class="pagination-sm"></ul>
                @include("tarea.create")
                @include("tarea.delete")
                @include("tarea.edit")
              </div>
            </div>
    </div>
</div>
@endsection