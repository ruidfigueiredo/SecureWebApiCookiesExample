using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System.Linq;
using SecureWebApiWithCookies.Models;

namespace SecureWebApiWithCookies.Controllers
{
    [ApiController, Route("api/[controller]/[action]")]
    public class AccountController : Controller
    {
        private readonly UserManager<IdentityUser> _userManager;
        private readonly SignInManager<IdentityUser> _signInManager;
        public AccountController(UserManager<IdentityUser> userManager, SignInManager<IdentityUser> signInManager)
        {
            _userManager = userManager;
            _signInManager = signInManager;
        }

        [HttpPost]
        [IgnoreAntiforgeryToken]
        public async Task<IActionResult> Register(RegisterRequest registerRequest)
        {
            var newUser = new IdentityUser(registerRequest.Email)
            {
                Email = registerRequest.Email
            };

            var creationResult = await _userManager.CreateAsync(newUser, registerRequest.Password);

            if (!creationResult.Succeeded)
            {
                return BadRequest(creationResult.Errors.Select(error => error.Description).Aggregate((errorDescriptions, identityError) => errorDescriptions + $", {identityError}"));
            }

            return NoContent();
        }

        [HttpPost]
        [IgnoreAntiforgeryToken]
        public async Task<IActionResult> Login(LoginRequest loginRequest)
        {
            var user = await _userManager.FindByEmailAsync(loginRequest.Email);
            if (user == null)
                return BadRequest("Login failed");

            var signInResult = await _signInManager.PasswordSignInAsync(user, loginRequest.Password, isPersistent: true, lockoutOnFailure: false); //lockout on failure is off because this is a demo

            if (!signInResult.Succeeded)
                return BadRequest("Login failed");

            return NoContent();
        }

        [HttpPost]
        public async Task<IActionResult> Logout()
        {
            await _signInManager.SignOutAsync();
            return NoContent();
        }

    }
}