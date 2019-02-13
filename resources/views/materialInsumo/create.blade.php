<div class="modal fade" id="create-materialInsumo" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span></button>
              <h4 class="modal-title" id="myModalLabel">Registro de Materiales de Insumos</h4>
            </div>
            <div class="modal-body">

                    <form data-toggle="validator" action="{{ route('materialesInsumos.store') }}" method="POST">
                            {{ csrf_field() }}    
                        <div class="form-group">
                              <label class="control-label" for="nombre">Nombre:</label>
                                 <input type="text" name="nombre" class="form-control" data-error="Nombre del Material de Insumo." required />
                              <div class="help-block with-errors"></div>
                        </div>

                        <div class="form-group">

                        <label class="control-label" for="descripcion">Descripcion:</label>
                           <textarea class="form-control" name="descripcion" placeholder="Ingresa una descripcion" rows="3" cols="35" data-error="Descripcion del Material de Isumo." required></textarea>
                           <!-- <input type="text" name="descripcion" class="form-control" data-error="Descripcion del Producto." required /> -->
                        <div class="help-block with-errors"></div>
                      </div>

                      <div class="form-group">
                        <label class="control-label" for="cantidad">Cantidad:</label>
                           <input type="number" name="cantidad" class="form-control" data-error="cantidad." disabled value="0" />
                        <div class="help-block with-errors"></div>
                      </div>

                      <div class="form-group">
                          <button type="submit" class="btn materialInsumo-submit btn-success">Guardar</button>
                      </div>
                    </form>
            </div>
          </div>
        </div>
      </div>