<div class="modal fade" id="edit-item" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span></button>
              <h4 class="modal-title" id="myModalLabel">Editar Mora</h4>
            </div>
            <div class="modal-body">
      
                  <form data-toggle="validator" action="/item-ajax/14" method="put">
                     <div class="form-group">
                        <label class="control-label" for="motivo">Motivo:</label>
                           <input type="text" name="motivo" class="form-control" data-error="motivo." required />
                        <div class="help-block with-errors"></div>
                     </div>
                     <div class="form-group">
                        <label class="control-label" for="monto">Monto:</label>
                           <input type="number" name="monto" class="form-control" data-error="monto." required />
                        <div class="help-block with-errors"></div>
                     </div>
                     <div class="form-group">
                           <label class="control-label" for="id_cliente">Cliente:</label>
                           <select class="form-control selectpicker " data-live-search=("true") name="id_cliente" data-error="selccione Cargo" required>
                             
                                 @foreach($clientes as $cliente)
                              <option value={{$cliente->id}}>{{$cliente->nombre}}</option>
                                 @endforeach
                           </select>
                           <div class="help-block with-errors"></div>
                        </div>

                     <div class="form-group">
                        <button type="submit" class="btn btn-success crud-submit-mora-edit">Guardar</button>
                     </div>
                  </form>
      
            </div>
          </div>
        </div>
      </div>