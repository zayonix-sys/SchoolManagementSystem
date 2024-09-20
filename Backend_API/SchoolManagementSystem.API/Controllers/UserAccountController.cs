using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using SchoolManagementSystem.API.Models;
using SchoolManagementSystem.Application.DTOs;
using SchoolManagementSystem.Application.Interfaces;
using SchoolManagementSystem.Application.Services;
using SchoolManagementSystem.Domain.Entities;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace SchoolManagementSystem.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserAccountController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        private readonly IUserAccount _userAccountService;
        private readonly ILogger<UserAccountController> _logger;

        public UserAccountController(IConfiguration configuration, ILogger<UserAccountController> logger, IUserAccount userAccountService)
        {
            _configuration = configuration;
            _logger = logger;
            _userAccountService = userAccountService;
        }

        [Authorize]
        [HttpPost("Register")]
        public async Task<IActionResult> Register([FromBody] UserDTO dto)
        {
            _logger.LogInformation("Adding a new User with name {UserName}.", dto.UserName);
            try
            {
                await _userAccountService.AddUser(dto);
                _logger.LogInformation("Successfully added user with ID {UserId}.", dto.UserId);
                //return Ok(ApiResponse<ApplicantAdmissionDTO>.SuccessResponse(dto, "Applicant added successfully"));
                return Ok();

            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "An error occurred while adding a new user.");
                return StatusCode(500, ApiResponse<UserDTO>.ErrorResponse("Internal server error."));
            }
        }

        [HttpPost("[action]")]
        public async Task<ActionResult<ApiResponse<UserDTO>>> Login([FromBody] LoginDTO dto)
        {
            _logger.LogInformation("Login with username {username}.", dto.UserName);
            try
            {
                var user = await _userAccountService.ValidUser(dto);
                if (user != null)
                {
                    var token = GenerateJwtToken(user);
                    user.Token = token;
                    _logger.LogInformation("Successfully Login with {username}.", dto.UserName);
                    return Ok(ApiResponse<UserDTO>.SuccessResponse(user, "Login successfully"));

                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "An error occurred while Login.");
                return StatusCode(500, ApiResponse<LoginDTO>.ErrorResponse("Internal server error."));
            }

            return Unauthorized();
        }

        private string GenerateJwtToken(UserDTO user)
        {
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

            var claims = new[]
            {
            new Claim(ClaimTypes.Name, user.UserName),
            new Claim(ClaimTypes.Role, user.RoleName),
            new Claim(JwtRegisteredClaimNames.Sub, user.UserName),
            new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
        };

            var token = new JwtSecurityToken(
                issuer: _configuration["Jwt:Issuer"],
                audience: _configuration["Jwt:Audience"],
                claims: claims,
                expires: DateTime.Now.AddMinutes(Convert.ToDouble(_configuration["Jwt:ExpireMinutes"])),
                signingCredentials: credentials);

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}
