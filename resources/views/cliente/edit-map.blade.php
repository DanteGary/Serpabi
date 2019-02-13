<style type="text/css">
#mapaEdit {
        height: 400px;
        width: 500px;
      }
</style>
<div class="modal fade" id="my-ModalEdit" tabindex="-1" role="dialog" aria-labelledby="my-ModalEditLabel">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
        <h4 class="modal-title" id="my-ModalEditLabel">Editar Ubicacion</h4>
      </div>
      <div class="modal-body">
          <div id="mapaEdit"></div>
          <button type="button" id="botonBorrar">Elimina marcadores</button>
      </div>
      <div class="modal-footer">
        <button class="btn btn-info" id="btnMapaEdit">Guardar Ubicacion</button>
        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
      </div>
    </div>
  </div>
</div>