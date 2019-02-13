var map;
     function initMap() {
        map = new google.maps.Map(document.getElementById('map'), {
      center: {lat: -17.395164, lng: -66.263654},
          zoom: 17,
        });
        var marker = new google.maps.Marker({
          position: {lat: -17.395164, lng: -66.263654},
          map: map,
    title: 'Acuario de Gijón'
        });
      }