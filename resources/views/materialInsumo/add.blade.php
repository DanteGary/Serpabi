<div class="modal fade" id="add-item" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span></button>
              <h4 class="modal-title" id="myModalLabel">Editar Stock</h4>
            </div>
            <div class="modal-body">
      
                  <form data-toggle="validator" action="/item-ajax/14" method="put">
                     <div class="form-group">
                        <label class="control-label" for="nombre">nombre:</label>
                           <input type="text" name="nombre" class="form-control" data-error="nombre." required disabled />
                        <div class="help-block with-errors"></div>
                     </div>
                     <div class="form-group">
                        <label class="control-label" for="cantidad">Cantidad:</label>
                           <input type="number" name="cantidad" class="form-control" value="0" data-error="cantidad." required />
                        <div class="help-block with-errors"></div>
                     </div>

                     <div class="form-group">
                        <label class="control-label" for="costov">Costo de Venta:</label>
                           <input type="double" name="costov" class="form-control" data-error="costov." required />
                        <div class="help-block with-errors"></div>
                     </div>

                     <div class="form-group">
                        <button type="submit" class="btn btn-success crud-submit-materialInsumo-add">Guardar</button>
                     </div>
                  </form>
      
            </div>
          </div>
        </div>
      </div>