using System;
using System.Collections.Generic;
using SFH.IT.Hljodrit.Common.Dto;

namespace SFH.IT.Hljodrit.Common.StaticHelperClasses
{
    public static class EnvelopeCreator
    {
        public static Envelope<T> CreateEnvelope<T>(IEnumerable<T> elementList, int pageSize, int pageNumber, int totalElements)
        {
            decimal maxPage = totalElements / (decimal)pageSize;

            var maximumPages = (int)Math.Ceiling(maxPage);

            return new Envelope<T>
            {
                TotalNumber = totalElements,
                CurrentPage = pageNumber,
                MaximumPage = maximumPages,
                Objects = elementList
            };
        }
    }
}