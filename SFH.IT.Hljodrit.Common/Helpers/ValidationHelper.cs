using System.Collections.Generic;
using System.Linq;
using System.Web.Http.ModelBinding;

namespace SFH.IT.Hljodrit.Common.Helpers
{
    public static class ValidationHelper
    {
        public static string GenerateErrorMessage(ICollection<ModelState> modelStateValues)
        {
            return modelStateValues.SelectMany(values => values.Errors).Aggregate("", (current, error) => current + error.ErrorMessage);
        }
    }
}
