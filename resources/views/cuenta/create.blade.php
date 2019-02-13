<div class="modal fade" id="create-cuenta" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span></button>
              <h4 class="modal-title" id="myModalLabel">Registro Cuenta</h4>
            </div>
            <div class="modal-body">
      
                    <form data-toggle="validator" action="{{ route('cuentas.store') }}" method="POST">
                            {{ csrf_field() }}    
                        <div class="form-group">
                              <label class="control-label" for="nombre">Nombre:</label>
                                 <input type="text" name="nombre" class="form-control" data-error="nombre." required />
                              <div class="help-block with-errors"></div>
                          </div>

                      <div class="form-group">

                        <label class="control-label" for="tipo">Tipo:</label>
                           <input type="text" name="tipo" class="form-control" data-error="tipo." required />
                        <div class="help-block with-errors"></div>
                      </div>
                         
                     <div class="form-group">
                        <label class="control-label" for="numero_cuenta">Numero de Cuenta:</label>
                           <input type="number" name="numero_cuenta" class="form-control" data-error="numero_cuenta." required />
                        <div class="help-block with-errors"></div>
                      </div>

                      <div class="form-group">
                        <label class="control-label" for="banco">Banco:</label>
                           <input type="text" name="banco" class="form-control" data-error="banco." required />
                        <div class="help-block with-errors"></div>
                      </div>
                      
                      <div class="form-group">
                          <button type="submit" class="btn cuenta-submit btn-success">Submit</button>
                      </div>
                    </form>
            </div>
          </div>
        </div>
      </div>