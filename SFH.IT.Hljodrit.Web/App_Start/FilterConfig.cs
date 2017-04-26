using System.Web;
using System.Web.Mvc;

namespace SFH.IT.Hljodrit.Web
{
    public class FilterConfig
    {
        public static void RegisterGlobalFilters(GlobalFilterCollection filters)
        {
            filters.Add(new HandleErrorAttribute());
        }
    }
}
