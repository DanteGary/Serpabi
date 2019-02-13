<div class="modal fade" id="edit-item" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span></button>
              <h4 class="modal-title" id="myModalLabel">Editar Egreso</h4>
            </div>
            <div class="modal-body">
      
                  <form data-toggle="validator" action="/item-ajax/14" method="put">
                     <div class="form-group">
                        <label class="control-label" for="motivo">Motivo:</label>
                           <input type="text" name="motivo" class="form-control" data-error="motivo." required />
                        <div class="help-block with-errors"></div>
                     </div>
                     <div class="form-group">
                        <label class="control-label" for="fecha">Fecha:</label>
                           <input type="date" name="fecha" class="form-control" data-error="fecha." required />
                        <div class="help-block with-errors"></div>
                     </div>
                         <div class="form-group">
                           <label class="control-label" for="id_compra">Compra:</label>
                           <select class="form-control selectpicker " data-live-search=("true") name="id_compra" data-error="selccione Compra" required>
                             
                                 @foreach($compras as $compra)
                              <option value={{$compra->id}}>{{$compra->fecha}}</option>
                                 @endforeach
                           </select>
                           <div class="help-block with-errors"></div>
                        </div>

                     <div class="form-group">
                        <button type="submit" class="btn btn-success crud-submit-egreso-edit">Guardar</button>
                     </div>
                  </form>
      
            </div>
          </div>
        </div>
      </div>