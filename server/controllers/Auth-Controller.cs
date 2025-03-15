using Microsoft.AspNetCore.Mvc;
using server.Data;
using server.Models;
using server.Models.DTOs;
using server.Helpers;
using Microsoft.EntityFrameworkCore;
using System.Security.Cryptography;
using System.Text;

namespace Server.Controllers
{
    [ApiController]
    [Route("api/auth")]
    public class AuthController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly JwtHelper _jwtHelper;

        public AuthController(ApplicationDbContext context, JwtHelper jwtHelper)
        {
            _context = context;
            _jwtHelper = jwtHelper;
        }

        // REGISTER
        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterRequest request)
        {
            if (await _context.Users.AnyAsync(u => u.Email == request.Email))
                return BadRequest("Email already in use.");

            var role = await _context.Roles.FirstOrDefaultAsync(r => r.RoleName == request.Role);
            if (role == null)
                return BadRequest("Invalid role. Choose 'Admin' or 'User'.");

            var user = new User
            {
                FirstName = request.FirstName,
                LastName = request.LastName,
                Email = request.Email,
                PasswordHash = HashPassword(request.Password),
                RoleID = role.RoleID,
                RefreshToken = _jwtHelper.GenerateRefreshToken(),
                RefreshTokenExpiry = DateTime.UtcNow.AddDays(7)
            };

            _context.Users.Add(user);
            await _context.SaveChangesAsync();


            return Ok(new
            {
                message = "Register successful!",
                user = new UserResponse
                {
                    FirstName = user.FirstName,
                    LastName = user.LastName,
                    Email = user.Email,
                    Role = role.RoleName
                }
            });
        }

        // LOGIN
        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginRequest request)
        {
            var user = await _context.Users.Include(u => u.Role).FirstOrDefaultAsync(u => u.Email == request.Email);
            if (user == null || !VerifyPassword(request.Password, user.PasswordHash))
                return Unauthorized("Invalid email or password.");

            var token = _jwtHelper.GenerateJwtToken(user.Email, user.Role?.RoleName ?? "User");
            var refreshToken = _jwtHelper.GenerateRefreshToken();

            user.RefreshToken = refreshToken;
            user.RefreshTokenExpiry = DateTime.UtcNow.AddDays(7);
            await _context.SaveChangesAsync();

            return Ok(new
            {
                message = "Login successful!",
                token,
                refreshToken,
                user = new UserResponse
                {
                    FirstName = user.FirstName,
                    LastName = user.LastName,
                    Email = user.Email,
                    Role = user.Role?.RoleName ?? "User"
                }
            });
        }

        // REFRESH TOKEN
        [HttpPost("refresh")]
        public async Task<IActionResult> RefreshToken([FromBody] RefreshRequest request)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.RefreshToken == request.RefreshToken);
            if (user == null || user.RefreshTokenExpiry <= DateTime.UtcNow)
                return Unauthorized("Invalid refresh token.");

            var newToken = _jwtHelper.GenerateJwtToken(user.Email, user.Role?.RoleName ?? "User");
            var newRefreshToken = _jwtHelper.GenerateRefreshToken();

            user.RefreshToken = newRefreshToken;
            user.RefreshTokenExpiry = DateTime.UtcNow.AddDays(7);
            await _context.SaveChangesAsync();

            return Ok(new { token = newToken, refreshToken = newRefreshToken });
        }

        // Password Hashing
        private string HashPassword(string password)
        {
            using var sha256 = SHA256.Create();
            var hashedBytes = sha256.ComputeHash(Encoding.UTF8.GetBytes(password));
            return Convert.ToBase64String(hashedBytes);
        }

        private bool VerifyPassword(string password, string storedHash)
        {
            return HashPassword(password) == storedHash;
        }
    }
}