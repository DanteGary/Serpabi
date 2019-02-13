<div class="modal fade" id="edit-item" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span></button>
              <h4 class="modal-title" id="myModalLabel">Editar Proveedor</h4>
            </div>
            <div class="modal-body">
      
                  <form data-toggle="validator" action="/item-ajax/14" method="put">
                     <div class="form-group">
                        <label class="control-label" for="nombre">Nombre:</label>
                           <input type="text" name="nombre" class="form-control" data-error="Nombre del Proveedor." required />
                        <div class="help-block with-errors"></div>
                     </div>
                     <div class="form-group">
                        <label class="control-label" for="nit">NIT:</label>
                           <input type="number" name="nit" class="form-control" data-error="Numero Nit." required />
                        <div class="help-block with-errors"></div>
                     </div>
                     <div class="form-group">
                        <label class="control-label" for="telefono">Telefono:</label>
                           <input type="number" name="telefono" class="form-control" data-error="Numero de Telefono." required />
                        <div class="help-block with-errors"></div>
                     </div>
                     <div class="form-group">
                        <button type="submit" class="btn btn-success crud-submit-proveedores-edit">Guardar</button>
                     </div>
                  </form>
      
            </div>
          </div>
        </div>
      </div>