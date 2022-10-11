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
    }
}
