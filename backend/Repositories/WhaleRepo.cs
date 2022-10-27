using System.Collections.Generic;
using System.Linq;
using System.Text.RegularExpressions;
using Microsoft.EntityFrameworkCore;
using WhaleSpotting.Models.Database;

namespace WhaleSpotting.Repositories
{
    public interface IWhaleRepo
    {
        IEnumerable<Species> GetAllSpecies();
        Species GetSpeciesById(int speciesId);

        IEnumerable<Species> GetSpeciesByName(string name);
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

        public Species GetSpeciesById(int speciesId)
        {
            return _context.Species
                .Include(s => s.ConservationStatus)
                .Single(s => s.Id == speciesId);
        }


        //public searchSpeciesByKeyword(string keyword)
        public IEnumerable<Species> GetSpeciesByName(string name)
        {
            Regex reg = new Regex("[:!@#$%^&*()}{|\":?><[]\\;'/.,~ ]");
            var species = _context.Species
                .Include(s => s.ConservationStatus)
                // .Where(s => reg.Replace(s.Name, string.Empty).ToLower() == reg.Replace(name, string.Empty).ToLower());
                .Where(s => s.Name.Contains(name));
            return species;
        }
    }
}
