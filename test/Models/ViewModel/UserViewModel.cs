using System.ComponentModel.DataAnnotations;

namespace test.Models.ViewModel
{
    public class UserViewModel
    {
        public int Id { get; set; }
        [Required]
        public string? Firstname { get; set; }
        [Required]
        public string? Lastname { get; set; }
        [Required]
        public string? Email { get; set; }
        [Required]
        public long Number { get; set; }
    }
}
