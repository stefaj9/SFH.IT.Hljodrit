using System.Web.Mvc;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using SFH.IT.Hljodrit.Admin.Controllers;

namespace SFH.IT.Hljodrit.Admin.Tests.Controllers
{
    [TestClass]
    public class HomeControllerTest
    {
        [TestMethod]
        public void Index()
        {
            // Arrange
            HomeController controller = new HomeController();

            // Act
            ViewResult result = controller.Index() as ViewResult;

            // Assert
            Assert.IsNotNull(result);
        }
    }
}
