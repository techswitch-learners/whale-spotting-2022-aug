using System.Collections.Generic;
using WhaleSpotting.Models.Database;

namespace WhaleSpotting.Repositories
{
    public interface ISightingRepo
    {
    }

    public class SightingRepo : ISightingRepo
    {
        private readonly WhaleSpottingDbContext _context;

        public SightingRepo(WhaleSpottingDbContext context)
        {
            _context = context;
        }
    
        public IEnumerable<Sighting> GetApprovedSightings()
        {
            // return _context.Sightings
            //     .Include(s => s.ConfirmationStatus);
            
            return _context.Sightings.Include(s => s.ConfirmationStatus).Where(s.ConfirmationStatus == "Approved");
        }
    }
}
