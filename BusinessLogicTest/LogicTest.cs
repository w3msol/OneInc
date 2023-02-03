using OneInc.Controllers;

namespace BusinessLogicTest
{
    public class LogicTest
    {
        [Fact]
        public void ConvertTest()
        {

            ConvertController conn = new ConvertController();
            conn.Get("hello", 1);            
        }

    }
}