<div class="modal fade" id="delete-item-tarea" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
        <form data-toggle="validator" action="/item-ajax/14" method="DELETE">
            {{ csrf_field() }}    
        
            <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span></button>
              <h4 class="modal-title" id="myModalLabel">Eliminar Tarea</h4>
            </div>
            <div class="modal-body"> 
                <p>Desea eliminar la tarea?</p>
                <input type="text" name="nombre" disabled>  
                    <div class="modal-footer">
                        <button type="submit" class="btn btn-danger crud-submit-tarea-delete">Eliminar</button>
                        <button type="button"  class="btn btn-default" data-dismiss='modal'>Cerrar</button>
                    </div>            
                </div>    
            </div>    
        </div>    
    </form>
    </div>   