<div class="modal fade" id="edit-item" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span></button>
              <h4 class="modal-title" id="myModalLabel">Editar Alquiler</h4>
            </div>
            <div class="modal-body">
      
                  <form data-toggle="validator" action="/item-ajax/14" method="put">
                     <div class="form-group">
                        <label class="control-label" for="costo">Costo:</label>
                           <input type="number" name="costo" class="form-control" data-error="costo." required />
                        <div class="help-block with-errors"></div>
                     </div>
                     <div class="form-group">
                        <label class="control-label" for="feha_inicio">Fecha Inicio:</label>
                           <input type="date" name="feha_inicio" class="form-control" data-error="feha_inicio." required />
                        <div class="help-block with-errors"></div>
                     </div>
                     <div class="form-group">
                        <label class="control-label" for="feha_fin">Fecha Final:</label>
                           <input type="date" name="feha_fin" class="form-control" data-error="feha_fin." required />
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
                        <button type="submit" class="btn btn-success crud-submit-alquiler-edit">Guardar</button>
                     </div>
                  </form>
      
            </div>
          </div>
        </div>
      </div>