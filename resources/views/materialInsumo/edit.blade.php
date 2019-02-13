<div class="modal fade" id="edit-item" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span></button>
              <h4 class="modal-title" id="myModalLabel">Editar Material de Insumo</h4>
            </div>
            <div class="modal-body">
      
                  <form data-toggle="validator" action="/item-ajax/14" method="put">
                     <div class="form-group">
                        <label class="control-label" for="nombre">Nombre:</label>
                           <input type="text" name="nombre" class="form-control" data-error="Nombre del Producto." required />
                        <div class="help-block with-errors"></div>
                     </div>
                     <div class="form-group">
                        <label class="control-label" for="descripcion">Descripcion:</label>
                           <textarea class="form-control" name="descripcion" placeholder="Ingresa una descripcion" rows="3" cols="35" data-error="Descripcion del Material de Isumo." required></textarea>
                           <!-- <input type="text" name="descripcion" class="form-control" data-error="Descripcion." required /> -->
                        <div class="help-block with-errors"></div>
                     </div>

                     <div class="form-group">
                        <label class="control-label" for="cantidad">Cantidad:</label>
                           <input type="number" name="cantidad" class="form-control" data-error="Cantidad de Material Insumos." required />
                        <div class="help-block with-errors"></div>
                     </div>

    

                     <div class="form-group">
                        <button type="submit" class="btn btn-success crud-submit-materialInsumo-edit">Guardar</button>
                     </div>
                  </form>
      
            </div>
          </div>
        </div>
      </div>