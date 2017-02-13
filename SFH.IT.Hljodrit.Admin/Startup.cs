using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(SFH.IT.Hljodrit.Admin.Startup))]
namespace SFH.IT.Hljodrit.Admin
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
