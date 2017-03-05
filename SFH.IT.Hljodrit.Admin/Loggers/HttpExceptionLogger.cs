using System.Web.Http.ExceptionHandling;
using NLog;

namespace SFH.IT.Hljodrit.Admin.Loggers
{
    public class HttpExceptionLogger : ExceptionLogger
    {
        // NLog logger
        public static NLog.Logger Logger => LogManager.GetCurrentClassLogger();
        public override void Log(ExceptionLoggerContext context)
        {
            // You can define whether to log it as an error, info, warning, fatal
            // by using the functions Error(Exception ex), Info(Exception ex), 
            // ﻿Warning(Exception ex), Fatal(Exception ex)﻿. Here below we are 
            // logging an error.﻿
            Logger.Error(context.Exception);
        }
    }
}