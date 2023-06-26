window.onload = () => {
     let places = staticLoadPlaces();
     renderPlaces(places);
};

function staticLoadPlaces() {
	if ("geolocation" in navigator) {
	  // Prompt user for permission to access their location
	  navigator.geolocation.getCurrentPosition(
		// Success callback function
		(position) => {
		  // Get the user's latitude and longitude coordinates
		  const lat = position.coords.latitude;
		  const lng = position.coords.longitude;

		  // Do something with the location data, e.g. display on a map
		  console.log(`Latitude: ${lat}, longitude: ${lng}`);
		},
		// Error callback function
		(error) => {
		  // Handle errors, e.g. user denied location sharing permissions
		  console.error("Error getting user location:", error);
		}
	  );
	} else {
	  // Geolocation is not supported by the browser
	  console.error("Geolocation is not supported by this browser.");
	}
    return [
        {
            name: 'Magnemite',
            location: {
                lat: lat,
                lng: lng,
            }
        },
    ];
}

function renderPlaces(places) {
    let scene = document.querySelector('a-scene');

    places.forEach((place) => {
        let latitude = place.location.lat;
        let longitude = place.location.lng;

        let model = document.createElement('a-entity');
        model.setAttribute('gps-entity-place', `latitude: ${latitude}; longitude: ${longitude};`);
        model.setAttribute('gltf-model', './assets/magnemite/scene.gltf');
        model.setAttribute('rotation', '0 180 0');
        model.setAttribute('animation-mixer', '');
        model.setAttribute('scale', '0.5 0.5 0.5');

        model.addEventListener('loaded', () => {
            window.dispatchEvent(new CustomEvent('gps-entity-place-loaded'))
        });

        scene.appendChild(model);
    });
}