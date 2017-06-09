class Locations {
    constructor() {
        this.locationsArr = [];
    }

    addLocation(locationObj) {
        this.locationsArr.push(locationObj);
        // return locationObj;
    }

    removeLocation(id) {
        var removedLocation = this.getLocation(id);

        if (removedLocation) {
            this.locationsArr = this.locationsArr.filter((location) => location.id !== id);
        }
        return removedLocation;
    }

    getLocation(id) {
        return this.locationsArr.filter((user) => user.id === id)[0];
    }

    getLocationsList(room) {
        var locations = this.locationsArr.filter((location) => location.zipCode === room);
        return locations;
    }
}

module.exports = Locations;