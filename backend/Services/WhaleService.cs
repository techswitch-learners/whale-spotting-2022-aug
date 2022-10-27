using System.Collections.Generic;
using WhaleSpotting.Models.Database;
using WhaleSpotting.Repositories;

namespace WhaleSpotting.Services
{
    public interface IWhaleService
    {
        IEnumerable<Species> GetAllSpecies();
        Species GetSpeciesById(int speciesId);
        IEnumerable<Species> GetSpeciesByName(string name);
    }

    public class WhaleService : IWhaleService
    {
        private readonly IWhaleRepo _whales;

        public WhaleService(IWhaleRepo whales)
        {
            _whales = whales;
        }

        public IEnumerable<Species> GetAllSpecies()
        {
            return _whales.GetAllSpecies();
        }

        public Species GetSpeciesById(int speciesId)
        {
            return _whales.GetSpeciesById(speciesId);
        }

        public IEnumerable<Species> GetSpeciesByName(string searchString)
        {
            return _whales.GetSpeciesByName(searchString);
        }
    }
}
