using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SFH.IT.Hljodrit.Web.Models
{
    public class LoginModel
    {
        public string userName { get; set; }
        public string password { get; set; }
        public string grant_type { get; set; }
    }
}