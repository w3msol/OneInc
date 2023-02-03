using Microsoft.AspNetCore.Mvc;
using OneInc.Model;

namespace OneInc.Controllers
{
    [ApiController]
    [Route("Convert")]
    public class ConvertController : ControllerBase
    {

        [HttpGet]
        public ConvertMessage Get(String str, int i)
        {
            ConvertMessage convert = new ConvertMessage();

            var textBytes = System.Text.Encoding.UTF8.GetBytes(str);
            var base64String = Convert.ToBase64String(textBytes);

            if (i < base64String.Length)
            {
                convert.convertMessage = base64String.Substring(i, 1);
            }
            else
            {
                convert.convertMessage = "Not Found";
            }

            return convert;
        }

    }
}
