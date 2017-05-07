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
        /// <summary>
        /// The id of the exception logged.
        /// </summary>
        public int Id { get; set; }

        /// <summary>
        /// The name of the machine on which the exception was logged.
        /// </summary>
        public string MachineName { get; set; }

        /// <summary>
        /// The name of the site on which the exception was logged.
        /// </summary>
		public string SiteName { get; set; }

        /// <summary>
        /// The date on which the exception was logged.
        /// </summary>
		public System.DateTime Logged { get; set; }

        /// <summary>
        /// The level of the exception. F.e Debug, Warning or Fatal.
        /// </summary>
		public string Level { get; set; }

        /// <summary>
        /// The username of the person who caused the exception.
        /// </summary>
		public string UserName { get; set; }

        /// <summary>
        /// The exception message.
        /// </summary>
		public string Message { get; set; }
		public string Logger { get; set; }
		public string Properties { get; set; }

        /// <summary>
        /// The name of the server on which the exception was logged.
        /// </summary>
		public string ServerName { get; set; }

        /// <summary>
        /// The port number on which the exception was logged.
        /// </summary>
		public string Port { get; set; }

        /// <summary>
        /// The url on which the exception was caused.
        /// </summary>
		public string Url { get; set; }

        /// <summary>
        /// Represente whether the exception was caused over https or http.
        /// </summary>
		public Nullable<bool> Https { get; set; }

        /// <summary>
        /// The address of the server that logged the exception.
        /// </summary>
		public string ServerAddress { get; set; }
		public string RemoteAddress { get; set; }
		public string Callsite { get; set; }

        /// <summary>
        /// The exception.
        /// </summary>
		public string Exception { get; set; }
	}
}
