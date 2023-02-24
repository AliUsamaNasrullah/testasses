using Microsoft.EntityFrameworkCore;

namespace test.Models
{
    public class ApplicationContext:DbContext
    {
        public ApplicationContext(DbContextOptions<ApplicationContext> options): base(options) { }
        public DbSet<UserTable> users { get; set; }
    }
}
