using ConstructionManagerAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace ConstructionManagerAPI.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) { }

        // Define DbSets for your tables
        public DbSet<Project> Projects { get; set; }
        public DbSet<User> Users { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Project>().ToTable("projects");
            modelBuilder.Entity<User>().ToTable("users");

            base.OnModelCreating(modelBuilder);
        }
    }
}
