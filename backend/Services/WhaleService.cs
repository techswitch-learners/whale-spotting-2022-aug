using System;
using Microsoft.AspNetCore.Cryptography.KeyDerivation;
using WhaleSpotting.Repositories;

namespace WhaleSpotting.Services
{
    public interface IWhaleService
    {
    }
    public class WhaleService : IWhaleService
    {
        private readonly IWhaleRepo _whales;

        public WhaleService(IWhaleRepo whales)
        {
            _whales = whales;
        }
    }
};
