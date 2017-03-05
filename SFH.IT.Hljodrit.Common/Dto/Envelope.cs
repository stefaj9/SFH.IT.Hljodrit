using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Newtonsoft.Json;

namespace SFH.IT.Hljodrit.Common
{
	/// <summary>
	/// A generic envelope object that wraps paging results of various objects.
	/// </summary>
	public class Envelope<T>
	{
		[JsonProperty(PropertyName = "currentPage")]
		public int CurrentPage { get; set; }
		[JsonProperty(PropertyName = "maximumPage")]
		public int MaximumPage { get; set; }
		[JsonProperty(PropertyName = "objects")]
		public IEnumerable<T> Objects { get; set; }
	}
}
