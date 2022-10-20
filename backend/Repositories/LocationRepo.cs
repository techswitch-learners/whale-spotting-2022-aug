using System.Linq;
using Microsoft.EntityFrameworkCore;
using WhaleSpotting.Models.Database;

namespace WhaleSpotting.Repositories
{
    public interface ILocationRepo
    {
        Location GetLocationById(int locationId);
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
                .Single(l => l.Id == locationId);
        }
    }
}
