using System.Web.Http;
using Microsoft.Owin;
using Microsoft.Owin.Security;
using Microsoft.Owin.Security.DataHandler;
using Microsoft.Owin.Security.DataHandler.Encoder;
using Microsoft.Owin.Security.DataHandler.Serializer;
using Microsoft.Owin.Security.DataProtection;
using Owin;
using SFH.IT.Hljodrit.Admin.Controllers;
using SimpleInjector;
using SimpleInjector.Extensions.ExecutionContextScoping;
using SimpleInjector.Integration.WebApi;
using SimpleInjector.Lifestyles;

[assembly: OwinStartupAttribute(typeof(SFH.IT.Hljodrit.Admin.Startup))]
namespace SFH.IT.Hljodrit.Admin
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            var container = new Container();
            container.Options.DefaultScopedLifestyle = new AsyncScopedLifestyle();
            container.RegisterWebApiControllers(GlobalConfiguration.Configuration);

            var sdt =
                new SecureDataFormat<AuthenticationTicket>(
                        new TicketSerializer(),
                        new DpapiDataProtectionProvider().Create("ASP.NET Identity"),
                        TextEncodings.Base64
                    );
            container.Options.AllowOverridingRegistrations = true;

            container.Register<AccountController>(() => new AccountController(sdt), Lifestyle.Scoped);

            container.Options.AllowOverridingRegistrations = false;

            Services.Startup.RegisterComponents(container);

            // This is an extension method from the integration package.
            container.Verify();
            app.Use(async (context, next) =>
            {
                using (container.BeginExecutionContextScope())
                {
                    await next();
                }
            });
            GlobalConfiguration.Configuration.DependencyResolver = new SimpleInjectorWebApiDependencyResolver(container);
            ConfigureAuth(app);
        }
    }
}
