﻿using System;
using System.Web;
using System.Web.Http;
using System.Web.Http.ExceptionHandling;
using System.Web.Mvc;
using System.Web.Optimization;
using System.Web.Routing;
using NLog;
using SFH.IT.Hljodrit.Admin.Filters;
using SFH.IT.Hljodrit.Admin.Handlers;
using SFH.IT.Hljodrit.Admin.Loggers;

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

        protected void Application_EndRequest()
        {
            var context = new HttpContextWrapper(Context);
            // If we're an ajax request, and doing a 302, then we actually need to do a 401
            if (Context.Response.StatusCode == 302 && IsAjaxRequest(Context.Request))
            {
                Context.Response.Clear();
                Context.Response.ClearContent();
                Context.Response.StatusCode = 401;
                context.Response.RedirectLocation = null;
                Context.Response.End();
            }
        }
        private static bool IsAjaxRequest(HttpRequest request)
        {
            return request.Path.Contains("/api");
        }
    }
}
