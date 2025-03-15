namespace server.Models
{
    public class User
    {
        public int UserID { get; set; }
        public string FirstName { get; set; } = string.Empty;
        public string LastName { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string PasswordHash { get; set; } = string.Empty;
        public int RoleID { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        // New properties for refresh token handling
        public string? RefreshToken { get; set; }
        public DateTime? RefreshTokenExpiry { get; set; }

        // Navigation Property (EF Core links User to Role table)
        public Role? Role { get; set; } = null!; //Required the Role
    }
}
