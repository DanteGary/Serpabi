<div class="modal fade" id="create-produccion" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
        <div class="modal-dialog modal-lg" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span></button>
              <h4 class="modal-title" id="myModalLabel">Registro de Produccion Diaria</h4>
            </div>
            <div class="modal-body">
      
                    <form data-toggle="validator" action="{{ route('producciones.store') }}" method="POST">
                            {{ csrf_field() }} 
                        <div class="row">
                          <div class="col-md-6 col-xs-12 col-lg-6">   
                            <div class="form-group">
                                  <label class="control-label" for="descripcion">Descripcion:</label>
                                    <textarea class="form-control" name="descripcion" placeholder="Ingresa una descripcion" rows="3" cols="35" data-error="Descripcion del Producto." required></textarea>
                                  <div class="help-block with-errors"></div>
                              </div>
                          </div>

                          <div class="col-md-6 col-xs-12 col-lg-6">
                            <div class="form-group">
                              <label class="control-label" for="fecha_produccion">Feha:</label>
                                 <input type="date" name="fecha_produccion" class="form-control" value="<?php echo date('Y-m-d');?>" data-error="Fecha de la Produccion." required />
                              <div class="help-block with-errors"></div>
                            </div>
                          </div>
                        </div>
              
                        <div class="row"> 
                          <div class="col-md-4 col-xs-4">
                            <div class="form-group">
                               <label class="control-label" for="id_producto">Producto:</label>
                               <select class="form-control selectpicker " data-live-search=("true") name="id_producto" data-error="selccione Empleado" required>
                                    <option>Seleccione...</option>>
                                     @foreach($productos as $productos)
                                  <option value={{$productos->id}}>{{$productos->nombre}}</option>
                                     @endforeach
                               </select>
                               <div class="help-block with-errors"></div>
                            </div>
                          </div>

                          <div class="col-md-4 col-xs-4">
                            <div class="form-group">
                              <label class="control-label" for="cantidad">Cantidad:</label>
                                 <input type="number" name="cantidad" class="form-control" data-error="Cantidad de Productos." required />
                              <div class="help-block with-errors"></div>
                            </div>
  					              </div>
                          
                          <div class="col-md-4 col-xs-4">
    					              <div class="form-group">
                               <label class="control-label" for="id_empleado">Empleado:</label>
                               <select class="form-control selectpicker " data-live-search=("true") name="id_empleado" data-error="selccione Empleado" required>
                                 
                                     @foreach($empleados as $empleado)
                                  <option value={{$empleado->id}}>{{$empleado->nombre}}</option>
                                     @endforeach
                               </select>
                               <div class="help-block with-errors"></div>
                            </div>
                          </div>
                      </div>
                      
                      <div class="row">
                        <div class="col-md-4 col-xs-4"></div>
                        <div class="col-md-4 col-xs-4"></div>
                        <div class="col-md-4 col-xs-4">
                          <div class="form-group">
                              <button type="submit" class="btn produccion-submit btn-success">Registrar</button>
                          </div>
                        </div>
                      </div>
                    </form>
            </div>
          </div>
        </div>
      </div>