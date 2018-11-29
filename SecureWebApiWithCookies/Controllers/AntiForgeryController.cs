using Microsoft.AspNetCore.Antiforgery;
using Microsoft.AspNetCore.Mvc;

namespace SecureWebApiWithCookies.Controllers
{
    [ApiController]
    public class AntiForgeryController : Controller
    {
        private IAntiforgery _antiForgery;
        public AntiForgeryController(IAntiforgery antiForgery)
        {
            _antiForgery = antiForgery;
        }
        [Route("api/antiforgery")]
        [IgnoreAntiforgeryToken]
        public IActionResult Index()
        {
            var tokens = _antiForgery.GetAndStoreTokens(HttpContext);
            Response.Cookies.Append("XSRF-REQUEST-TOKEN", tokens.RequestToken, new Microsoft.AspNetCore.Http.CookieOptions
            {
                HttpOnly = false
            });
            return NoContent();
        }
    }
}