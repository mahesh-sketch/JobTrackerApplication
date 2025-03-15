namespace server.Data
{
    using Microsoft.EntityFrameworkCore;
    using server.Models;

    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) { }

        public DbSet<User> Users { get; set; }
        public DbSet<Role> Roles { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Seed roles
            modelBuilder.Entity<Role>().HasData(
                new Role { RoleID = 1, RoleName = "Employee" },
                new Role { RoleID = 2, RoleName = "Employer" }
            );

            // Unique email constraint
            modelBuilder.Entity<User>()
                .HasIndex(u => u.Email)
                .IsUnique();

            // Configure Role relationship
            modelBuilder.Entity<User>()
                .HasOne(u => u.Role)
                .WithMany()
                .HasForeignKey(u => u.RoleID)
                .OnDelete(DeleteBehavior.Restrict);
        }
    }
}
