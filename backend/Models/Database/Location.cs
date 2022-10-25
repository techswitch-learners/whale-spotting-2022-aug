using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace WhaleSpotting.Models.Database
{
    public class Location
    {
        public int Id { get; set; }
        public string Description { get; set; }
        public List<Species> Species { get; set; }

    }
}
