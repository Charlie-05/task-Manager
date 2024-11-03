using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using TaskManagement.Data;
using TaskManagement.DTOs;
using TaskManagement.Models;

namespace TaskManagement.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserAccountController : ControllerBase
    {
        private TaskContext _taskContext;
        private readonly IConfiguration _configuration;
        public UserAccountController(TaskContext taskContext, IConfiguration configuration)
        {
            _taskContext = taskContext;
            _configuration = configuration;
        }

        [HttpPost("Register-User")]

        public async Task<IActionResult> RegisterUser(UserAccountModel userAccount)
        {
            try
            {
                var user = new UserAccount
                {
                    FullName = userAccount.FullName,
                    Email = userAccount.Email,
                    PasswordHash = BCrypt.Net.BCrypt.HashPassword(userAccount.Password),
                    Role = (Roles)userAccount.Role,
                };

                var data = await _taskContext.AddAsync(user);
                await _taskContext.SaveChangesAsync();

                var token = CreateToken(user);
                return Ok(token);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }

        }

        [HttpPost("Log-In")]
        public async Task<IActionResult> LogIn(LogInData logInData)
        {
            try
            {
                var user =  _taskContext.UsersAccounts.SingleOrDefault(u => u.Email == logInData.Email) ?? throw new Exception("User Not Found");
                var hash = BCrypt.Net.BCrypt.Verify(logInData.Password , user.PasswordHash);
                if (hash)
                {
                    var token = CreateToken(user);
                    return Ok(token);
                }
                else
                {
                    throw new Exception("Invalid Password");
                }                
               
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [Authorize]
        [HttpGet]
        public async Task<string> Test()
        {
            var data = User.FindFirst("Role").Value;
            return data;
        }

        private TokenModel CreateToken(UserAccount user)
        {
            var claimList = new List<Claim>();
            claimList.Add(new Claim("UserId" , user.UserId.ToString()));
            claimList.Add(new Claim("Name", user.FullName));
            claimList.Add(new Claim("Email", user.Email));
            claimList.Add(new Claim("Role", user.Role.ToString()));

            var key = _configuration["JWT:Key"];
            var secKey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(key));
            var credentials = new SigningCredentials(secKey , SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(
                issuer: _configuration["JWT:Issuer"],
                audience: _configuration["JWT:Audience"],
                claims: claimList,
                expires: DateTime.Now.AddDays(1),
                signingCredentials : credentials
                );
            var res = new TokenModel();
            res.Token = new JwtSecurityTokenHandler().WriteToken(token);    
            return res;
        }
    }

}
