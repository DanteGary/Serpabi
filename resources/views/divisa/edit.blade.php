<div class="modal fade" id="edit-item" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span></button>
              <h4 class="modal-title" id="myModalLabel">Editar Divisa</h4>
            </div>
            <div class="modal-body">
      
                  <form data-toggle="validator" action="/item-ajax/14" method="put">
                     <div class="form-group">
                        <label class="control-label" for="nombre_bolivianos">Nombre Bolivianos:</label>
                           <input type="text" name="nombre_bolivianos" class="form-control" data-error="nombre_bolivianos." required />
                        <div class="help-block with-errors"></div>
                     </div>
                     <div class="form-group">
                        <label class="control-label" for="simbolo_bolivianos">Simbolo Bolivianos:</label>
                           <input type="text" name="simbolo_bolivianos" class="form-control" data-error="simbolo_bolivianos." required />
                        <div class="help-block with-errors"></div>
                     </div>

                     <div class="form-group">
                        <button type="submit" class="btn btn-success crud-submit-divisa-edit">Guardar</button>
                     </div>
                  </form>
      
            </div>
          </div>
        </div>
      </div>