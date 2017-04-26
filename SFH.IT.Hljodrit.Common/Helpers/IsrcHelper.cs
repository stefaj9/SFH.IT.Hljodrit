using System;

namespace SFH.IT.Hljodrit.Common.Helpers
{
    public static class IsrcHelper
    {
        public static string GenerateIsrcNumber(string countryPart, string organizationPart, int year, int lastUsedNumber)
        {
            var yearTruncate = year.ToString().Substring(year.ToString().Length - Math.Min(2, year.ToString().Length));
            yearTruncate = yearTruncate.PadLeft(2, '0');
            var lastUsedNumberPadded = lastUsedNumber.ToString().PadLeft(5, '0');
            return $"{countryPart}-{organizationPart}-{yearTruncate}-{lastUsedNumberPadded}";
        }
    }
}
