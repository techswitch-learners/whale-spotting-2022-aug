namespace WhaleSpotting.Repositories
{
    public interface ILocationRepo
    {
    }

    public class LocationRepo : ILocationRepo
    {
        private readonly WhaleSpottingDbContext _context;

        public LocationRepo(WhaleSpottingDbContext context)
        {
            _context = context;
        }
    }
}
