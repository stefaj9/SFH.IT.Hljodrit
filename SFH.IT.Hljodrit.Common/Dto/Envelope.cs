using System.Collections.Generic;
using Newtonsoft.Json;

namespace SFH.IT.Hljodrit.Common.Dto
{
	/// <summary>
	/// A generic envelope object that wraps paging results of various objects.
	/// </summary>
	public class Envelope<T>
	{
        /// <summary>
        /// The total number of available objects for the requested query.
        /// </summary>
        [JsonProperty(PropertyName = "totalNumber")]
        public int TotalNumber { get; set; }

        /// <summary>
        /// The current page number returned from the db.
        /// </summary>
		[JsonProperty(PropertyName = "currentPage")]
		public int CurrentPage { get; set; }

        /// <summary>
        /// The total page number of pages available.
        /// </summary>
		[JsonProperty(PropertyName = "maximumPage")]
		public int MaximumPage { get; set; }

        /// <summary>
        /// The objects returned.
        /// </summary>
		[JsonProperty(PropertyName = "objects")]
		public IEnumerable<T> Objects { get; set; }
	}
}
