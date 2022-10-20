using System.ComponentModel.DataAnnotations;

namespace WhaleSpotting.Models.Request
{
    public class CreateUserRequest
    {
        [Required]
        [StringLength(70)]
        public string Name { get; set; }

        [Required]
        [StringLength(70)]
        public string Username { get; set; }
        
        [Required]
        [RegularExpression(
            // Microsoft's recommended email address validation Regex (absolutely disgusting, I know)
            @"^(?("")("".+?(?<!\\)""@)|(([0-9a-z]((\.(?!\.))|[-!#\$%&'\*\+/=\?\^`\{\}\|~\w])*)(?<=[0-9a-z])@))"
            + @"(?(\[)(\[(\d{1,3}\.){3}\d{1,3}\])|(([0-9a-z][-0-9a-z]*[0-9a-z]*\.)+[a-z0-9][\-a-z0-9]{0,22}[a-z0-9]))$"
        )]
        public string Email { get; set; }

        [Required]
        [RegularExpression(
            @"^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$"
        )]
        public string Password { get; set; }
    }
}
