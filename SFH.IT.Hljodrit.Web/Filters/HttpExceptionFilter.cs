using System;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Filters;

namespace SFH.IT.Hljodrit.Web.Filters
{
    public class HttpExceptionFilter : ExceptionFilterAttribute
    {
        public override void OnException(HttpActionExecutedContext filterContext)
        {
            Exception ex = filterContext.Exception;
            HttpResponseMessage response;

            // You can define a lot of if's for different types of exceptions and
            // handle them in different manners.﻿
            if (ex is ArgumentNullException)
            {
                response = new HttpResponseMessage(HttpStatusCode.BadRequest)
                {
                    Content = new StringContent("Argument cannot be null.")
                };
            }
            else
            {
                response = new HttpResponseMessage(HttpStatusCode.InternalServerError)
                {
                    Content = new StringContent("An error occurred."),
                    ReasonPhrase = "Error"
                };
            }
            throw new HttpResponseException(response);
        }
    }
}