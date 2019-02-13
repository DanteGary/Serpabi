<div class="modal fade" id="create-tipo" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span></button>
              <h4 class="modal-title" id="myModalLabel">Registro Tipo</h4>
            </div>
            <div class="modal-body">
      
                    <form data-toggle="validator" action="{{ route('tipos.store') }}" method="POST">
                            {{ csrf_field() }}    
                        <div class="form-group">
                              <label class="control-label" for="entrada">Entrada:</label>
                                 <input type="text" name="entrada" class="form-control" data-error="entrada." required />
                              <div class="help-block with-errors"></div>
                          </div>

                      <div class="form-group">

                        <label class="control-label" for="salida">Salida:</label>
                           <input type="text" name="salida" class="form-control" data-error="salida." required />
                        <div class="help-block with-errors"></div>
                      </div>
                      
                      <div class="form-group">
                          <button type="submit" class="btn tipo-submit btn-success">Submit</button>
                      </div>
                    </form>
            </div>
          </div>
        </div>
      </div>