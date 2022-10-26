using System;
using Microsoft.AspNetCore.Cryptography.KeyDerivation;
using Microsoft.AspNetCore.Mvc;
using WhaleSpotting.Repositories;

namespace WhaleSpotting.Services
{
    public interface IAuthService
    {
        bool IsValidLoginInfo(string username, string password);
    }
    public class AuthService : IAuthService
    {
        private readonly IUserRepo _users;

        public AuthService(IUserRepo users)
        {
            _users = users;
        }

        public bool IsValidLoginInfo(string username, string password)
        {
            var foundUser = _users.GetByUsername(username);

            if (foundUser != null)
            {
                var foundUserSalt = foundUser.Salt;

                string hashed = Convert.ToBase64String(KeyDerivation.Pbkdf2(
                    password: password,
                    salt: foundUserSalt,
                    prf: KeyDerivationPrf.HMACSHA256,
                    iterationCount: 100000,
                    numBytesRequested: 256 / 8));

                return hashed == foundUser.HashedPassword;
            }
            else
            {
                return false;
            }
        }
    }
}
