using System.ComponentModel.DataAnnotations;

namespace test.Models
{
    public class UserTable
    {
        [Key]
        public int Id { get; set; }
        public string? Firstname  { get; set; }
        public string? Lastname { get; set; }
        public string? Email { get; set; }
        public long Number { get; set; }
    }
}

