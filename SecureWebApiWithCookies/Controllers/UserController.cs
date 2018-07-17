using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace SecureWebApiWithCookies.Controllers
{
    [ApiController, Route("api/[controller]/[action]")]        
    public class UserController : Controller
    {        
        [Authorize]
        public IActionResult Name()
        {   
            return Ok(User.Identity.Name);
        }
    }
}