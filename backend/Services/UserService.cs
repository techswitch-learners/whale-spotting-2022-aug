using Microsoft.AspNetCore.Mvc;
using System;
using System.Security.Cryptography;
using Microsoft.AspNetCore.Cryptography.KeyDerivation;
using WhaleSpotting.Models.Database;
using WhaleSpotting.Models.Request;
using WhaleSpotting.Repositories;
using WhaleSpotting.Exceptions;

namespace WhaleSpotting.Services
{
    public interface IUserService
    {
        User Create(CreateUserRequest newUser);
        bool IsExistingUsername(string username);
    }

    public class UserService : IUserService
    {
        private readonly IUserRepo _users;

        public UserService(IUserRepo users)
        {
            _users = users;
        }

        public bool IsExistingUsername(string username)
        {
            try
            {
                return _users.GetByUsername(username) != null;
            }
            catch (Exception)
            {
                return false;
            }

        }

        public User Create(CreateUserRequest newUserRequest)
        {
            // generate a 128-bit salt using a cryptographically strong random sequence of nonzero values
            byte[] salt = new byte[128 / 8];
            using (var rngCsp = new RNGCryptoServiceProvider())
            {
                rngCsp.GetNonZeroBytes(salt);
            }

            // derive a 256-bit subkey (use HMACSHA256 with 100,000 iterations)
            string hashed = Convert.ToBase64String(KeyDerivation.Pbkdf2(
                password: newUserRequest.Password,
                salt: salt,
                prf: KeyDerivationPrf.HMACSHA256,
                iterationCount: 100000,
                numBytesRequested: 256 / 8
            ));

            if (IsExistingUsername(newUserRequest.Username))
            {
                throw new DuplicateUsernameException("Username already exists");
            }
            
            User newUser = new User
            {
                Name = newUserRequest.Name,
                HashedPassword = hashed,
                Salt = salt,
                Email = newUserRequest.Email,
                Username = newUserRequest.Username
            };

            return _users.Create(newUser);
        }
    }
}
