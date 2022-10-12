using System.ComponentModel.DataAnnotations;
using WhaleSpotting.Models.Request;

namespace WhaleSpotting.Models.Response
{
    public class CreateUserResponse
    {
        [Required]
        [StringLength(70)]
        public string Name { get; set; }

        [Required]
        [StringLength(70)]
        public string Username { get; set; }

        [Required]
        [EmailAddress]
        public string Email { get; set; }

        public bool Success { get; set; }
    
        public CreateUserResponse(CreateUserRequest newUserRequest, bool success)
        {
            this.Name = newUserRequest.Name;
            this.Username = newUserRequest.Username;
            this.Email = newUserRequest.Email;
            this.Success = success;
        }
    }
}
