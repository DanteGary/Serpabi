<div class="modal fade" id="create-cargo" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span></button>
              <h4 class="modal-title" id="myModalLabel">Registro de Cargo</h4>
            </div>
            <div class="modal-body">
      
                    <form data-toggle="validator" action="{{ route('cargos.store') }}" method="POST">
                            {{ csrf_field() }}    
                        <div class="form-group">
                              <label class="control-label" for="nombre">nombre:</label>
                                 <input type="text" name="nombre" class="form-control" data-error="nombre." required />
                              <div class="help-block with-errors"></div>
                        </div>

                        <div class="form-group">

                        <label class="control-label" for="descripcion">Descripcion:</label>
                           <input type="text" name="descripcion" class="form-control" data-error="descripcion." required />
                        <div class="help-block with-errors"></div>
                      </div>
                     
                      <div class="form-group">
                          <button type="submit" class="btn cargo-submit btn-success">Submit</button>
                      </div>
                    </form>
            </div>
          </div>
        </div>
      </div>