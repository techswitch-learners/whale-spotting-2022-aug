using System;
using Microsoft.AspNetCore.Cryptography.KeyDerivation;
using Microsoft.AspNetCore.Mvc;
using WhaleSpotting.Services;

namespace WhaleSpotting.Helpers
{
    public static class AuthHelper
    {
        public static string Base64Encode(string plainText)
        {
            var plainTextBytes = System.Text.Encoding.UTF8.GetBytes(plainText);
            return System.Convert.ToBase64String(plainTextBytes);
        }

        public static string Base64Decode(string base64EncodedData)
        {
            var base64EncodedBytes = System.Convert.FromBase64String(base64EncodedData);
            return System.Text.Encoding.UTF8.GetString(base64EncodedBytes);
        }

        public static (string username, string password) GetUsernameAndPassword(string authorization)
        {
                var encodedUsernamePassword = authorization.Substring("Basic ".Length).Trim();
                string usernamePassword = AuthHelper.Base64Decode(encodedUsernamePassword);
                int separatorIndex = usernamePassword.IndexOf(':');

                var splitUsernamePassword = usernamePassword.Split(':');
                var username = splitUsernamePassword[0];
                var password = splitUsernamePassword[1];
                return (username, password); 
        }


    }
}
