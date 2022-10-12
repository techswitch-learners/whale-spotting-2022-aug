using System.Collections.Generic;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using WhaleSpotting.Models.Database;

namespace WhaleSpotting.Repositories
{
    public interface ISightingRepo
    {
        IEnumerable<Sighting> GetSightingsBySpeciesId(int speciesId);
    }

    public class SightingRepo : ISightingRepo
    {
        private readonly WhaleSpottingDbContext _context;

        public SightingRepo(WhaleSpottingDbContext context)
        {
            _context = context;
        }

        public IEnumerable<Sighting> GetSightingsBySpeciesId(int speciesId)
        {
            return _context.Sightings
                .Include(s => s.Species)
                .Include(s => s.Location)
                .Where(s => s.Species.Id == speciesId)
                .Where(s => s.ConfirmationStatus == ConfirmationStatus.Approved)
                .OrderByDescending(s => s.SeenOn);
        }
    }
}
