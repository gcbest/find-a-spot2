import axios from 'axios';
import React from 'react';

module.exports = {
    formatAddress: (list) => {
        var arr = list.map((spot) => {
            return axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${spot.lat},${spot.lng}&key=AIzaSyBBdT0ajba4ZVpgaZeUupDTPE2x7ecAt4s`)
                .then((response) => {
                    return (<li key={spot.lat}>{response.data.results[0].formatted_address}</li>);
                })
                .catch((error) => {
                    throw error;
                });
        });
        return arr;
    }
};
