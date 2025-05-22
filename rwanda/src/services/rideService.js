// This is a mock service that would typically connect to a real backend
const API_URL = 'http://localhost:3001/api';

export const rideService = {
    // Book a ride
    async bookRide(bookingData) {
        try {
            // In a real app, this would be an API call
            const response = await fetch(`${API_URL}/rides`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(bookingData),
            });
            return await response.json();
        } catch (error) {
            console.error('Error booking ride:', error);
            throw error;
        }
    },

    // Get available drivers
    async getAvailableDrivers() {
        try {
            // In a real app, this would be an API call
            const response = await fetch(`${API_URL}/drivers/available`);
            return await response.json();
        } catch (error) {
            console.error('Error fetching drivers:', error);
            throw error;
        }
    },

    // Update driver status
    async updateDriverStatus(driverId, status) {
        try {
            const response = await fetch(`${API_URL}/drivers/${driverId}/status`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ status }),
            });
            return await response.json();
        } catch (error) {
            console.error('Error updating driver status:', error);
            throw error;
        }
    },

    // Get driver's upcoming rides
    async getDriverRides(driverId) {
        try {
            const response = await fetch(`${API_URL}/drivers/${driverId}/rides`);
            return await response.json();
        } catch (error) {
            console.error('Error fetching driver rides:', error);
            throw error;
        }
    },

    // Update ride status
    async updateRideStatus(rideId, status) {
        try {
            const response = await fetch(`${API_URL}/rides/${rideId}/status`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ status }),
            });
            return await response.json();
        } catch (error) {
            console.error('Error updating ride status:', error);
            throw error;
        }
    },

    // Get ride details
    async getRideDetails(rideId) {
        try {
            const response = await fetch(`${API_URL}/rides/${rideId}`);
            return await response.json();
        } catch (error) {
            console.error('Error fetching ride details:', error);
            throw error;
        }
    }
}; 