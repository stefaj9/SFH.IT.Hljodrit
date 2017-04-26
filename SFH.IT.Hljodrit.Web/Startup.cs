using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(SFH.IT.Hljodrit.Web.Startup))]
namespace SFH.IT.Hljodrit.Web
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
