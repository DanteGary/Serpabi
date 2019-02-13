<div class="modal fade" id="create-tarea" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span></button>
              <h4 class="modal-title" id="myModalLabel">Registro Tareas Planificadas</h4>
            </div>
            <div class="modal-body">
            
                    <form data-toggle="validator" action="{{ route('tareas.store') }}" method="POST">
                            {{ csrf_field() }}
                        <div class="row">
                          <div class="col-md-4 col-xs-4">    
                            <div class="form-group">
                                <label class="control-label" for="nombre">Nombre:</label>
                                  <input type="text" name="nombre" class="form-control" data-error="Nombre de la Tarea." required />
                                <div class="help-block with-errors"></div>
                            </div>
                            <div class="form-group" >
                                  <input type="text" style="display: none" name="id_proyecto" class="form-control" value="<?php echo $id_proyecto; ?>"/>
                            </div>
                          </div>
                          <div class="col-md-4 col-xs-4">
                            <div class="form-group">
                              <label class="control-label" for="fecha_inicio">Fecha Inicio:</label>
                                 <input type="date" name="fecha_inicio" class="form-control" data-error="Fecha Inicio." required />
                              <div class="help-block with-errors"></div>
                            </div>
                          </div>
                          <div class="col-md-4 col-xs-4"> 
                            <div class="form-group">
                              <label class="control-label" for="fecha_fin">Fecha Fin:</label>
                                 <input type="date" name="fecha_fin" class="form-control" data-error="Fecha Fin." required />
                              <div class="help-block with-errors"></div>
                            </div>
                          </div>
                      </div>
                      <div class="row">
                        <div class="col-md-4 col-xs-4">
                          <div class="form-group">
                                <label class="control-label" for="id_producto">Producto:</label>
                                <select class="form-control selectpicker " data-live-search=("true") name="id_producto" data-error="selccione Cargo" >
                                      <option value="">Seleccione...</option>
                                         @foreach($product as $producto)
                                      <option value={{$producto->id}}>{{$producto->nombre}}</option>
                                         @endforeach
                                </select>
                                <div class="help-block with-errors"></div>
                          </div>
                        </div>
                        <div class="col-md-4 col-xs-4"> 
                          <div class="form-group">
                            <label class="control-label" for="total">Total:</label>
                               <input type="text" name="total" class="form-control" data-error="Total de Productos."/>
                            <div class="help-block with-errors"></div>
                          </div>
                        </div>
                        <div class="col-md-4 col-xs-4">
                              <div class="form-group">
                                    <label class="control-label" for="nombre_proyecto" >Proyecto:</label> <br>
                                    @php 
                                      $numero = 1;
                                      $contador = 0;
                                    @endphp
                                    @foreach($tasks as $nomPro)
                                      @if($contador < $numero)
                                    <span class="label label-warning" id="nomProyecto" name="nombre_proyecto" >{{$nomPro->nombreProyecto}}</span>
                                      @php 
                                      $contador++;
                                      
                                      @endphp
                                      @endif
                                      
                                    @endforeach
                                    <div class="help-block with-errors"></div>
                              </div>
                        </div>
                      </div>
                      <div class="row">
                        <div class="col-md-4 col-xs-4"></div>
                        <div class="col-md-4 col-xs-4"></div>
                        <div class="col-md-4 col-xs-4">
                          <div class="form-group">
                              <button type="submit" class="btn tareas-submit btn-success">Registrar</button>
                          </div>
                        </div>
                      </div>
                    </form>
            </div>
          </div>
        </div>
      </div>