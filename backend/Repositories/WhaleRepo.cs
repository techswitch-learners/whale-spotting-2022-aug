using System.Collections.Generic;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using WhaleSpotting.Models.Database;

namespace WhaleSpotting.Repositories
{
    public interface IWhaleRepo
    {
        IEnumerable<Species> GetAllSpecies();
        Species GetSpeciesById(int id);
    }

    public class WhaleRepo : IWhaleRepo
    {
        private readonly WhaleSpottingDbContext _context;

        public WhaleRepo(WhaleSpottingDbContext context)
        {
            _context = context;
        }
         public IEnumerable<Species> GetAllSpecies()
        {
            return _context.Species
                .Include(s => s.ConservationStatus)
                .OrderBy(s => s.Name);
        }

        public Species GetSpeciesById( int id )
        {
            return _context.Species
                .Include(s => s.ConservationStatus)
                .Single(s => s.Id==id);
        }
    }
}
