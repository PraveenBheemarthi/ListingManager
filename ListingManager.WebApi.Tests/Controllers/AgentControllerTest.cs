using System;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using ListingManager.WebApi.Controllers;
using System.Net.Http;
using System.Web.Http;
using System.Linq;
using ListingManager.Domain.Entities.DataTransferObjects;

namespace ListingManager.WebApi.Tests.Controllers
{
    [TestClass]
    public class AgentControllerTest
    {
        [TestMethod]
        public void GetAgentsTest()
        {

            // Arrange
            var controller = new AgentController();
            controller.Request = new HttpRequestMessage();
            controller.Configuration = new HttpConfiguration();

            // Act
            IQueryable<AgentDTO> response = controller.GetAgents();

            // Assert
            Assert.IsNotNull(response);
            Assert.IsTrue(response.Count() > 0);

        }
    }
}
