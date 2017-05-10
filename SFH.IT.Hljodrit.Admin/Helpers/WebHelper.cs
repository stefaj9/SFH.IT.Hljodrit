using System;
using System.Net.Http;

namespace SFH.IT.Hljodrit.Admin.Helpers
{
    public static class WebHelper
    {
        public static Uri GetApplicationPath(HttpRequestMessage request)
        {
            var abs = request.RequestUri.AbsolutePath;
            abs = abs.Substring(0, abs.LastIndexOf("/", StringComparison.Ordinal));
            var path = new Uri(request.RequestUri.Scheme + "://" + request.RequestUri.Host + abs.Substring(0, abs.LastIndexOf("/", StringComparison.Ordinal)));

            return path;
        }
        public static string GetApplicationHost(HttpRequestMessage request, bool includeScheme = false)
        {
            return (includeScheme ? request.RequestUri.Scheme + "://" : string.Empty) + request.RequestUri.Host;
        }
    }
}