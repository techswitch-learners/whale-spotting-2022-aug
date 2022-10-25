using System.Linq;
using Microsoft.EntityFrameworkCore;
using WhaleSpotting.Models.Database;

namespace WhaleSpotting.Repositories
{
    public interface ILocationRepo
    {
        Location GetLocationById(int locationId);
        Location GetLocationByName(string locationName); 
        Location AddLocation(Location newLocation);
    }

    public class LocationRepo : ILocationRepo
    {
        private readonly WhaleSpottingDbContext _context;

        public LocationRepo(WhaleSpottingDbContext context)
        {
            _context = context;
        }

        public Location GetLocationById(int locationId)
        {
            return _context.Locations
                .Include(l => l.Species)
                .Single(l => l.Id == locationId);
        }

        public Location GetLocationByName(string locationName) 
        {
            return _context.Locations
                .SingleOrDefault(l => l.Description == locationName);
        }

        public Location AddLocation(Location newLocation)
        {
           var insertedLocation = _context.Locations.Add(newLocation);
           _context.SaveChanges();

           return insertedLocation.Entity;
        }
    }
}
