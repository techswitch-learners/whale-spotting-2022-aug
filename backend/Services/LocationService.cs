using System;
using Microsoft.AspNetCore.Cryptography.KeyDerivation;
using WhaleSpotting.Models.Database;
using WhaleSpotting.Repositories;

namespace WhaleSpotting.Services
{
    public interface ILocationService
    {
        Location GetLocationById(int locationId);
        Location AddLocation( Location newLocation);
    }

    public class LocationService : ILocationService
    {
        private readonly ILocationRepo _locations;

        public LocationService(ILocationRepo locations)
        {
            _locations = locations;
        }

        public Location GetLocationById(int locationId)
        {
            return _locations.GetLocationById(locationId);
        }
        
        public Location AddLocation( Location newLocation)
        {
            var addNewLocation = new Location
            {
                Description = newLocation.Description,
            };

            return _locations.AddLocation(addNewLocation);   
        }
    }
}
