using System.Linq;
using WhaleSpotting.Models.Database;

namespace WhaleSpotting.Repositories
{
    public interface IWhaleRepo
    {
    }

    public class WhaleRepo : IWhaleRepo
    {
        private readonly WhaleSpottingDbContext _context;

        public WhaleRepo(WhaleSpottingDbContext context)
        {
            _context = context;
        }

    }
}
