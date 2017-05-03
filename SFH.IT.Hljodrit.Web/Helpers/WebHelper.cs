using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Web;

namespace SFH.IT.Hljodrit.Web.Helpers
{
    public static class WebHelper
    {
        public static Uri GetApplicationPath(HttpRequestMessage request)
        {
            var abs = request.RequestUri.AbsolutePath;
            abs = abs.Substring(0, abs.LastIndexOf("/"));
            var path = new Uri(request.RequestUri.Scheme + "://" + request.RequestUri.Host + abs.Substring(0, abs.LastIndexOf("/")));

            return path;
        }
        public static string GetApplicationHost(HttpRequestMessage request, bool includeScheme = false)
        {
            return (includeScheme ? request.RequestUri.Scheme + "://" : string.Empty) + request.RequestUri.Host;
        }
    }
}