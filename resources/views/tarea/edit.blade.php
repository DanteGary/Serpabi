<div class="modal fade" id="edit-item-tarea" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span></button>
              <h4 class="modal-title" id="myModalLabel">Editar Tarea</h4>
            </div>
            <div class="modal-body">
      
                  <form data-toggle="validator" action="/item-ajax/14" method="put">
                     <div class="form-group">
                        <label class="control-label" for="nombre">nombre:</label>
                           <input type="text" name="nombre" class="form-control" data-error="nombre." required />
                        <div class="help-block with-errors"></div>
                     </div>
                     <div class="form-group">
                        <label class="control-label" for="fecha_inicio">Fecha Inicio:</label>
                           <input type="date" name="fecha_inicio" class="form-control" data-error="Fecha Inicio." required />
                        <div class="help-block with-errors"></div>
                     </div>
                     <div class="form-group">
                        <label class="control-label" for="fecha_fin">Fecha Fin:</label>
                           <input type="date" name="fecha_fin" class="form-control" data-error="Fecha Fin." required />
                        <div class="help-block with-errors"></div>
                     </div>
                     <div class="form-group">
                        <label class="control-label" for="total">Total:</label>
                           <input type="number" name="total" class="form-control" data-error="Total de Productos." required />
                        <div class="help-block with-errors"></div>
                     </div>
                       <div class="form-group">
                        <label class="control-label" for="avance">Avance:</label>
                           <input type="number" name="avance" class="form-control" data-error="Avance de la Produccion." required />
                        <div class="help-block with-errors"></div>
                     </div>
                      <div class="form-group">
                           <label class="control-label" for="id_estado">Estado:</label>
                           <select class="form-control selectpicker " data-live-search=("true") name="id_estado" data-error="Selccione un Estado">
                             
                                 @foreach($tasks as $estado)
                              <option value={{$estado->id_estado}}>{{$estado->nombreEstado}}</option>
                                 @endforeach
                           </select>
                           <div class="help-block with-errors"></div>
                      </div>
                      <div class="form-group">
                           <label class="control-label" for="id_estado">Producto:</label>
                           <select class="form-control selectpicker " data-live-search=("true") name="id_producto" data-error="selccione Cargo">
                             
                                 @foreach($tasks as $producto)
                              <option value={{$producto->id_producto}}>{{$producto->nombreProducto}}</option>
                                 @endforeach
                           </select>
                           <div class="help-block with-errors"></div>
                      </div>
                      <div class="form-group">
                           <label class="control-label" for="id_proyecto">Proyecto:</label>
                           <select class="form-control selectpicker " data-live-search=("true") name="id_proyecto" data-error="selccione Cargo">
                             
                                 @foreach($tasks as $proyecto)
                              <option value={{$proyecto->idProyecto}}>{{$producto->nombreProyecto}}</option>
                                 @endforeach
                           </select>
                           <div class="help-block with-errors"></div>
                      </div>
                     <div class="form-group">
                        <button type="submit" class="btn btn-success crud-submit-tarea-edit">Guardar</button>
                     </div>
                  </form>
      
            </div>
          </div>
        </div>
      </div>