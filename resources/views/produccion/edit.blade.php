<div class="modal fade" id="edit-item" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span></button>
              <h4 class="modal-title" id="myModalLabel">Editar Produccion Diaria</h4>
            </div>
            <div class="modal-body">
      
                  <form data-toggle="validator" action="/item-ajax/14" method="put">
                     <div class="form-group">
                        <label class="control-label" for="descripcion">Descripcion:</label>
                           <input type="text" name="descripcion" class="form-control" data-error="Descripcion de la Produccion." required />
                        <div class="help-block with-errors"></div>
                     </div>
                     <div class="form-group">
                        <label class="control-label" for="fecha_produccion">Fecha:</label>
                           <input type="date" name="fecha_produccion" class="form-control" data-error="Fecha de Produccion." required />
                        <div class="help-block with-errors"></div>
                     </div>

                     <div class="form-group">
                           <label class="control-label" for="id_producto">Producto:</label>
                           <select class="form-control selectpicker " data-live-search=("true") name="id_producto" data-error="selccione Cargo" required>
                             
                                 @foreach($productos as $producto)
                              <option value={{$producto->id}}>{{$producto->nombre}}</option>
                                 @endforeach
                           </select>
                           <div class="help-block with-errors"></div>
                      </div>

                     <div class="form-group">
                        <label class="control-label" for="cantidad">Cantidad:</label>
                           <input type="number" name="cantidad" class="form-control" data-error="Cantidad de Productos." required />
                        <div class="help-block with-errors"></div>
                     </div>
                      <div class="form-group">
                           <label class="control-label" for="id_empleados">Empleado:</label>
                           <select class="form-control selectpicker " data-live-search=("true") name="id_empleados" data-error="selccione Cargo" required>
                             
                                 @foreach($empleados as $empleado)
                              <option value={{$empleado->id}}>{{$empleado->nombre}}</option>
                                 @endforeach
                           </select>
                           <div class="help-block with-errors"></div>
                      </div>
                     <div class="form-group">
                        <button type="submit" class="btn btn-success crud-submit-produccion-edit">Guardar</button>
                     </div>
                  </form>
      
            </div>
          </div>
        </div>
      </div>