using System;
using System.Web.Http;
using System.Web.Http.ExceptionHandling;
using System.Web.Mvc;
using System.Web.Optimization;
using System.Web.Routing;
using NLog;
using SFH.IT.Hljodrit.Admin.Filters;
using SFH.IT.Hljodrit.Admin.Handlers;
using SFH.IT.Hljodrit.Admin.Loggers;
using SimpleInjector;
using SimpleInjector.Integration.WebApi;

namespace SFH.IT.Hljodrit.Admin
{
    public class MvcApplication : System.Web.HttpApplication
    {
        public static NLog.Logger Logger => LogManager.GetCurrentClassLogger();

        protected void Application_Start()
        {

            AreaRegistration.RegisterAllAreas();
            GlobalConfiguration.Configure(WebApiConfig.Register);
            FilterConfig.RegisterGlobalFilters(GlobalFilters.Filters);
            RouteConfig.RegisterRoutes(RouteTable.Routes);
            BundleConfig.RegisterBundles(BundleTable.Bundles);

            var container = new Container();
            container.Options.DefaultScopedLifestyle = new WebApiRequestLifestyle();

            container.RegisterWebApiControllers(GlobalConfiguration.Configuration);

            Services.Startup.RegisterComponents(container);

            container.Verify();

            GlobalConfiguration.Configuration.DependencyResolver = new SimpleInjectorWebApiDependencyResolver(container);

            // Add a global custom exception filter
            GlobalConfiguration.Configuration.Filters.Add(new HttpExceptionFilter());

            // Register our custom handler
            GlobalConfiguration.Configuration.Services.Replace(typeof(IExceptionHandler), new HttpExceptionHandler());

            // Register our custom logger
            GlobalConfiguration.Configuration.Services.Replace(typeof(IExceptionLogger), new HttpExceptionLogger());
        }

        protected void Application_Error(object sender, EventArgs e)
        {
            // Fatal error is relevant here.
            Logger.Fatal(Server.GetLastError());
            Server.ClearError();
        }
    }
}
