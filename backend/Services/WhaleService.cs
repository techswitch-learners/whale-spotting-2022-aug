using System.Collections.Generic;
using WhaleSpotting.Models.Database;
using WhaleSpotting.Repositories;

namespace WhaleSpotting.Services
{
    public interface IWhaleService
    {
        IEnumerable<Species> GetAllSpecies();
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

        public IEnumerable<Species> GetSpeciesById(speciesId) 
        {
            return _whales.GetSpeciesById(speciesId);
        }
    }
}
