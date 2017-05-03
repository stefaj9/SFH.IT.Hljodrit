using System;
using System.Web;
using System.Web.Http;
using System.Web.Http.ExceptionHandling;
using System.Web.Mvc;
using System.Web.Optimization;
using System.Web.Routing;
using Microsoft.Owin.Security;
using Microsoft.Owin.Security.DataHandler;
using Microsoft.Owin.Security.DataHandler.Encoder;
using Microsoft.Owin.Security.DataHandler.Serializer;
using Microsoft.Owin.Security.DataProtection;
using NLog;
using SFH.IT.Hljodrit.Web.Filters;
using SFH.IT.Hljodrit.Web.Handlers;
using SFH.IT.Hljodrit.Web.Loggers;
using SimpleInjector;
using SimpleInjector.Integration.WebApi;
using SimpleInjector.Lifestyles;

namespace SFH.IT.Hljodrit.Web
{
    public class MvcApplication : HttpApplication
    {
        public static Logger Logger => LogManager.GetCurrentClassLogger();

        protected void Application_Start()
        {
            AreaRegistration.RegisterAllAreas();
            GlobalConfiguration.Configure(WebApiConfig.Register);
            FilterConfig.RegisterGlobalFilters(GlobalFilters.Filters);
            RouteConfig.RegisterRoutes(RouteTable.Routes);
            BundleConfig.RegisterBundles(BundleTable.Bundles);

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
