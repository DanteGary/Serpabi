<div class="modal fade" id="edit-item" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span></button>
              <h4 class="modal-title" id="myModalLabel">Editar Venta</h4>
            </div>
            <div class="modal-body">
      
                  <form data-toggle="validator" action="/item-ajax/14" method="put">
                     
                    <div class="form-group">
                        <label class="control-label" for="costo_venta">Costo:</label>
                            <input type="double" name="costo_venta" class="form-control" data-error="costo_venta." required />
                        <div class="help-block with-errors"></div>
                    </div>
                     <div class="form-group">
                        <label class="control-label" for="fecha_venta">Fecha:</label>
                           <input type="date" name="fecha_venta" class="form-control" data-error="fecha_venta." required />
                        <div class="help-block with-errors"></div>
                     </div>
                     <div class="form-group">
                        <label class="control-label" for="cantidad">Cantidad:</label>
                           <input type="number" name="cantidad" class="form-control" data-error="cantidad." required />
                        <div class="help-block with-errors"></div>
                     </div>
                     <div class="form-group">
                           <label class="control-label" for="id_cliente">Cliente:</label>
                           <select class="form-control selectpicker " data-live-search=("true") name="id_cliente" data-error="selccione Material" required>
                             
                                 @foreach($clientes as $clientes)
                              <option value={{$clientes->id}}>{{$clientes->nombre}}</option>
                                 @endforeach
                           </select>
                           <div class="help-block with-errors"></div>
                        </div>
                        <div class="form-group">
                           <label class="control-label" for="id_producto">Producto:</label>
                           <select class="form-control selectpicker " data-live-search=("true") name="id_producto" data-error="selccione Material" required>
                             
                                 @foreach($productos as $producto)
                              <option value={{$producto->id}}>{{$producto->nombre}}</option>
                                 @endforeach
                           </select>
                           <div class="help-block with-errors"></div>
                        </div>
                     <div class="form-group">
                        <button type="submit" class="btn btn-success crud-submit-ventaProducto-edit">Guardar</button>
                     </div>
                  </form>
      
            </div>
          </div>
        </div>
      </div>