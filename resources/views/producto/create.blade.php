<div class="modal fade" id="create-producto" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span></button>
              <h4 class="modal-title" id="myModalLabel">Registro Producto</h4>
            </div>
            <div class="modal-body">
      
                    <form data-toggle="validator" action="{{ route('productos.store') }}" method="POST">
                            {{ csrf_field() }}    
                        <div class="form-group">
                              <label class="control-label" for="nombre">nombre:</label>
                                 <input type="text" name="nombre" class="form-control" data-error="nombre." required />
                              <div class="help-block with-errors"></div>
                          </div>

                      <div class="form-group">
                        <label class="control-label" for="nit">Descripcion:</label>
                           <textarea class="form-control" name="descripcion" placeholder="Ingresa una descripcion" rows="3" cols="35" data-error="Descripcion del Producto." required></textarea>
                           <!-- <input type="text" name="descripcion" class="form-control" data-error="descripcion." required /> -->
                        <div class="help-block with-errors"></div>
                      </div>
                         
                     <div class="form-group">
                        <label class="control-label" for="telefono">Cantidad:</label>
                           <input type="number" name="cantidad" class="form-control" data-error="cantidad." value="0" disabled />
                        <div class="help-block with-errors"></div>
                      </div>

                      <div class="form-group">
                        <label class="control-label" for="telefono">Precio:</label>
                           <input type="double" name="preciov" class="form-control" data-error="preciov." required />
                        <div class="help-block with-errors"></div>
                      </div>
                      
                      <div class="form-group">
                          <button type="submit" class="btn producto-submit btn-success">Registrar</button>
                      </div>
                    </form>
            </div>
          </div>
        </div>
      </div>