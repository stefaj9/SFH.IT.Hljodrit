using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SFH.IT.Hljodrit.Common.Dto
{
	/// <summary>
	/// A DTO object for transferring exception information from the NLog table.
	/// </summary>
	public class ExceptionDto
	{
		public string MachineName { get; set; }
		public string SiteName { get; set; }
		public System.DateTime Logged { get; set; }
		public string Level { get; set; }
		public string UserName { get; set; }
		public string Message { get; set; }
		public string Logger { get; set; }
		public string Properties { get; set; }
		public string ServerName { get; set; }
		public string Port { get; set; }
		public string Url { get; set; }
		public Nullable<bool> Https { get; set; }
		public string ServerAddress { get; set; }
		public string RemoteAddress { get; set; }
		public string Callsite { get; set; }
		public string Exception { get; set; }
	}
}
